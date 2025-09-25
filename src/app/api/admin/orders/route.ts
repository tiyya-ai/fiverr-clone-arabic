import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'
import { stripe } from '@/lib/stripe'

const orderUpdateSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'DISPUTED', 'REFUNDED']).optional(),
  adminNotes: z.string().optional(),
})

const disputeResolutionSchema = z.object({
  resolution: z.enum(['REFUND_BUYER', 'FAVOR_SELLER', 'PARTIAL_REFUND']),
  refundAmount: z.number().min(0).optional(),
  resolutionNotes: z.string(),
})

// Get all orders with filtering and pagination
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
    const status = searchParams.get('status')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const minAmount = searchParams.get('minAmount')
    const maxAmount = searchParams.get('maxAmount')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        {
          service: {
            title: { contains: search, mode: 'insensitive' },
          },
        },
        {
          buyer: {
            fullName: { contains: search, mode: 'insensitive' },
          },
        },
        {
          seller: {
            fullName: { contains: search, mode: 'insensitive' },
          },
        },
      ]
    }
    
    if (status) {
      where.status = status
    }
    
    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom)
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo)
      }
    }
    
    if (minAmount || maxAmount) {
      where.totalAmount = {}
      if (minAmount) {
        where.totalAmount.gte = parseFloat(minAmount)
      }
      if (maxAmount) {
        where.totalAmount.lte = parseFloat(maxAmount)
      }
    }

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
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
      }),
      prisma.order.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      orders: orders.map(order => ({
        id: order.id,
        status: order.status,
        totalAmount: order.totalAmount,
        deliveryDate: order.deliveryDate,
        requirements: order.requirements,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        service: order.service,
        package: order.package,
        buyerId: order.buyerId,
        seller: order.seller,
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('Admin orders GET error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب بيانات الطلبات' },
      { status: 500 }
    )
  }
}

// Bulk update orders
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'غير مصرح لك بالوصول' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { orderIds, action, ...updateData } = body

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { error: 'يجب تحديد معرفات الطلبات' },
        { status: 400 }
      )
    }

    const orders = await prisma.order.findMany({
      where: {
        id: {
          in: orderIds,
        },
      },
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

    let result

    switch (action) {
      case 'cancel':
        result = await prisma.order.updateMany({
          where: {
            id: {
              in: orderIds,
            },
          },
          data: {
            status: 'CANCELLED',
          },
        })

        // Send cancellation emails
        for (const order of orders) {
          // TODO: Implement email notifications for order cancellation
          // Need to use appropriate email function with proper order data including relations
        }
        break

      case 'complete':
        result = await prisma.order.updateMany({
          where: {
            id: {
              in: orderIds,
            },
          },
          data: {
            status: 'COMPLETED',
          },
        })
        break

      case 'refund':
        const validatedData = orderUpdateSchema.parse(updateData)
        
        // Process refunds through Stripe
        for (const order of orders) {
          if (order.paymentIntentId) {
            try {
              await stripe.refunds.create({
                payment_intent: order.paymentIntentId,
                amount: Math.round((order.totalAmount || 0) * 100), // Convert to cents
                reason: 'requested_by_customer',
              })
            } catch (stripeError) {
              console.error('Stripe refund error:', stripeError)
            }
          }
        }

        result = await prisma.order.updateMany({
          where: {
            id: {
              in: orderIds,
            },
          },
          data: {
            status: 'CANCELLED',
          },
        })

        // TODO: Implement refund email notifications
        // Need to use appropriate email function with proper order data including relations
        break

      default:
        return NextResponse.json(
          { error: 'إجراء غير صحيح' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: `تم تحديث ${result.count} طلب بنجاح`,
      updatedCount: result.count,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Admin orders PATCH error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث الطلبات' },
      { status: 500 }
    )
  }
}