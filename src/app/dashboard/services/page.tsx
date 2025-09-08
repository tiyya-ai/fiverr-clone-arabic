'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Eye, Trash2, MoreVertical, Star, TrendingUp, DollarSign } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import { getUserById } from '@/data/mockData'
import { useServices } from '@/context/ServicesContext'
import Image from 'next/image';

export default function MyServicesPage() {
  const { services, deleteService, getServicesByUserId } = useServices()
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const currentUser = getUserById('1') // Current logged-in user
  const userServices = getServicesByUserId('1') // Get services for current user

  const handleDeleteService = (serviceId: string) => {
    deleteService(serviceId)
    setShowDeleteModal(null)
    alert('تم حذف الخدمة بنجاح')
  }

  const toggleServiceStatus = (serviceId: string) => {
    // Toggle between active/paused
    alert('تم تغيير حالة الخدمة')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" dir="rtl">خدماتي</h1>
            <p className="text-gray-600 mt-2" dir="rtl">إدارة وتتبع جميع خدماتك</p>
          </div>
          <Link
            href="/gigs/create"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            إضافة خدمة جديدة
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" dir="rtl">إجمالي الخدمات</p>
                <p className="text-2xl font-bold text-gray-900">{userServices.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" dir="rtl">الخدمات النشطة</p>
                <p className="text-2xl font-bold text-green-600">{userServices.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" dir="rtl">إجمالي المبيعات</p>
                <p className="text-2xl font-bold text-purple-600">{currentUser?.totalSales || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" dir="rtl">متوسط التقييم</p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold text-yellow-600">{currentUser?.rating || 0}</p>
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold" dir="rtl">قائمة الخدمات</h2>
          </div>

          {userServices.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {userServices.map((service) => (
                <div key={service.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Service Image */}
                    {/* Service Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={service.images[0]}
                        alt={service.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Service Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2" dir="rtl">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2" dir="rtl">
                            {service.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              {service.rating} ({service.totalReviews} تقييم)
                            </span>
                            <span>{service.totalSales} مبيعة</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor('active')}`}>
                              نشطة
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">يبدأ من</p>
                            <p className="text-lg font-bold text-green-600">
                              ${service.packages[0]?.price}
                            </p>
                          </div>

                          <div className="relative">
                            <button
                              onClick={() => setActiveDropdown(activeDropdown === service.id ? null : service.id)}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <MoreVertical className="h-5 w-5 text-gray-600" />
                            </button>

                            {activeDropdown === service.id && (
                              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                                <div className="py-2">
                                  <Link
                                    href={`/gigs/${service.id}`}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <Eye className="h-4 w-4" />
                                    معاينة
                                  </Link>
                                  <Link
                                    href={`/gigs/${service.id}/edit`}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <Edit className="h-4 w-4" />
                                    تعديل
                                  </Link>
                                  <button
                                    onClick={() => {
                                      toggleServiceStatus(service.id)
                                      setActiveDropdown(null)
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                                  >
                                    <TrendingUp className="h-4 w-4" />
                                    إيقاف مؤقت
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowDeleteModal(service.id)
                                      setActiveDropdown(null)
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-right"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    حذف
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد خدمات بعد</h3>
              <p className="text-gray-600 mb-6">ابدأ بإضافة خدمتك الأولى لتبدأ في كسب المال</p>
              <Link
                href="/gigs/create"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                إضافة خدمة جديدة
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4" dir="rtl">
              تأكيد الحذف
            </h3>
            <p className="text-gray-600 mb-6" dir="rtl">
              هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDeleteService(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setActiveDropdown(null)}
        />
      )}
      
      <Footer />
    </div>
  )
}