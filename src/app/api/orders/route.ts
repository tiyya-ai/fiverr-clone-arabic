import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول' },
        { status: 401 }
      )
    }

    const { serviceId, packageId, requirements } = await request.json()

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        packages: {
          where: { id: packageId }
        },
        user: true
      }
    })

    if (!service || service.packages.length === 0) {
      return NextResponse.json(
        { error: 'الخدمة أو الباقة غير موجودة' },
        { status: 404 }
      )
    }

    const selectedPackage = service.packages[0]
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + selectedPackage.deliveryTime)

    const order = await prisma.order.create({
      data: {
        serviceId,
        packageId,
        buyerId: (session.user as any).id,
        sellerId: service.userId,
        totalAmount: selectedPackage.price,
        requirements,
        deliveryDate
      },
      include: {
        service: {
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
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'buying' or 'selling'
    const userId = (session.user as any).id

    const where = type === 'selling' 
      ? { sellerId: userId }
      : { buyerId: userId }

    const orders = await prisma.order.findMany({
      where,
      include: {
        service: {
          select: {
            title: true,
            images: true
          }
        },
        package: {
          select: {
            name: true,
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