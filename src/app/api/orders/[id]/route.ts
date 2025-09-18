import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
// import { sendOrderStatusUpdateEmail } from '@/lib/email'

const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'DISPUTED']),
  deliveryFiles: z.array(z.string()).optional(),
  deliveryNote: z.string().optional(),
  cancellationReason: z.string().optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
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
            deliveryTime: true,
            features: true
          }
        },
        buyer: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true,
            email: true
          }
        },
        seller: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true,
            email: true
          }
        },
        messages: {
          orderBy: { createdAt: 'asc' },
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
        }
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'الطلب غير موجود' },
        { status: 404 }
      )
    }

    // Check if user is authorized to view this order
    if (order.buyerId !== session.user.id && order.sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'غير مصرح لك بعرض هذا الطلب' },
        { status: 403 }
      )
    }

    return NextResponse.json(order)

  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الطلب' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updateOrderSchema.parse(body)

    // Get current order
    const currentOrder = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        buyer: { select: { id: true, email: true, fullName: true } },
        seller: { select: { id: true, email: true, fullName: true } },
        service: { select: { title: true } }
      }
    })

    if (!currentOrder) {
      return NextResponse.json(
        { error: 'الطلب غير موجود' },
        { status: 404 }
      )
    }

    // Check authorization based on status change
    const isSellerUpdate = ['IN_PROGRESS', 'DELIVERED'].includes(validatedData.status)
    const isBuyerUpdate = ['COMPLETED', 'CANCELLED'].includes(validatedData.status)
    const isDisputeUpdate = validatedData.status === 'DISPUTED'

    if (isSellerUpdate && currentOrder.sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'فقط البائع يمكنه تحديث حالة الطلب إلى هذه الحالة' },
        { status: 403 }
      )
    }

    if (isBuyerUpdate && currentOrder.buyerId !== session.user.id) {
      return NextResponse.json(
        { error: 'فقط المشتري يمكنه تحديث حالة الطلب إلى هذه الحالة' },
        { status: 403 }
      )
    }

    if (isDisputeUpdate && 
        currentOrder.buyerId !== session.user.id && 
        currentOrder.sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'غير مصرح لك بتحديث هذا الطلب' },
        { status: 403 }
      )
    }

    // Validate status transitions
    const validTransitions: Record<string, string[]> = {
      'PENDING': ['IN_PROGRESS', 'CANCELLED'],
      'IN_PROGRESS': ['DELIVERED', 'CANCELLED', 'DISPUTED'],
      'DELIVERED': ['COMPLETED', 'DISPUTED'],
      'COMPLETED': [],
      'CANCELLED': [],
      'DISPUTED': ['COMPLETED', 'CANCELLED']
    }

    if (!validTransitions[currentOrder.status]?.includes(validatedData.status)) {
      return NextResponse.json(
        { error: 'تحديث الحالة غير صحيح' },
        { status: 400 }
      )
    }

    // Prepare update data
    const updateData: any = {
      status: validatedData.status,
      updatedAt: new Date()
    }

    // Add specific fields based on status
    if (validatedData.status === 'DELIVERED') {
      updateData.deliveredAt = new Date()
      if (validatedData.deliveryFiles) {
        updateData.deliveryFiles = validatedData.deliveryFiles
      }
      if (validatedData.deliveryNote) {
        updateData.deliveryNote = validatedData.deliveryNote
      }
    }

    if (validatedData.status === 'COMPLETED') {
      updateData.completedAt = new Date()
    }

    if (validatedData.status === 'CANCELLED') {
      updateData.cancelledAt = new Date()
      if (validatedData.cancellationReason) {
        updateData.cancellationReason = validatedData.cancellationReason
      }
    }

    if (validatedData.status === 'IN_PROGRESS') {
      updateData.startedAt = new Date()
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: updateData,
      include: {
        service: {
          select: {
            id: true,
            title: true,
            description: true,
            rating: true
          }
        },
        buyer: true,
        seller: true
      }
    })

    // Send notification email (disabled for build)
    // try {
    //   await sendOrderStatusUpdateEmail(updatedOrder, validatedData.status)
    // } catch (emailError) {
    //   console.error('Failed to send status update email:', emailError)
    // }

    return NextResponse.json({
      message: 'تم تحديث حالة الطلب بنجاح',
      order: updatedOrder
    })

  } catch (error) {
    console.error('Error updating order:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث الطلب' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'الطلب غير موجود' },
        { status: 404 }
      )
    }

    // Only allow deletion of pending orders by the buyer
    if (order.buyerId !== session.user.id || order.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'لا يمكن حذف هذا الطلب' },
        { status: 403 }
      )
    }

    await prisma.order.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'تم حذف الطلب بنجاح'
    })

  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في حذف الطلب' },
      { status: 500 }
    )
  }
}