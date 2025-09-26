import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'

const serviceUpdateSchema = z.object({
  status: z.enum(['DRAFT', 'PENDING', 'ACTIVE', 'PAUSED', 'REJECTED']).optional(),
  rejectionReason: z.string().optional(),
  featured: z.boolean().optional(),
})

// Get all services with filtering and pagination
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
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } },
      ]
    }
    
    if (status) {
      where.status = status
    }
    
    if (category) {
      where.category = category
    }
    
    if (featured === 'true') {
      where.isFeatured = true
    } else if (featured === 'false') {
      where.isFeatured = false
    }

    const [services, totalCount] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              avatar: true,
              userType: true,
            },
          },
          packages: {
            orderBy: {
              price: 'asc',
            },
          },
          _count: {
            select: {
              orders: true,
              reviews: true,
            },
          },
        },
      }),
      prisma.service.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      services: services.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        categoryId: service.categoryId,
        tags: service.tags,
        images: service.images,
        isActive: service.isActive,
        isFeatured: service.isFeatured,
        rating: service.rating,
        totalReviews: service.totalReviews,
        totalSales: service.totalSales,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        user: service.user,
        packages: service.packages,
        stats: {
          ordersCount: service._count.orders,
          reviewsCount: service._count.reviews,
        },
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
    console.error('Admin services GET error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب بيانات الخدمات' },
      { status: 500 }
    )
  }
}

// Bulk update services
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
    const { serviceIds, action, ...updateData } = body

    if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      return NextResponse.json(
        { error: 'يجب تحديد معرفات الخدمات' },
        { status: 400 }
      )
    }

    let result
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: serviceIds,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    })

    switch (action) {
      case 'approve':
        result = await prisma.service.updateMany({
          where: {
            id: {
              in: serviceIds,
            },
          },
          data: {
            isActive: true,
          },
        })

        // TODO: Send approval emails to service owners
        // for (const service of services) {
        //   await sendEmail(service.user.email, 'تم قبول خدمتك', 'serviceApproved')
        // }
        break

      case 'reject':
        const validatedData = serviceUpdateSchema.parse(updateData)
        result = await prisma.service.updateMany({
          where: {
            id: {
              in: serviceIds,
            },
          },
          data: {
            isActive: false,
          },
        })

        // TODO: Send rejection emails to service owners
        // for (const service of services) {
        //   await sendEmail(service.user.email, 'تم رفض خدمتك', 'serviceRejected')
        // }
        break

      case 'feature':
        result = await prisma.service.updateMany({
          where: {
            id: {
              in: serviceIds,
            },
          },
          data: {
            isFeatured: true,
          },
        })
        break

      case 'unfeature':
        result = await prisma.service.updateMany({
          where: {
            id: {
              in: serviceIds,
            },
          },
          data: {
            isFeatured: false,
          },
        })
        break

      case 'pause':
        result = await prisma.service.updateMany({
          where: {
            id: {
              in: serviceIds,
            },
          },
          data: {
            isActive: false,
          },
        })
        break

      case 'activate':
        result = await prisma.service.updateMany({
          where: {
            id: {
              in: serviceIds,
            },
          },
          data: {
            isActive: true,
          },
        })
        break

      default:
        return NextResponse.json(
          { error: 'إجراء غير صحيح' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: `تم تحديث ${result.count} خدمة بنجاح`,
      updatedCount: result.count,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Admin services PATCH error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث الخدمات' },
      { status: 500 }
    )
  }
}

// Delete services
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
    return NextResponse.json(
      { error: 'غير مصرح لك بالوصول' },
      { status: 403 }
    )
  }

    const body = await request.json()
    const { serviceIds } = body

    if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      return NextResponse.json(
        { error: 'يجب تحديد معرفات الخدمات' },
        { status: 400 }
      )
    }

    // Check for active orders
    const activeOrders = await prisma.order.count({
      where: {
        serviceId: {
          in: serviceIds,
        },
        status: {
          in: ['PENDING', 'ACTIVE'],
        },
      },
    })

    if (activeOrders > 0) {
      return NextResponse.json(
        { error: 'لا يمكن حذف الخدمات التي تحتوي على طلبات نشطة' },
        { status: 400 }
      )
    }

    // Delete services and related data
    await prisma.$transaction(async (tx) => {
      // Delete packages
      await tx.servicePackage.deleteMany({
        where: {
          serviceId: {
            in: serviceIds,
          },
        },
      })

      // Delete reviews
      await tx.review.deleteMany({
        where: {
          serviceId: {
            in: serviceIds,
          },
        },
      })

      // Delete FAQs
      await tx.serviceFAQ.deleteMany({
        where: {
          serviceId: {
            in: serviceIds,
          },
        },
      })

      // Delete services
      await tx.service.deleteMany({
        where: {
          id: {
            in: serviceIds,
          },
        },
      })
    })

    return NextResponse.json({
      message: `تم حذف ${serviceIds.length} خدمة بنجاح`,
      deletedCount: serviceIds.length,
    })
  } catch (error) {
    console.error('Admin services DELETE error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في حذف الخدمات' },
      { status: 500 }
    )
  }
}