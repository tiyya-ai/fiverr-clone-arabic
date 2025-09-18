import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const createReviewSchema = z.object({
  orderId: z.string().uuid('معرف الطلب غير صحيح'),
  rating: z.number().min(1).max(5, 'التقييم يجب أن يكون بين 1 و 5'),
  comment: z.string().min(10, 'التعليق يجب أن يكون 10 أحرف على الأقل')
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
    const validatedData = createReviewSchema.parse(body)

    // Check if the user has purchased the service
    const order = await prisma.order.findUnique({
      where: { id: validatedData.orderId, buyerId: session.user.id },
      include: {
        service: { select: { id: true, title: true, userId: true } }
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'لا يمكنك تقييم هذا الطلب' },
        { status: 403 }
      )
    }

    // Check if the user has already reviewed this service for this order
    const existingReview = await prisma.review.findFirst({
      where: {
        orderId: validatedData.orderId,
        userId: session.user.id
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'لقد قمت بتقييم هذا الطلب بالفعل' },
        { status: 409 }
      )
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        serviceId: order.service.id,
        userId: session.user.id,
        orderId: validatedData.orderId,
        rating: validatedData.rating,
        comment: validatedData.comment
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true
          }
        }
      }
    })

    // Update service rating and total reviews
    await prisma.service.update({
      where: { id: order.service.id },
      data: {
        totalReviews: { increment: 1 },
        rating: {
          set: (await prisma.review.aggregate({
            _avg: { rating: true },
            where: { serviceId: order.service.id }
          }))._avg.rating || 0
        }
      }
    })

    // Update seller rating
    await prisma.user.update({
      where: { id: order.service.userId },
      data: {
        totalReviews: { increment: 1 },
        rating: {
          set: (await prisma.review.aggregate({
            _avg: { rating: true },
            where: { service: { userId: order.service.userId } }
          }))._avg.rating || 0
        }
      }
    })

    return NextResponse.json(review, { status: 201 })

  } catch (error) {
    console.error('Review creation error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء التقييم' },
      { status: 500 }
    )
  }
}
