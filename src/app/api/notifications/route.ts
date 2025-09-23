import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const notifications = [
      {
        id: '1',
        type: 'order',
        title: 'طلب جديد',
        message: 'لديك طلب جديد على خدمة تصميم الشعار',
        read: false,
        createdAt: new Date(),
        actionUrl: '/orders/1'
      },
      {
        id: '2',
        type: 'message',
        title: 'رسالة جديدة',
        message: 'رسالة جديدة من أحمد محمد',
        read: false,
        createdAt: new Date(Date.now() - 3600000),
        actionUrl: '/messages/1'
      }
    ]

    return NextResponse.json({ notifications })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}