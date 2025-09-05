'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowRight, User, Package, DollarSign, Calendar, MessageSquare, CheckCircle, XCircle } from 'lucide-react'

export default function DisputeDetailPage() {
  const router = useRouter()
  const params = useParams()
  const disputeId = params.id as string

  const [dispute, setDispute] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Mock data - in real app, fetch from API
  useEffect(() => {
    setTimeout(() => {
      const mockDispute = {
        id: disputeId,
        order: 'تصميم شعار احترافي',
        orderId: 'ORD123',
        buyer: 'أحمد محمد',
        seller: 'فاطمة علي',
        amount: 150,
        reason: 'عدم مطابقة المواصفات',
        description: 'الشعار المسلم لا يطابق المواصفات المطلوبة والألوان المحددة في البداية',
        status: 'مفتوح',
        priority: 'عالية',
        createdDate: '2024-02-20',
        messages: [
          { sender: 'أحمد محمد', message: 'الشعار لا يطابق المواصفات المطلوبة', time: '2024-02-20 10:30' },
          { sender: 'فاطمة علي', message: 'يمكنني إجراء التعديلات المطلوبة', time: '2024-02-20 11:15' }
        ]
      }
      setDispute(mockDispute)
      setLoading(false)
    }, 500)
  }, [disputeId])

  const handleResolveDispute = (resolution: 'buyer' | 'seller') => {
    const party = resolution === 'buyer' ? 'المشتري' : 'البائع'
    if (confirm(`هل تريد حل النزاع لصالح ${party}؟`)) {
      alert(`تم حل النزاع لصالح ${party}`)
      router.push('/admin/disputes')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل تفاصيل النزاع...</p>
        </div>
      </div>
    )
  }

  if (!dispute) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">النزاع غير موجود</h2>
        <button
          onClick={() => router.push('/admin/disputes')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          العودة إلى النزاعات
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تفاصيل النزاع #{dispute.id}</h1>
          <p className="text-gray-600 mt-2">إدارة وحل النزاع</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dispute Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات النزاع</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">الخدمة</p>
                  <p className="font-medium">{dispute.order}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">المبلغ</p>
                  <p className="font-medium">${dispute.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">المشتري</p>
                  <p className="font-medium">{dispute.buyer}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">البائع</p>
                  <p className="font-medium">{dispute.seller}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dispute Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل النزاع</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">سبب النزاع</p>
                <p className="font-medium">{dispute.reason}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">الوصف</p>
                <p className="text-gray-700">{dispute.description}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">المراسلات</h3>
            <div className="space-y-4">
              {dispute.messages.map((message: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-900">{message.sender}</p>
                    <p className="text-sm text-gray-500">{message.time}</p>
                  </div>
                  <p className="text-gray-700">{message.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">حالة النزاع</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">الحالة:</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {dispute.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الأولوية:</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {dispute.priority}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ الإنشاء:</span>
                <span className="text-gray-900">{dispute.createdDate}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">الإجراءات</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleResolveDispute('buyer')}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                حل لصالح المشتري
              </button>
              <button
                onClick={() => handleResolveDispute('seller')}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                حل لصالح البائع
              </button>
              <button
                onClick={() => alert('تم إرسال رسالة للطرفين')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                إرسال رسالة
              </button>
              <button
                onClick={() => {
                  if (confirm('هل تريد إغلاق النزاع؟')) {
                    alert('تم إغلاق النزاع')
                    router.push('/admin/disputes')
                  }
                }}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                إغلاق النزاع
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}