'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowRight, Package, User, DollarSign, Calendar, MessageSquare, CheckCircle } from 'lucide-react'

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setTimeout(() => {
      const mockOrder = {
        id: orderId,
        service: 'تصميم شعار احترافي',
        buyer: 'أحمد محمد',
        seller: 'فاطمة علي',
        amount: 150,
        status: 'قيد التنفيذ',
        createdDate: '2024-02-20',
        deliveryDate: '2024-02-25',
        description: 'تصميم شعار احترافي للشركة مع 3 مراجعات مجانية'
      }
      setOrder(mockOrder)
      setLoading(false)
    }, 500)
  }, [orderId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل تفاصيل الطلب...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">الطلب غير موجود</h2>
        <button
          onClick={() => router.push('/admin/orders')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          العودة إلى الطلبات
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تفاصيل الطلب #{order.id}</h1>
          <p className="text-gray-600 mt-2">معلومات مفصلة عن الطلب</p>
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الطلب</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">الخدمة</p>
              <p className="font-medium">{order.service}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">المبلغ</p>
              <p className="font-medium">${order.amount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">المشتري</p>
              <p className="font-medium">{order.buyer}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">البائع</p>
              <p className="font-medium">{order.seller}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">تاريخ الطلب</p>
              <p className="font-medium">{order.createdDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">تاريخ التسليم</p>
              <p className="font-medium">{order.deliveryDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">حالة الطلب</h3>
        <div className="flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-blue-600" />
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {order.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">وصف الطلب</h3>
        <p className="text-gray-700">{order.description}</p>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">الإجراءات</h3>
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/messages?order=${order.id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            المراسلة
          </button>
          <button
            onClick={() => alert('تم إرسال تذكير للبائع')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            إرسال تذكير
          </button>
          <button
            onClick={() => {
              if (confirm('هل تريد إلغاء هذا الطلب؟')) {
                alert('تم إلغاء الطلب')
                router.push('/admin/orders')
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            إلغاء الطلب
          </button>
        </div>
      </div>
    </div>
  )
}