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
  emailVerified: z.boolean().optional(),
})

const userCreateSchema = z.object({
  fullName: z.string().min(2),
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  location: z.string().min(2),
  userType: z.enum(['BUYER', 'SELLER', 'ADMIN']),
  emailVerified: z.boolean().default(false),
  memberSince: z.string().default(new Date().toISOString().split('T')[0]),
})

// Get all users with filtering and pagination
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
    const userType = searchParams.get('userType')
    const status = searchParams.get('status')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }
    
    if (userType) {
    where.userType = userType
    }
    
    if (status === 'active') {
      where.isActive = true
    } else if (status === 'inactive') {
      where.isActive = false
    } else if (status === 'verified') {
      where.isVerified = true
    } else if (status === 'unverified') {
      where.isVerified = false
    }

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          _count: {
            select: {
              services: true,
              buyerOrders: true,
              sellerOrders: true,
              sentMessages: true,
              receivedMessages: true,
            },
          },
          services: {
            select: {
              id: true,
              title: true,
              isActive: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      users: users.map(user => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        userType: user.userType,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stats: {
          servicesCount: user.services.length,
          buyerOrdersCount: user._count.buyerOrders,
          sellerOrdersCount: user._count.sellerOrders,
          messagesCount: user._count.sentMessages + user._count.receivedMessages,
        },
        services: user.services,
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
    console.error('Admin users GET error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب بيانات المستخدمين' },
      { status: 500 }
    )
  }
}

// Create new user
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
    const validatedData = userCreateSchema.parse(body)

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مستخدم بالفعل' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        userType: true,
        isVerified: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      message: 'تم إنشاء المستخدم بنجاح',
      user,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Admin users POST error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء المستخدم' },
      { status: 500 }
    )
  }
}