import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'الاسم الكامل يجب أن يكون حرفين على الأقل').optional(),
  bio: z.string().max(500, 'الوصف طويل جداً').optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  languages: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional()
})

const addPortfolioItemSchema = z.object({
  title: z.string().min(3, 'عنوان العمل يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(10, 'وصف العمل يجب أن يكون 10 أحرف على الأقل'),
  images: z.array(z.string()).min(1, 'يجب إضافة صورة واحدة على الأقل'),
  technologies: z.array(z.string()).optional(),
  projectUrl: z.string().url('رابط المشروع غير صحيح').optional(),
  completedAt: z.string().datetime().optional()
})

const addCertificationSchema = z.object({
  name: z.string().min(3, 'اسم الشهادة يجب أن يكون 3 أحرف على الأقل'),
  issuer: z.string().min(2, 'جهة الإصدار يجب أن تكون حرفين على الأقل'),
  issueDate: z.string().datetime(),
  expiryDate: z.string().datetime().optional(),
  credentialUrl: z.string().url('رابط الشهادة غير صحيح').optional()
})

const addWorkHistorySchema = z.object({
  title: z.string().min(2, 'عنوان العمل يجب أن يكون حرفين على الأقل'),
  company: z.string().min(2, 'اسم الشركة يجب أن يكون حرفين على الأقل'),
  duration: z.string().min(2, 'مدة العمل مطلوبة'),
  description: z.string().min(10, 'وصف العمل يجب أن يكون 10 أحرف على الأقل'),
  technologies: z.array(z.string()).optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        avatar: true,
        bio: true,
        phone: true,
        location: true,
        languages: true,
        skills: true,
        rating: true,
        totalReviews: true,
        level: true,
        isOnline: true,
        lastSeen: true,
        memberSince: true,
        emailVerified: true,
        portfolioItems: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            description: true,
            images: true,
            technologies: true,
            projectUrl: true,
            completedAt: true,
            createdAt: true
          }
        },
        certifications: {
          orderBy: { issueDate: 'desc' },
          select: {
            id: true,
            name: true,
            issuer: true,
            issueDate: true,
            expiryDate: true,
            credentialUrl: true
          }
        },
        workHistory: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            company: true,
            duration: true,
            description: true,
            technologies: true
          }
        },
        services: {
          where: { isActive: true },
          select: {
            id: true,
            title: true,
            images: true,
            rating: true,
            totalReviews: true,
            packages: {
              orderBy: { price: 'asc' },
              take: 1,
              select: { price: true }
            }
          }
        },
        _count: {
          select: {
            services: { where: { isActive: true } },
            sellerOrders: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)

  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الملف الشخصي' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    // Check if user is updating their own profile
    if (session.user.id !== params.id) {
      return NextResponse.json(
        { error: 'لا يمكنك تعديل ملف شخصي آخر' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: validatedData,
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        avatar: true,
        bio: true,
        phone: true,
        location: true,
        languages: true,
        skills: true
      }
    })

    return NextResponse.json({
      message: 'تم تحديث الملف الشخصي بنجاح',
      user: updatedUser
    })

  } catch (error) {
    console.error('Error updating user profile:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث الملف الشخصي' },
      { status: 500 }
    )
  }
}

// Add portfolio item
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    if (session.user.id !== params.id) {
      return NextResponse.json(
        { error: 'لا يمكنك إضافة عمل لملف شخصي آخر' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { type, ...data } = body

    if (type === 'portfolio') {
      const validatedData = addPortfolioItemSchema.parse(data)
      
      const portfolioItem = await prisma.portfolioItem.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          images: validatedData.images,
          technologies: validatedData.technologies || [],
          projectUrl: validatedData.projectUrl,
          completedAt: validatedData.completedAt ? new Date(validatedData.completedAt) : new Date(),
          userId: params.id
        }
      })

      return NextResponse.json({
        message: 'تم إضافة العمل بنجاح',
        portfolioItem
      }, { status: 201 })
    }

    if (type === 'certification') {
      const validatedData = addCertificationSchema.parse(data)
      
      const certification = await prisma.certification.create({
        data: {
          ...validatedData,
          userId: params.id,
          issueDate: new Date(validatedData.issueDate),
          expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null
        }
      })

      return NextResponse.json({
        message: 'تم إضافة الشهادة بنجاح',
        certification
      }, { status: 201 })
    }

    if (type === 'workHistory') {
      const validatedData = addWorkHistorySchema.parse(data)
      
      const workHistory = await prisma.workHistoryItem.create({
        data: {
          ...validatedData,
          userId: params.id
        }
      })

      return NextResponse.json({
        message: 'تم إضافة الخبرة العملية بنجاح',
        workHistory
      }, { status: 201 })
    }

    return NextResponse.json(
      { error: 'نوع البيانات غير صحيح' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Error adding profile data:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ في إضافة البيانات' },
      { status: 500 }
    )
  }
}