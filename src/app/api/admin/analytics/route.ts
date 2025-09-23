import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const analyticsQuerySchema = z.object({
  period: z.enum(['7d', '30d', '90d', '1y']).default('30d'),
  metrics: z.array(z.enum(['users', 'services', 'orders', 'revenue', 'engagement'])).optional(),
})

// Get comprehensive platform analytics
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
    const period = searchParams.get('period') || '30d'
    const metricsParam = searchParams.get('metrics')
    
    const days = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365,
    }[period] || 30
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    const endDate = new Date()

    // Previous period for comparison
    const prevStartDate = new Date(startDate)
    prevStartDate.setDate(prevStartDate.getDate() - days)
    const prevEndDate = new Date(startDate)

    // User Analytics
    const [currentUsers, previousUsers] = await Promise.all([
      prisma.user.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: prevStartDate,
            lte: prevEndDate,
          },
        },
      }),
    ])

    // User growth by role
    const userGrowthByRole = await prisma.user.groupBy({
      by: ['userType', 'createdAt'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Service Analytics
    const [currentServices, previousServices] = await Promise.all([
      prisma.service.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      prisma.service.count({
        where: {
          createdAt: {
            gte: prevStartDate,
            lte: prevEndDate,
          },
        },
      }),
    ])

    // Service status distribution
    const serviceStatusDistribution = await prisma.service.groupBy({
      by: ['isActive'],
      _count: {
        id: true,
      },
    })

    // Order Analytics
    const [currentOrders, previousOrders] = await Promise.all([
      prisma.order.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      prisma.order.count({
        where: {
          createdAt: {
            gte: prevStartDate,
            lte: prevEndDate,
          },
        },
      }),
    ])

    // Order status distribution
    const orderStatusDistribution = await prisma.order.groupBy({
      by: ['status'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
    })

    // Revenue Analytics
    const [currentRevenue, previousRevenue] = await Promise.all([
      prisma.order.aggregate({
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: {
          totalAmount: true,
        },
      }),
      prisma.order.aggregate({
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: prevStartDate,
            lte: prevEndDate,
          },
        },
        _sum: {
          totalAmount: true,
        },
      }),
    ])

    // Daily activity trends
    const dailyActivity = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        totalAmount: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Category performance
    const categoryPerformance = await prisma.service.groupBy({
      by: ['categoryId'],
      _count: {
        id: true,
      },
      _avg: {
        rating: true,
      },
    })

    // Get category order counts and revenue
    const categoryOrderStats = await Promise.all(
      categoryPerformance.map(async (cat) => {
        const orderStats = await prisma.order.aggregate({
          where: {
            service: {
              categoryId: cat.categoryId,
            },
            status: 'COMPLETED',
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          _count: {
            id: true,
          },
          _sum: {
            totalAmount: true,
          },
        })

        return {
          categoryId: cat.categoryId,
          servicesCount: cat._count.id,
          averageRating: cat._avg.rating || 0,
          ordersCount: orderStats._count.id,
          revenue: orderStats._sum.totalAmount || 0,
        }
      })
    )

    // User engagement metrics
    const engagementMetrics = await Promise.all([
      // Active users (users who placed orders)
      prisma.user.count({
        where: {
          buyerOrders: {
            some: {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        },
      }),
      
      // Total reviews
      prisma.review.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
    ])

    // Calculate growth percentages
    const calculateGrowth = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0
      return ((current - previous) / previous) * 100
    }

    const userGrowth = calculateGrowth(currentUsers, previousUsers)
    const serviceGrowth = calculateGrowth(currentServices, previousServices)
    const orderGrowth = calculateGrowth(currentOrders, previousOrders)
    const revenueGrowth = calculateGrowth(
      currentRevenue._sum.totalAmount || 0,
      previousRevenue._sum.totalAmount || 0
    )

    // Format daily activity for charts
    const formattedDailyActivity = dailyActivity.map(day => ({
      date: day.createdAt.toISOString().split('T')[0],
      orders: day._count.id,
      revenue: day._sum.totalAmount || 0,
    }))

    // User role distribution
    const userRoleDistribution = await prisma.user.groupBy({
      by: ['userType'],
      _count: {
        id: true,
      },
    })

    // Top performing services
    const topServices = await prisma.service.findMany({
      where: {
        orders: {
          some: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      include: {
        user: {
          select: {
            fullName: true,
          },
        },
        _count: {
          select: {
            orders: {
              where: {
                createdAt: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
          },
        },
      },
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
      take: 10,
    })

    return NextResponse.json({
      overview: {
        users: {
          current: currentUsers,
          growth: userGrowth,
        },
        services: {
          current: currentServices,
          growth: serviceGrowth,
        },
        orders: {
          current: currentOrders,
          growth: orderGrowth,
        },
        revenue: {
          current: currentRevenue._sum.totalAmount || 0,
          growth: revenueGrowth,
        },
      },
      distributions: {
        userRoles: userRoleDistribution,
        serviceStatus: serviceStatusDistribution,
        orderStatus: orderStatusDistribution,
      },
      trends: {
        dailyActivity: formattedDailyActivity,
        userGrowthByRole: userGrowthByRole,
      },
      categories: categoryOrderStats.sort((a, b) => b.revenue - a.revenue),
      engagement: {
        activeUsers: engagementMetrics[0],
        totalReviews: engagementMetrics[1],
      },
      topServices: topServices.map(service => ({
        id: service.id,
        title: service.title,
        categoryId: service.categoryId,
        sellerName: service.user.fullName,
        ordersCount: service._count.orders,
        averageRating: service.rating,
      })),
      period: {
        days,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    })
  } catch (error) {
    console.error('Admin analytics GET error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب بيانات التحليلات' },
      { status: 500 }
    )
  }
}