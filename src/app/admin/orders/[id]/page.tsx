'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowRight, User, Package, DollarSign, Clock, CheckCircle, XCircle, AlertTriangle, MessageSquare, Eye, Calendar, Star } from 'lucide-react'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'
import Image from 'next/image';

export default function AdminOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getServiceById } = useServices()
  const [order, setOrder] = useState<any>(null)
  const [service, setService] = useState<any>(null)
  const [buyer, setBuyer] = useState<any>(null)
  const [seller, setSeller] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
      return
    }

    // Mock order data - in real app, fetch from API
    const mockOrder = {
      id: params.id,
      serviceId: '1',
      buyerId: '2',
      sellerId: '1',
      amount: 150,
      status: 'active',
      createdAt: '2024-02-20',
      deliveryDate: '2024-02-27',
      package: 'BASIC',
      requirements: 'أحتاج تصميم شعار لشركتي الجديدة. الألوان المفضلة: أزرق وأبيض. النشاط: تقنية المعلومات.',
      notes: 'العميل طلب 3 تعديلات إضافية',
      timeline: [
        { date: '2024-02-20', action: 'تم إنشاء الطلب', status: 'completed' },
        { date: '2024-02-21', action: 'تم قبول الطلب من البائع', status: 'completed' },
        { date: '2024-02-22', action: 'بدء العمل', status: 'completed' },
        { date: '2024-02-25', action: 'تسليم النسخة الأولى', status: 'pending' },
        { date: '2024-02-27', action: 'التسليم النهائي', status: 'pending' }
      ]
    }

    setOrder(mockOrder)
    
    const serviceData = getServiceById(mockOrder.serviceId)
    if (serviceData) {
      setService(serviceData)
    }
    
    const buyerData = getUserById(mockOrder.buyerId)
    const sellerData = getUserById(mockOrder.sellerId)
    setBuyer(buyerData)
    setSeller(sellerData)
    
    setLoading(false)
  }, [params.id, getServiceById, router])

  const handleCancelOrder = () => {
    if (confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) {
      alert('تم إلغاء الطلب')
    }
  }

  const handleRefund = () => {
    if (confirm('هل تريد استرداد المبلغ للعميل؟')) {
      alert('تم استرداد المبلغ')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'disputed': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط'
      case 'completed': return 'مكتمل'
      case 'cancelled': return 'ملغي'
      case 'disputed': return 'متنازع عليه'
      default: return 'غير معروف'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">الطلب غير موجود</h1>
          <button 
            onClick={() => router.push('/admin/orders')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            العودة إلى الطلبات
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/orders')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الطلبات
          </button>
          <h1 className="text-2xl font-bold text-gray-900">تفاصيل الطلب #{order.id}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open(`/orders/${order.id}`, '_blank')}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <Eye className="h-4 w-4" />
            عرض في الموقع
          </button>
          <button
            onClick={() => router.push(`/messages?order=${order.id}`)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <MessageSquare className="h-4 w-4" />
            المراسلة
          </button>
          <button
            onClick={handleRefund}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <DollarSign className="h-4 w-4" />
            استرداد
          </button>
          <button
            onClick={handleCancelOrder}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <XCircle className="h-4 w-4" />
            إلغاء
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">نظرة عامة على الطلب</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">${order.amount}</p>
                <p className="text-sm text-gray-600">قيمة الطلب</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">7</p>
                <p className="text-sm text-gray-600">أيام متبقية</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{order.package}</p>
                <p className="text-sm text-gray-600">نوع الباقة</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
                <p className="text-sm text-gray-600 mt-1">حالة الطلب</p>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">تفاصيل الخدمة</h3>
            {service && (
              <div className="flex gap-4">
                <Image
                  src={service.images?.[0]}
                  alt={service.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{service.category}</p>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{service.rating}</span>
                    <span className="text-sm text-gray-500">({service.totalReviews} تقييم)</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/admin/services/${service.id}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  عرض الخدمة
                </button>
              </div>
            )}
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">متطلبات العميل</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">{order.requirements}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">مراحل الطلب</h3>
            <div className="space-y-4">
              {order.timeline?.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-100 text-green-600' : 
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : item.status === 'pending' ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">ملاحظات إدارية</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-900">{order.notes}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Buyer Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">معلومات المشتري</h3>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={buyer?.avatar}
                alt={buyer?.fullName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{buyer?.fullName}</p>
                <p className="text-sm text-gray-600">@{buyer?.username}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">عضو منذ:</span>
                <span>{buyer?.memberSince}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الطلبات:</span>
                <span>{buyer?.totalOrders || 5}</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/profile/${buyer?.username}`)}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              عرض ملف المشتري
            </button>
          </div>

          {/* Seller Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">معلومات البائع</h3>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={seller?.avatar}
                alt={seller?.fullName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{seller?.fullName}</p>
                <p className="text-sm text-gray-600">@{seller?.username}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">التقييم:</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span>{seller?.rating}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المبيعات:</span>
                <span>{seller?.totalSales}</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/profile/${seller?.username}`)}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              عرض ملف البائع
            </button>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">معلومات الطلب</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">تاريخ الإنشاء:</span>
                <span className="font-semibold">{order.createdAt}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">تاريخ التسليم:</span>
                <span className="font-semibold">{order.deliveryDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">المبلغ:</span>
                <span className="font-semibold text-green-600">${order.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">العمولة (20%):</span>
                <span className="font-semibold">${(order.amount * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">صافي البائع:</span>
                <span className="font-semibold">${(order.amount * 0.8).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}