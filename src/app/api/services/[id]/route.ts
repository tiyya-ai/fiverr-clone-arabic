import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true,
            location: true,
            memberSince: true,
            isVerified: true,
            totalSales: true,
            rating: true,
            totalReviews: true,
            level: true,
            languages: true,
            bio: true,
            skills: true,
            responseTime: true,
            lastSeen: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true
          }
        },
        packages: {
          orderBy: { price: 'asc' }
        },
        reviews: {
          orderBy: { createdAt: 'desc' },
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
        },
        faqs: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            question: true,
            answer: true
          }
        }
      }
    })

    if (!service) {
      return NextResponse.json({ error: 'الخدمة غير موجودة' }, { status: 404 })
    }

    // Calculate average rating and total reviews
    const reviewsData = await prisma.review.aggregate({
      where: { serviceId: params.id },
      _avg: { rating: true },
      _count: { _all: true }
    })

    const serviceWithStats = {
      ...service,
      rating: reviewsData._avg.rating || 0,
      totalReviews: reviewsData._count._all
    }

    return NextResponse.json(serviceWithStats)

  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الخدمة' },
      { status: 500 }
    )
  }
}
