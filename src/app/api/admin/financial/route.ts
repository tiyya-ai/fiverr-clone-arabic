import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const financialReportSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  period: z.enum(['7d', '30d', '90d', '1y', 'custom']).default('30d'),
  groupBy: z.enum(['day', 'week', 'month']).default('day'),
})

// Get financial reports and analytics
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
    const groupBy = searchParams.get('groupBy') || 'day'
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')

    // Calculate date range
    let startDate: Date
    let endDate = new Date()
    
    if (period === 'custom' && startDateParam && endDateParam) {
      startDate = new Date(startDateParam)
      endDate = new Date(endDateParam)
    } else {
      const days = {
        '7d': 7,
        '30d': 30,
        '90d': 90,
        '1y': 365,
      }[period] || 30
      
      startDate = new Date()
      startDate.setDate(startDate.getDate() - days)
    }

    // Get overall financial statistics
    const [totalRevenue, totalOrders, completedOrders, refundedOrders] = await Promise.all([
      // Total revenue from completed orders
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
      
      // Total orders count
      prisma.order.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      
      // Completed orders count
      prisma.order.count({
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      
      // Refunded orders
      prisma.order.aggregate({
        where: {
          status: 'CANCELLED',
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: {
          totalAmount: true,
        },
        _count: {
          id: true,
        },
      }),
    ])

    // Calculate commission (assuming 10% platform fee)
    const PLATFORM_COMMISSION_RATE = 0.10
    const grossRevenue = totalRevenue._sum.totalAmount || 0
    const platformCommission = grossRevenue * PLATFORM_COMMISSION_RATE
    const netRevenue = grossRevenue - platformCommission
    const refundedAmount = refundedOrders._sum.totalAmount || 0

    // Get revenue trends grouped by period
    const revenueTrends = await prisma.order.groupBy({
      by: ['createdAt'],
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
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Group revenue trends by the specified period
    const groupedTrends = groupRevenueTrends(revenueTrends, groupBy)

    // Get top performing categories
    const topCategories = await prisma.order.groupBy({
      by: ['serviceId'],
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
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          totalAmount: 'desc',
        },
      },
      take: 10,
    })

    // Get category details
    const categoryDetails = await Promise.all(
      topCategories.map(async (cat) => {
        const service = await prisma.service.findUnique({
          where: { id: cat.serviceId },
          select: {
            category: true,
          },
        })
        return {
          category: service?.category?.name || 'غير محدد',
          revenue: cat._sum.totalAmount || 0,
          ordersCount: cat._count.id,
        }
      })
    )

    // Group by main category
    const categoryRevenue = categoryDetails.reduce((acc, item) => {
      const existing = acc.find(cat => cat.category === item.category)
      if (existing) {
        existing.revenue += item.revenue
        existing.ordersCount += item.ordersCount
      } else {
        acc.push({
          category: item.category,
          revenue: item.revenue,
          ordersCount: item.ordersCount,
        })
      }
      return acc
    }, [] as Array<{ category: string; revenue: number; ordersCount: number }>)

    // Get top sellers by revenue
    const topSellers = await prisma.user.findMany({
      where: {
        userType: 'SELLER',
        sellerOrders: {
          some: {
            status: 'COMPLETED',
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      include: {
        sellerOrders: {
          where: {
            status: 'COMPLETED',
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          select: {
            totalAmount: true,
          },
        },
        _count: {
          select: {
            services: true,
          },
        },
      },
      take: 10,
    })

    const topSellersWithRevenue = topSellers
      .map(seller => {
        const totalRevenue = seller.sellerOrders.reduce(
          (sum, order) => sum + (order.totalAmount || 0),
          0
        )
        const commission = totalRevenue * PLATFORM_COMMISSION_RATE
        
        return {
          id: seller.id,
          name: seller.fullName,
          email: seller.email,
          avatar: seller.avatar,
          servicesCount: seller._count.services,
          ordersCount: seller.sellerOrders.length,
          totalRevenue,
          platformCommission: commission,
          sellerEarnings: totalRevenue - commission,
        }
      })
      .sort((a, b) => b.totalRevenue - a.totalRevenue)

    // Calculate average order value
    const averageOrderValue = completedOrders > 0 ? grossRevenue / completedOrders : 0

    // Calculate conversion rate (completed orders / total orders)
    const conversionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0

    return NextResponse.json({
      overview: {
        grossRevenue,
        netRevenue,
        platformCommission,
        refundedAmount,
        totalOrders,
        completedOrders,
        refundedOrders: refundedOrders._count.id,
        averageOrderValue,
        conversionRate,
      },
      trends: {
        revenue: groupedTrends,
        period: groupBy,
      },
      categories: categoryRevenue.slice(0, 10),
      topSellers: topSellersWithRevenue,
      dateRange: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    })
  } catch (error) {
    console.error('Admin financial GET error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب التقارير المالية' },
      { status: 500 }
    )
  }
}

// Helper function to group revenue trends by period
function groupRevenueTrends(
  trends: Array<{
    createdAt: Date
    _sum: { totalAmount: number | null }
    _count: { id: number }
  }>,
  groupBy: string
) {
  const grouped = new Map<string, { revenue: number; orders: number }>()

  trends.forEach(trend => {
    let key: string
    const date = new Date(trend.createdAt)
    
    switch (groupBy) {
      case 'day':
        key = date.toISOString().split('T')[0]
        break
      case 'week':
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        key = weekStart.toISOString().split('T')[0]
        break
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        break
      default:
        key = date.toISOString().split('T')[0]
    }

    const existing = grouped.get(key) || { revenue: 0, orders: 0 }
    existing.revenue += trend._sum.totalAmount || 0
    existing.orders += trend._count.id
    grouped.set(key, existing)
  })

  return Array.from(grouped.entries()).map(([date, data]) => ({
    date,
    revenue: data.revenue,
    orders: data.orders,
  }))
}