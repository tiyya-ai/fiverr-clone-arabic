import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const createServiceSchema = z.object({
  title: z.string().min(10, 'عنوان الخدمة يجب أن يكون 10 أحرف على الأقل').max(80, 'عنوان الخدمة طويل جداً'),
  description: z.string().min(120, 'وصف الخدمة يجب أن يكون 120 حرف على الأقل').max(1200, 'وصف الخدمة طويل جداً'),
  category: z.string().min(1, 'فئة الخدمة مطلوبة'),
  tags: z.array(z.string()).min(1, 'يجب إضافة كلمة مفتاحية واحدة على الأقل').max(5, 'عدد الكلمات المفتاحية كثير جداً'),
  images: z.array(z.string()).min(1, 'يجب إضافة صورة واحدة على الأقل').max(5, 'عدد الصور كثير جداً'),
  packages: z.array(z.object({
    name: z.string().min(3, 'اسم الباقة يجب أن يكون 3 أحرف على الأقل'),
    type: z.enum(['basic', 'standard', 'premium']),
    description: z.string().min(20, 'وصف الباقة يجب أن يكون 20 حرف على الأقل'),
    price: z.number().min(5, 'سعر الباقة يجب أن يكون 5 ريال على الأقل'),
    deliveryTime: z.number().min(1, 'مدة التسليم يجب أن تكون يوم واحد على الأقل').max(30, 'مدة التسليم طويلة جداً'),
    revisions: z.number().min(0).max(10),
    features: z.array(z.string()).min(1, 'يجب إضافة ميزة واحدة على الأقل')
  })).min(1, 'يجب إضافة باقة واحدة على الأقل').max(3, 'عدد الباقات كثير جداً')
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
    const validatedData = createServiceSchema.parse(body)

    // Check if user has reached service limit (e.g., 20 services max)
    const userServicesCount = await prisma.service.count({
      where: { userId: session.user.id }
    })

    if (userServicesCount >= 20) {
      return NextResponse.json(
        { error: 'لقد وصلت للحد الأقصى من الخدمات المسموح بها' },
        { status: 400 }
      )
    }

    // Create service with packages and FAQs
    const service = await prisma.service.create({
      data: {
        title: validatedData.title,
        titleEn: validatedData.title, // Add English title
        description: validatedData.description,
        descriptionEn: validatedData.description, // Add English description
        categoryId: validatedData.category,
        tags: validatedData.tags,
        images: validatedData.images,
        userId: session.user.id,
        packages: {
          create: validatedData.packages.map(pkg => ({
            name: pkg.name,
            nameEn: pkg.name,
            type: pkg.type,
            description: pkg.description,
            descriptionEn: pkg.description,
            price: pkg.price,
            deliveryTime: pkg.deliveryTime,
            revisions: pkg.revisions,
            features: pkg.features
          }))
        }
      },
      include: {
        packages: true,
        user: {
          select: {
            fullName: true,
            username: true,
            avatar: true,
            rating: true,
            totalReviews: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'تم إنشاء الخدمة بنجاح وهي قيد المراجعة',
      service
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating service:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء الخدمة' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const rating = searchParams.get('rating')
    const deliveryTime = searchParams.get('deliveryTime')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const userId = searchParams.get('userId')
    const skip = (page - 1) * limit

    // Build where clause
    let whereClause: any = {
      status: 'ACTIVE'
    }

    if (userId) {
      whereClause.userId = userId
      delete whereClause.status // Show all statuses for user's own services
    }

    if (category) {
      whereClause.category = category
    }

    if (subcategory) {
      whereClause.subcategory = subcategory
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } }
      ]
    }

    if (rating) {
      whereClause.rating = { gte: parseFloat(rating) }
    }

    // Price and delivery time filters require package data
    let packageWhere: any = {}
    if (minPrice || maxPrice || deliveryTime) {
      if (minPrice) packageWhere.price = { ...packageWhere.price, gte: parseFloat(minPrice) }
      if (maxPrice) packageWhere.price = { ...packageWhere.price, lte: parseFloat(maxPrice) }
      if (deliveryTime) packageWhere.deliveryTime = { lte: parseInt(deliveryTime) }
      
      whereClause.packages = {
        some: packageWhere
      }
    }

    // Build order by clause
    let orderBy: any = {}
    switch (sortBy) {
      case 'price':
        orderBy = { packages: { _min: { price: sortOrder } } }
        break
      case 'rating':
        orderBy = { rating: sortOrder }
        break
      case 'reviews':
        orderBy = { totalReviews: sortOrder }
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'popular':
        orderBy = { totalOrders: 'desc' }
        break
      default:
        orderBy = { [sortBy]: sortOrder }
    }

    const [services, totalCount] = await Promise.all([
      prisma.service.findMany({
        where: whereClause,
        include: {
          packages: {
            orderBy: { price: 'asc' },
            select: {
              id: true,
              name: true,
              type: true,
              price: true,
              deliveryTime: true,
              revisions: true,
              features: true
            }
          },
          user: {
            select: {
              id: true,
              fullName: true,
              username: true,
              avatar: true,
              rating: true,
              totalReviews: true,
              level: true,
              isOnline: true
            }
          },
          reviews: {
            take: 3,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              rating: true,
              comment: true,
              createdAt: true,
              user: {
                select: {
                  fullName: true,
                  username: true,
                  avatar: true
                }
              }
            }
          },
          _count: {
            select: {
              reviews: true,
              orders: { where: { status: 'COMPLETED' } }
            }
          }
        },
        orderBy,
        skip,
        take: limit
      }),
      prisma.service.count({ where: whereClause })
    ])

    return NextResponse.json({
      services,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      },
      filters: {
        category,
        subcategory,
        search,
        minPrice,
        maxPrice,
        rating,
        deliveryTime,
        sortBy,
        sortOrder
      }
    })

  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الخدمات' },
      { status: 500 }
    )
  }
}