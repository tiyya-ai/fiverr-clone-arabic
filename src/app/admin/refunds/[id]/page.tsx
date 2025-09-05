'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, DollarSign, Calendar, User, Package, MessageSquare, CheckCircle, XCircle, AlertTriangle, FileText, Clock, Eye } from 'lucide-react'

interface RefundDetails {
  id: string
  orderId: string
  service: {
    title: string
    category: string
    price: number
    deliveryTime: string
  }
  buyer: {
    name: string
    email: string
    phone: string
    joinDate: string
  }
  seller: {
    name: string
    email: string
    phone: string
    rating: number
  }
  amount: number
  reason: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  requestDate: string
  processedDate: string | null
  processedBy: string | null
  attachments: string[]
  timeline: {
    date: string
    action: string
    description: string
    user: string
  }[]
  communication: {
    date: string
    from: string
    message: string
    type: 'buyer' | 'seller' | 'admin'
  }[]
}

export default function RefundDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const refundId = params.id as string
  const [refund, setRefund] = useState<RefundDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('details')

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
      return
    }

    // Mock data for REF001
    const mockRefundDetails: RefundDetails = {
      id: refundId,
      orderId: 'ORD123',
      service: {
        title: 'تصميم شعار احترافي للشركة',
        category: 'التصميم الجرافيكي',
        price: 150,
        deliveryTime: '3 أيام'
      },
      buyer: {
        name: 'أحمد محمد علي',
        email: 'ahmed.mohamed@example.com',
        phone: '+966501234567',
        joinDate: '2023-05-15'
      },
      seller: {
        name: 'فاطمة علي حسن',
        email: 'fatima.ali@example.com',
        phone: '+966509876543',
        rating: 4.7
      },
      amount: 150,
      reason: 'عدم مطابقة المواصفات',
      description: 'الشعار المسلم لا يتطابق مع المواصفات المطلوبة. تم طلب شعار عصري وبسيط باللونين الأزرق والأخضر، لكن التصميم المسلم كان معقداً ويحتوي على ألوان مختلفة تماماً. كما أن الخط المستخدم لا يناسب طبيعة الشركة التقنية.',
      status: 'pending',
      requestDate: '2024-02-20T10:30:00Z',
      processedDate: null,
      processedBy: null,
      attachments: [
        'original-requirements.pdf',
        'delivered-logo.png',
        'comparison-image.jpg'
      ],
      timeline: [
        {
          date: '2024-02-15T09:00:00Z',
          action: 'تم إنشاء الطلب',
          description: 'تم إنشاء طلب تصميم الشعار',
          user: 'أحمد محمد علي'
        },
        {
          date: '2024-02-18T14:30:00Z',
          action: 'تم تسليم العمل',
          description: 'تم تسليم التصميم النهائي للشعار',
          user: 'فاطمة علي حسن'
        },
        {
          date: '2024-02-19T11:15:00Z',
          action: 'طلب مراجعة',
          description: 'طلب المشتري مراجعة التصميم',
          user: 'أحمد محمد علي'
        },
        {
          date: '2024-02-20T10:30:00Z',
          action: 'طلب استرداد',
          description: 'ت�� تقديم طلب استرداد المبلغ',
          user: 'أحمد محمد علي'
        }
      ],
      communication: [
        {
          date: '2024-02-19T11:20:00Z',
          from: 'أحمد محمد علي',
          message: 'مرحباً، التصميم المسلم لا يتطابق مع المواصفات المطلوبة. هل يمكن إعادة التصميم؟',
          type: 'buyer'
        },
        {
          date: '2024-02-19T15:45:00Z',
          from: 'فاطمة علي حسن',
          message: 'مرحباً، أعتذر عن عدم الوضوح. يمكنني تعديل التصميم حسب متطلباتك. هل يمكنك توضيح النقاط المحددة؟',
          type: 'seller'
        },
        {
          date: '2024-02-20T09:00:00Z',
          from: 'أحمد محمد علي',
          message: 'شكراً لك، لكن الوقت ضيق جداً وأحتاج الشعار بشكل عاجل. أفضل استرداد المبلغ والبحث عن مصمم آخر.',
          type: 'buyer'
        }
      ]
    }

    setRefund(mockRefundDetails)
    setLoading(false)
  }, [router, refundId])

  const handleRefundAction = (action: 'approve' | 'reject') => {
    const actionText = action === 'approve' ? 'قبول' : 'رفض'
    const confirmMessage = action === 'approve' 
      ? `هل تريد قبول طلب الاسترداد ${refundId}؟ سيتم إرجاع مبلغ $${refund?.amount} إلى المشتري.`
      : `هل تريد رفض طلب الاسترداد ${refundId}؟`

    if (confirm(confirmMessage)) {
      // Update refund status
      if (refund) {
        const updatedRefund = {
          ...refund,
          status: action === 'approve' ? 'approved' as const : 'rejected' as const,
          processedDate: new Date().toISOString(),
          processedBy: 'مدير النظام'
        }
        setRefund(updatedRefund)
      }
      
      alert(`تم ${actionText} طلب الاسترداد بنجاح`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد المراجعة'
      case 'approved': return 'مقبول'
      case 'rejected': return 'مرفوض'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'rejected': return <XCircle className="h-5 w-5 text-red-600" />
      default: return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!refund) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">طلب الاسترداد غير موجود</h2>
        <p className="text-gray-600 mb-6">لم يتم العثور على طلب الاسترداد المطلوب</p>
        <button
          onClick={() => router.push('/admin/refunds')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          العودة إلى قائمة الاستردادات
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/refunds')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">تفاصيل طلب الاسترداد {refund.id}</h1>
            <p className="text-gray-600">طلب رقم: {refund.orderId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusIcon(refund.status)}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(refund.status)}`}>
            {getStatusText(refund.status)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Refund Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص طلب الاسترداد</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">مبلغ الاسترداد</label>
                <p className="text-2xl font-bold text-green-600">${refund.amount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الطلب</label>
                <p className="text-gray-900">{formatDate(refund.requestDate)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">سبب الاسترداد</label>
                <p className="text-gray-900">{refund.reason}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">حالة الطلب</label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(refund.status)}`}>
                  {getStatusText(refund.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الخدمة</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الخدمة</label>
                <p className="text-gray-900 font-medium">{refund.service.title}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
                  <p className="text-gray-900">{refund.service.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">السعر</label>
                  <p className="text-gray-900 font-bold">${refund.service.price}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مدة التسليم</label>
                  <p className="text-gray-900">{refund.service.deliveryTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل طلب الاسترداد</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{refund.description}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'timeline'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  الجدول الزمني
                </button>
                <button
                  onClick={() => setActiveTab('communication')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'communication'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  المحادثات
                </button>
                <button
                  onClick={() => setActiveTab('attachments')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'attachments'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  المرفقات
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  {refund.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{event.action}</h4>
                          <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                        <p className="text-gray-500 text-xs mt-1">بواسطة: {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'communication' && (
                <div className="space-y-4">
                  {refund.communication.map((message, index) => (
                    <div key={index} className={`p-4 rounded-lg ${
                      message.type === 'buyer' ? 'bg-blue-50 border-l-4 border-blue-500' :
                      message.type === 'seller' ? 'bg-green-50 border-l-4 border-green-500' :
                      'bg-gray-50 border-l-4 border-gray-500'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{message.from}</span>
                        <span className="text-sm text-gray-500">{formatDate(message.date)}</span>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'attachments' && (
                <div className="space-y-3">
                  {refund.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900">{attachment}</span>
                      </div>
                      <button
                        onClick={() => alert(`تحميل الملف: ${attachment}`)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        عرض
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Buyer Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات المشتري</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{refund.buyer.name}</p>
                  <p className="text-sm text-gray-500">{refund.buyer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">{refund.buyer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">عضو منذ {refund.buyer.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات البائع</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{refund.seller.name}</p>
                  <p className="text-sm text-gray-500">{refund.seller.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">{refund.seller.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">تقييم: {refund.seller.rating}/5</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {refund.status === 'pending' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات الطلب</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleRefundAction('approve')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  قبول الطلب
                </button>
                <button
                  onClick={() => handleRefundAction('reject')}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  رفض الطلب
                </button>
                <button
                  onClick={() => alert('فتح محادثة مع الأطراف المعنية')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  فتح محادثة
                </button>
              </div>
            </div>
          )}

          {/* Processing Info */}
          {refund.status !== 'pending' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات المعالجة</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ المعالجة</label>
                  <p className="text-gray-900">{refund.processedDate ? formatDate(refund.processedDate) : 'غير محدد'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تمت المعالجة بواسطة</label>
                  <p className="text-gray-900">{refund.processedBy || 'غير محدد'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}