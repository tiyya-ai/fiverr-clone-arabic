import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const logsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  action: z.string().optional(),
  adminId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  search: z.string().optional(),
})

// Get admin activity logs
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
    const {
      page,
      limit,
      action,
      adminId,
      startDate,
      endDate,
      search,
    } = logsQuerySchema.parse(Object.fromEntries(searchParams))

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (action) {
      where.action = action
    }

    if (adminId) {
      where.adminId = adminId
    }

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate)
      }
    }

    if (search) {
      where.OR = [
        {
          details: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          admin: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          admin: {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ]
    }

    // Mock logs data for now (adminLog model not in schema)
    const mockLogs = [
      {
        id: '1',
        action: 'LOGIN',
        details: 'تسجيل دخول المدير',
        ipAddress: '192.168.1.1',
        createdAt: new Date(),
        admin: {
          id: session.user.id,
          name: session.user.name || 'Admin',
          email: session.user.email,
          avatar: session.user.image,
        },
      },
    ]
    
    const logs = mockLogs.slice(skip, skip + limit)
    const totalCount = mockLogs.length

    // Mock statistics data
    const actionStats = [
      { action: 'LOGIN', _count: { id: 25 } },
      { action: 'UPDATE_SERVICE', _count: { id: 15 } },
      { action: 'DELETE_USER', _count: { id: 3 } },
    ]

    const adminStatsWithNames = [
      {
        adminId: session.user.id,
        adminName: session.user.name || 'Admin',
        adminEmail: session.user.email,
        actionsCount: 43,
      },
    ]

    const recentCriticalActions: any[] = []

    // Format logs for response
    const formattedLogs = logs.map(log => ({
      id: log.id,
      action: log.action,
      details: log.details,
      ipAddress: log.ipAddress,
      createdAt: log.createdAt,
      admin: {
        id: log.admin.id,
        name: log.admin.name,
        email: log.admin.email,
        avatar: log.admin.avatar,
      },
    }))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      logs: formattedLogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      statistics: {
        actionStats: actionStats.map(stat => ({
          action: stat.action,
          count: stat._count.id,
        })),
        adminStats: adminStatsWithNames,
        recentCriticalActions: recentCriticalActions.map(action => ({
          id: action.id,
          action: action.action,
          details: action.details,
          adminName: action.admin.name,
          createdAt: action.createdAt,
        })),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'معاملات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Admin logs GET error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب سجلات النشاط' },
      { status: 500 }
    )
  }
}

// Create new admin log entry
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'غير مصرح لك بالوصول' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { action, details } = z.object({
      action: z.string().min(1),
      details: z.string().min(1),
    }).parse(body)

    // Mock log creation
    const log = {
      id: Date.now().toString(),
      action,
      details,
      createdAt: new Date(),
      admin: {
        name: session.user.name || 'Admin',
        email: session.user.email,
      },
    }

    return NextResponse.json({
      message: 'تم إنشاء سجل النشاط بنجاح',
      log: {
        id: log.id,
        action: log.action,
        details: log.details,
        createdAt: log.createdAt,
        admin: log.admin,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Admin logs POST error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء سجل النشاط' },
      { status: 500 }
    )
  }
}

// Delete old logs (cleanup)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.userType !== 'ADMIN') {
    return NextResponse.json(
      { error: 'غير مصرح لك بالوصول' },
      { status: 403 }
    )
  }

    const { searchParams } = new URL(request.url)
    const daysToKeep = parseInt(searchParams.get('days') || '90')

    if (daysToKeep < 30) {
      return NextResponse.json(
        { error: 'لا يمكن حذف السجلات الأحدث من 30 يوماً' },
        { status: 400 }
      )
    }

    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)

    // Mock deletion
    const deletedCount = { count: 0 }

    return NextResponse.json({
      message: 'تم تنظيف السجلات بنجاح',
      deletedCount: 0,
    })
  } catch (error) {
    console.error('Admin logs DELETE error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في حذف السجلات' },
      { status: 500 }
    )
  }
}