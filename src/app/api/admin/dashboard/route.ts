import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Admin dashboard statistics API
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
    const period = searchParams.get('period') || '30' // days
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    // Get dashboard statistics
    const [totalUsers, totalServices, totalOrders, totalRevenue] = await Promise.all([
      // Total users count
      prisma.user.count(),
      
      // Total services count
      prisma.service.count(),
      
      // Total orders count
      prisma.order.count(),
      
      // Total revenue
      prisma.order.aggregate({
        where: {
          status: 'COMPLETED',
        },
        _sum: {
          totalAmount: true,
        },
      }),
    ])

    // Get recent activity statistics
    const [recentUsers, recentServices, recentOrders, pendingOrders] = await Promise.all([
      // Recent users (last 30 days)
      prisma.user.count({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
      }),
      
      // Recent services
      prisma.service.count({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
      }),
      
      // Recent orders
      prisma.order.count({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
      }),
      
      // Pending orders
      prisma.order.count({
        where: {
          status: 'PENDING',
        },
      }),
    ])

    // Get user growth data for charts
    const userGrowthData = await prisma.user.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Get revenue data for charts
    const revenueData = await prisma.order.groupBy({
      by: ['createdAt'],
      _sum: {
        totalAmount: true,
      },
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Get top categories
    const topCategories = await prisma.service.groupBy({
      by: ['categoryId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 5,
    })

    // Get top sellers
    const topSellers = await prisma.user.findMany({
      where: {
        userType: 'SELLER',
      },
      include: {
        _count: {
          select: {
            services: true,
            sellerOrders: true,
          },
        },
        sellerOrders: {
          where: {
            status: 'COMPLETED',
          },
          select: {
            totalAmount: true,
          },
        },
      },
      orderBy: {
        sellerOrders: {
          _count: 'desc',
        },
      },
      take: 5,
    })

    // Calculate seller revenues
    const topSellersWithRevenue = topSellers.map(seller => ({
      id: seller.id,
      name: seller.fullName,
      email: seller.email,
      avatar: seller.avatar,
      servicesCount: seller._count.services,
      ordersCount: seller._count.sellerOrders,
      totalRevenue: seller.sellerOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    }))

    return NextResponse.json({
      overview: {
        totalUsers,
        totalServices,
        totalOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        recentUsers,
        recentServices,
        recentOrders,
        pendingOrders,
      },
      charts: {
        userGrowth: userGrowthData.map(item => ({
          date: item.createdAt.toISOString().split('T')[0],
          count: item._count.id,
        })),
        revenue: revenueData.map(item => ({
          date: item.createdAt.toISOString().split('T')[0],
          amount: item._sum.totalAmount || 0,
        })),
        topCategories: topCategories.map(item => ({
          categoryId: item.categoryId,
          count: item._count.id,
        })),
      },
      topSellers: topSellersWithRevenue,
    })
  } catch (error) {
    console.error('Admin dashboard error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب بيانات لوحة التحكم' },
      { status: 500 }
    )
  }
}