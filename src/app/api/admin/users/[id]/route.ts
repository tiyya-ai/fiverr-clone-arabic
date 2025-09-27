import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  userType: z.enum(['BUYER', 'SELLER', 'ADMIN']).optional(),
  isVerified: z.boolean().optional(),
  password: z.string().min(6).optional(),
})

// Get specific user details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'غير مصرح لك بالوصول' },
        { status: 403 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        services: {
          include: {
            packages: true,
            _count: {
              select: {
                orders: true,
                reviews: true,
              },
            },
          },
        },
        buyerOrders: {
          include: {
            service: {
              select: {
                title: true,
                user: {
                  select: {
                    fullName: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        sellerOrders: {
          include: {
            service: {
              select: {
                title: true,
              },
            },
            buyer: {
              select: {
                fullName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },

        reviews: {
          include: {
            service: {
              select: {
                title: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
        _count: {
          select: {
            services: true,
            buyerOrders: true,
            sellerOrders: true,
            reviews: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // Calculate user statistics
    const totalRevenue = user.sellerOrders
      .filter(order => order.status === 'COMPLETED')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    const totalSpent = user.buyerOrders
      .filter(order => order.status === 'COMPLETED')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    const averageRating = user.services.length > 0
      ? user.services.reduce((sum, service) => sum + (service.rating || 0), 0) / user.services.length
      : 0

    return NextResponse.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        userType: user.userType,
        isVerified: user.isVerified,
        bio: user.bio,
        skills: user.skills,
        languages: user.languages,
        location: user.location,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stats: {
          servicesCount: user._count.services,
          buyerOrdersCount: user._count.buyerOrders,
          sellerOrdersCount: user._count.sellerOrders,
          messagesCount: 0,
          reviewsCount: user._count.reviews,
          totalRevenue,
          totalSpent,
          averageRating,
        },
        services: user.services,
        recentBuyerOrders: user.buyerOrders,
        recentSellerOrders: user.sellerOrders,
        recentMessages: [],
        reviews: user.reviews,
      },
    })
  } catch (error) {
    console.error('Admin user GET error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب بيانات المستخدم' },
      { status: 500 }
    )
  }
}

// Update user
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'غير مصرح لك بالوصول' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = userUpdateSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // Check if email is being changed and if it's already taken
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: validatedData.email },
      })

      if (emailExists) {
        return NextResponse.json(
          { error: 'البريد الإلكتروني مستخدم بالفعل' },
          { status: 400 }
        )
      }
    }

    // Prepare update data
    const updateData: any = { ...validatedData }
    
    // Hash password if provided
    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 12)
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        email: true,
        userType: true,
        isVerified: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      message: 'تم تحديث المستخدم بنجاح',
      user: updatedUser,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Admin user PATCH error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث المستخدم' },
      { status: 500 }
    )
  }
}

// Delete user (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
    return NextResponse.json(
      { error: 'غير مصرح لك بالوصول' },
      { status: 403 }
    )
  }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            buyerOrders: {
              where: {
                status: {
                  in: ['PENDING', 'ACTIVE'],
                },
              },
            },
            sellerOrders: {
              where: {
                status: {
                  in: ['PENDING', 'ACTIVE'],
                },
              },
            },
          },
        },
      },
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // Check if user has active orders
    const hasActiveOrders = existingUser._count.buyerOrders > 0 || existingUser._count.sellerOrders > 0
    
    if (hasActiveOrders) {
      return NextResponse.json(
        { error: 'لا يمكن حذف المستخدم لوجود طلبات نشطة' },
        { status: 400 }
      )
    }

    // Soft delete by deactivating the user
    await prisma.user.update({
      where: { id: params.id },
      data: {
        email: `deleted_${Date.now()}_${existingUser.email}`, // Prevent email conflicts  
      },
    })

    return NextResponse.json({
      message: 'تم حذف المستخدم بنجاح',
    })
  } catch (error) {
    console.error('Admin user DELETE error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في حذف المستخدم' },
      { status: 500 }
    )
  }
}