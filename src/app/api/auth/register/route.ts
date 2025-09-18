import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const registerSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم'),
  fullName: z.string().min(2, 'الاسم الكامل مطلوب').max(100, 'الاسم طويل جداً'),
  username: z.string().min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل')
    .max(30, 'اسم المستخدم طويل جداً')
    .regex(/^[a-zA-Z0-9_]+$/, 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط'),
  userType: z.enum(['BUYER', 'SELLER', 'BOTH']),
  phone: z.string().optional(),

  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'يجب الموافقة على الشروط والأحكام'
  })
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username }
        ]
      }
    })
    
    if (existingUser) {
      if (existingUser.email === validatedData.email) {
        return NextResponse.json(
          { error: 'البريد الإلكتروني مستخدم بالفعل' },
          { status: 400 }
        )
      }
      if (existingUser.username === validatedData.username) {
        return NextResponse.json(
          { error: 'اسم المستخدم مستخدم بالفعل' },
          { status: 400 }
        )
      }
    }
    
    // Hash password with strong salt
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)
    
    // Create user with comprehensive data
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        fullName: validatedData.fullName,
        username: validatedData.username,
        userType: validatedData.userType,
        phone: validatedData.phone,
        location: 'السعودية',
        memberSince: new Date().getFullYear().toString(),
        skills: [],
        languages: ['العربية'],
        isOnline: true,
        lastSeen: new Date(),
        level: 'مبتدئ',
        emailVerified: false // Will be set when email is verified
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        userType: true,
        avatar: true,
        createdAt: true
      }
    })
    
    return NextResponse.json({
      message: 'تم إنشاء الحساب بنجاح',
      user
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء الحساب' },
      { status: 500 }
    )
  }
}