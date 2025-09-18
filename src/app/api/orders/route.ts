import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { createPaymentIntent } from '@/lib/stripe'
import { sendOrderConfirmationEmail } from '@/lib/email'

const createOrderSchema = z.object({
  serviceId: z.string().uuid('معرف الخدمة غير صحيح'),
  packageId: z.string().uuid('معرف الباقة غير صحيح'),
  requirements: z.string().min(10, 'متطلبات الطلب يجب أن تكون 10 أحرف على الأقل'),
  notes: z.string().optional(),
  urgentDelivery: z.boolean().optional()
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createOrderSchema.parse(body)

    // Get service and package details
    const service = await prisma.service.findUnique({
      where: { id: validatedData.serviceId },
      include: {
        packages: {
          where: { id: validatedData.packageId }
        },
        user: true
      }
    })

    if (!service || service.packages.length === 0) {
      return NextResponse.json(
        { error: 'الخدمة أو الباقة غير موجودة' },
        { status: 404 }
      )
    }

    // Check if user is trying to order their own service
    if (service.userId === session.user.id) {
      return NextResponse.json(
        { error: 'لا يمكنك طلب خدمتك الخاصة' },
        { status: 400 }
      )
    }

    const selectedPackage = service.packages[0]
    let totalAmount = selectedPackage.price
    
    // Add urgent delivery fee if requested
    if (validatedData.urgentDelivery) {
      totalAmount += totalAmount * 0.5 // 50% extra for urgent delivery
    }

    // Calculate delivery date
    const deliveryDate = new Date()
    const deliveryDays = validatedData.urgentDelivery 
      ? Math.ceil(selectedPackage.deliveryTime / 2) 
      : selectedPackage.deliveryTime
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays)

    // Create order
    const order = await prisma.order.create({
      data: {
        serviceId: validatedData.serviceId,
        packageId: validatedData.packageId,
        buyerId: session.user.id,
        sellerId: service.userId,
        totalAmount,
        requirements: validatedData.requirements,
        notes: validatedData.notes,
        deliveryDate,
        status: 'PENDING',
        urgentDelivery: validatedData.urgentDelivery || false
      },
      include: {
        service: true,
        package: true,
        buyer: true,
        seller: true
      }
    })

    // Create payment intent
    try {
      const paymentIntent = await createPaymentIntent(
        order.id,
        totalAmount
      )

      // Update order with payment intent ID
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentIntentId: paymentIntent.id }
      })

      // Send confirmation email
      try {
await sendOrderConfirmationEmail({
  ...order,
  service: order.service,
  buyer: order.buyer,
  seller: order.seller
})
      } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError)
      }

      return NextResponse.json({
        message: 'تم إنشاء الطلب بنجاح',
        order: {
          id: order.id,
          status: order.status,
          totalAmount: order.totalAmount,
          deliveryDate: order.deliveryDate,
          service: order.service,
          selectedPackage: order.package
        },
        paymentIntent: {
          id: paymentIntent.id,
          clientSecret: paymentIntent.client_secret
        }
      }, { status: 201 })

    } catch (paymentError) {
      // If payment intent creation fails, delete the order
      await prisma.order.delete({ where: { id: order.id } })
      throw paymentError
    }

  } catch (error) {
    console.error('Order creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء الطلب' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'buying' or 'selling'
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const whereClause: any = {
      ...(type === 'buying' ? { buyerId: session.user.id } : {}),
      ...(type === 'selling' ? { sellerId: session.user.id } : {}),
      ...(status ? { status } : {})
    }

    // If no type specified, get both buying and selling orders
    if (!type) {
      whereClause.OR = [
        { buyerId: session.user.id },
        { sellerId: session.user.id }
      ]
    }

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        include: {
          service: {
            select: {
              id: true,
              title: true,
              images: true
            }
          },
          package: {
            select: {
              id: true,
              name: true,
              type: true,
              price: true,
              deliveryTime: true
            }
          },
          buyer: {
            select: {
              id: true,
              fullName: true,
              username: true,
              avatar: true
            }
          },
          seller: {
            select: {
              id: true,
              fullName: true,
              username: true,
              avatar: true
            }
          },
          messages: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            select: {
              content: true,
              createdAt: true,
              fromUserId: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.order.count({ where: whereClause })
    ])

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الطلبات' },
      { status: 500 }
    )
  }
}
