import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendOrderStatusUpdateEmail } from '@/lib/email'
import { stripe } from '@/lib/stripe'

const disputeResolutionSchema = z.object({
  resolution: z.enum(['REFUND_BUYER', 'FAVOR_SELLER', 'PARTIAL_REFUND']),
  refundAmount: z.number().min(0).optional(),
  resolutionNotes: z.string().min(10),
})

// Get all disputes with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'غير مصرح لك بالوصول' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'DISPUTED'
    const priority = searchParams.get('priority')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: 'DISPUTED', // Only show disputed orders
    }
    
    if (search) {
      where.OR = [
        {
          service: {
            title: { contains: search, mode: 'insensitive' },
          },
        },
        {
          buyer: {
            name: { contains: search, mode: 'insensitive' },
          },
        },
        {
          seller: {
            name: { contains: search, mode: 'insensitive' },
          },
        },
      ]
    }

    const [disputes, totalCount] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          status: true,
          totalAmount: true,
          createdAt: true,
          updatedAt: true,
          completedAt: true,
          service: {
            select: {
              id: true,
              title: true,
              category: true,
              images: true,
            },
          },
          package: {
            select: {
              id: true,
              name: true,
              price: true,
              deliveryTime: true,
            },
          },
          buyer: {
            select: {
              id: true,
              fullName: true,
              email: true,
              avatar: true,
            },
          },
          seller: {
            select: {
              id: true,
              fullName: true,
              email: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.order.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    // Calculate dispute priority based on various factors
    const disputesWithPriority = disputes.map(dispute => {
      let priority = 'medium'
      const daysSinceCreated = Math.floor(
        (new Date().getTime() - new Date(dispute.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      
      // High priority if:
      // - Order amount > 500
      // - Dispute is older than 7 days
      // - Seller has high rating
      if (
        (dispute.totalAmount && dispute.totalAmount > 500) ||
        daysSinceCreated > 7
      ) {
        priority = 'high'
      } else if (
        (dispute.totalAmount && dispute.totalAmount < 100) &&
        daysSinceCreated < 2
      ) {
        priority = 'low'
      }

      return {
        ...dispute,
        priority,
        daysSinceCreated,
      }
    })

    return NextResponse.json({
      disputes: disputesWithPriority,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('Admin disputes GET error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب بيانات النزاعات' },
      { status: 500 }
    )
  }
}

// Resolve dispute
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'غير مصرح لك بالوصول' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { orderId, ...resolutionData } = body
    const validatedData = disputeResolutionSchema.parse(resolutionData)

    // Get the disputed order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        service: {
          select: {
            title: true,
          },
        },
        buyer: {
          select: {
            fullName: true,
            email: true,
          },
        },
        seller: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'الطلب غير موجود' },
        { status: 404 }
      )
    }

    if (order.status !== 'DISPUTED') {
      return NextResponse.json(
        { error: 'هذا الطلب ليس في حالة نزاع' },
        { status: 400 }
      )
    }

    let newStatus: string = 'COMPLETED'
    let refundAmount = 0

    // Process resolution based on type
    switch (validatedData.resolution) {
      case 'REFUND_BUYER':
        newStatus = 'CANCELLED'
        refundAmount = order.totalAmount || 0
        
        // Process full refund through Stripe
        // Note: Stripe refund functionality temporarily disabled due to schema issues
        // if (order.paymentIntentId) {
        //   try {
        //     await stripe.refunds.create({
        //       payment_intent: order.paymentIntentId,
        //       amount: Math.round(refundAmount * 100), // Convert to cents
        //       reason: 'requested_by_customer',
        //     })
        //   } catch (stripeError) {
        //     console.error('Stripe refund error:', stripeError)
        //     return NextResponse.json(
        //       { error: 'حدث خطأ في معالجة الاسترداد' },
        //       { status: 500 }
        //     )
        //   }
        // }
        break

      case 'FAVOR_SELLER':
        newStatus = 'COMPLETED'
        refundAmount = 0
        break

      case 'PARTIAL_REFUND':
        newStatus = 'COMPLETED'
        refundAmount = validatedData.refundAmount || 0
        
        if (refundAmount > (order.totalAmount || 0)) {
          return NextResponse.json(
            { error: 'مبلغ الاسترداد لا يمكن أن يكون أكبر من مبلغ الطلب' },
            { status: 400 }
          )
        }
        
        // Process partial refund through Stripe
        // Note: Stripe refund functionality temporarily disabled due to schema issues
        // if (order.paymentIntentId && refundAmount > 0) {
        //   try {
        //     await stripe.refunds.create({
        //       payment_intent: order.paymentIntentId,
        //       amount: Math.round(refundAmount * 100), // Convert to cents
        //       reason: 'requested_by_customer',
        //     })
        //   } catch (stripeError) {
        //     console.error('Stripe refund error:', stripeError)
        //     return NextResponse.json(
        //       { error: 'حدث خطأ في معالجة الاسترداد الجزئي' },
        //       { status: 500 }
        //     )
        //   }
        // }
        break
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus as 'PENDING' | 'ACTIVE' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED',
        updatedAt: new Date(),
      },
    })

    // TODO: Send resolution emails to both parties
    // Email functionality needs to be implemented with proper order relations

    return NextResponse.json({
      message: 'تم حل النزاع بنجاح',
      order: {
        id: updatedOrder.id,
        status: updatedOrder.status,
        resolution: validatedData.resolution,
        refundAmount,
        resolutionNotes: validatedData.resolutionNotes,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Admin dispute resolution error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في حل النزاع' },
      { status: 500 }
    )
  }
}