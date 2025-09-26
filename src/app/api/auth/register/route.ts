import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const registerSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  fullName: z.string().min(2, 'الاسم الكامل يجب أن يكون حرفين على الأقل'),
  phone: z.string().optional(),
  location: z.string().default('السعودية'),
  userType: z.enum(['BUYER', 'SELLER']).default('BUYER'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مستخدم بالفعل' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Generate username from email
    const username = validatedData.email.split('@')[0]

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        fullName: validatedData.fullName,
        username: username,
        phone: validatedData.phone,
        location: validatedData.location,
        userType: validatedData.userType,
        emailVerified: false,
        isOnline: false,
        memberSince: new Date().getFullYear().toString(),
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        userType: true,
        createdAt: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      user,
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء الحساب. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    )
  }
}