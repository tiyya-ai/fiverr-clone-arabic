import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { sendNewMessageEmail } from '@/lib/email'

const sendMessageSchema = z.object({
  orderId: z.string().uuid('معرف الطلب غير صحيح'),
  content: z.string().min(1, 'محتوى الرسالة مطلوب').max(1000, 'الرسالة طويلة جداً'),
  attachments: z.array(z.string()).optional()
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
    const validatedData = sendMessageSchema.parse(body)

    // Verify order exists and user is part of it
    const order = await prisma.order.findUnique({
      where: { id: validatedData.orderId },
      include: {
        buyer: { select: { id: true, fullName: true, email: true } },
        seller: { select: { id: true, fullName: true, email: true } },
        service: { select: { title: true } }
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'الطلب غير موجود' },
        { status: 404 }
      )
    }

    // Check if user is part of this order
    if (order.buyerId !== session.user.id && order.sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'غير مصرح لك بإرسال رسائل في هذا الطلب' },
        { status: 403 }
      )
    }

    // Determine recipient
    const toUserId = order.buyerId === session.user.id ? order.sellerId : order.buyerId

    // Create message
    const message = await prisma.message.create({
      data: {
        orderId: validatedData.orderId,
        fromUserId: session.user.id,
        toUserId: toUserId,
        content: validatedData.content,
        isRead: false
      },
      include: {
        fromUser: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true
          }
        }
      }
    })

    // Send email notification to the other party
    try {
      const recipient = order.buyerId === session.user.id ? order.seller : order.buyer
      await sendNewMessageEmail(
        recipient.email,
        session.user.name || 'مستخدم',
        validatedData.content,
        validatedData.orderId
      )
    } catch (emailError) {
      console.error('Failed to send message notification email:', emailError)
    }

    return NextResponse.json({
      message: 'تم إرسال الرسالة بنجاح',
      data: message
    }, { status: 201 })

  } catch (error) {
    console.error('Error sending message:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ في إرسال الرسالة' },
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
    const orderId = searchParams.get('orderId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    if (!orderId) {
      return NextResponse.json(
        { error: 'معرف الطلب مطلوب' },
        { status: 400 }
      )
    }

    // Verify user is part of the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { buyerId: true, sellerId: true }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'الطلب غير موجود' },
        { status: 404 }
      )
    }

    if (order.buyerId !== session.user.id && order.sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'غير مصرح لك بعرض رسائل هذا الطلب' },
        { status: 403 }
      )
    }

    // Get messages
    const [messages, totalCount] = await Promise.all([
      prisma.message.findMany({
        where: { orderId },
        include: {
          fromUser: {
            select: {
              id: true,
              fullName: true,
              username: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit
      }),
      prisma.message.count({ where: { orderId } })
    ])

    // Mark messages as read for the current user
    await prisma.message.updateMany({
      where: {
        orderId,
        fromUserId: { not: session.user.id },
        isRead: false
      },
      data: { isRead: true }
    })

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الرسائل' },
      { status: 500 }
    )
  }
}