'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowRight, Star, User, Clock, Package, DollarSign, CheckCircle, XCircle, Edit, Trash2, Eye } from 'lucide-react'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'

export default function AdminServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getServiceById } = useServices()
  const [service, setService] = useState<any>(null)
  const [seller, setSeller] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
      return
    }

    const serviceData = getServiceById(params.id as string)
    if (serviceData) {
      setService(serviceData)
      const sellerData = getUserById(serviceData.userId)
      setSeller(sellerData)
    }
    setLoading(false)
  }, [params.id, getServiceById, router])

  const handleApprove = () => {
    alert('تم قبول الخدمة بنجاح')
  }

  const handleReject = () => {
    if (confirm('هل أنت متأكد من رفض هذه الخدمة؟')) {
      alert('تم رفض الخدمة')
    }
  }

  const handleDelete = () => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      alert('تم حذف الخدمة')
      router.push('/admin/services')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">الخدمة غير موجودة</h1>
          <button 
            onClick={() => router.push('/admin/services')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            العودة إلى الخدمات
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
            onClick={() => router.push('/admin/services')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الخدمات
          </button>
          <h1 className="text-2xl font-bold text-gray-900">تفاصيل الخدمة</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open(`/services/${service.id}`, '_blank')}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <Eye className="h-4 w-4" />
            عرض في الموقع
          </button>
          <button
            onClick={handleApprove}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4" />
            قبول
          </button>
          <button
            onClick={handleReject}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <XCircle className="h-4 w-4" />
            رفض
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            حذف
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">صور الخدمة</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {service.images?.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`صورة ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">تفاصيل الخدمة</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                <p className="text-gray-900">{service.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <p className="text-gray-900 whitespace-pre-wrap">{service.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {service.category}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">التقييم</label>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{service.rating}</span>
                    <span className="text-gray-500">({service.totalReviews} تقييم)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المبيعات</label>
                  <p className="text-gray-900">{service.totalSales} مبيعة</p>
                </div>
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">الباقات</h3>
            <div className="space-y-4">
              {service.packages?.map((pkg: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{pkg.title}</h4>
                    <span className="text-xl font-bold text-green-600">${pkg.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {pkg.deliveryTime} أيام
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {pkg.revisions} مراجعة
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">المميزات:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.features?.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Seller Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">معلومات البائع</h3>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={seller?.avatar}
                alt={seller?.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{seller?.fullName}</p>
                <p className="text-sm text-gray-600">@{seller?.username}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">عضو منذ:</span>
                <span>{seller?.memberSince}</span>
              </div>
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

          {/* Service Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">إحصائيات الخدمة</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">المشاهدات:</span>
                <span className="font-semibold">{Math.floor(Math.random() * 5000) + 100}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">الطلبات:</span>
                <span className="font-semibold">{service.totalSales}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">تاريخ الإنشاء:</span>
                <span className="font-semibold">{new Date().toLocaleDateString('ar-SA')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">الحالة:</span>
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  مقبول
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}