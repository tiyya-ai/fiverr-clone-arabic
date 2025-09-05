import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, username, password, fullName, userType } = await request.json()

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'المستخدم موجود بالفعل' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        fullName,
        userType: userType || 'BUYER'
      }
    })

    await prisma.wallet.create({
      data: {
        userId: user.id
      }
    })

    return NextResponse.json(
      { message: 'تم إنشاء الحساب بنجاح' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    )
  }
}