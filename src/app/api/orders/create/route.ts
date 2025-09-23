import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { serviceId, packageId, totalAmount, deliveryDate } = await request.json()

    const order = await prisma.order.create({
      data: {
        buyerId: session.user.id,
        sellerId: serviceId, // Will be updated with actual seller ID
        serviceId,
        packageId: packageId || '1',
        totalAmount,
        deliveryDate: new Date(deliveryDate),
        status: 'PENDING'
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}