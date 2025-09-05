import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول' },
        { status: 401 }
      )
    }

    const { gigId, packageId, requirements } = await request.json()

    const gig = await prisma.gig.findUnique({
      where: { id: gigId },
      include: {
        packages: {
          where: { id: packageId }
        },
        user: true
      }
    })

    if (!gig || gig.packages.length === 0) {
      return NextResponse.json(
        { error: 'الخدمة أو الباقة غير موجودة' },
        { status: 404 }
      )
    }

    const selectedPackage = gig.packages[0]
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + selectedPackage.deliveryTime)

    const order = await prisma.order.create({
      data: {
        gigId,
        packageId,
        buyerId: session.user.id,
        sellerId: gig.userId,
        totalAmount: selectedPackage.price,
        requirements,
        dueDate
      },
      include: {
        gig: {
          include: {
            user: {
              select: {
                fullName: true,
                username: true
              }
            }
          }
        },
        package: true
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء الطلب' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'buying' or 'selling'

    const where = type === 'selling' 
      ? { sellerId: session.user.id }
      : { buyerId: session.user.id }

    const orders = await prisma.order.findMany({
      where,
      include: {
        gig: {
          select: {
            title: true,
            images: true
          }
        },
        package: {
          select: {
            title: true,
            type: true
          }
        },
        buyer: {
          select: {
            fullName: true,
            username: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الطلبات' },
      { status: 500 }
    )
  }
}