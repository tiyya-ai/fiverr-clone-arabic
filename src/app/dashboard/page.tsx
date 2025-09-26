'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Eye, 
  TrendingUp, 
  DollarSign, 
  Star, 
  MessageCircle, 
  ShoppingCart,
  Users,
  BarChart3,
  Calendar,
  Shield,
  User
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import ProtectedRoute from '@/components/ProtectedRoute'
import { getUserById } from '@/data/mockData'
import { useServices } from '@/context/ServicesContext'
import Image from 'next/image';

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userType, setUserType] = useState('')
  const { getServicesByUserId } = useServices()
  
  // Use session user ID instead of hardcoded '1'
  const userId = session?.user?.id || '1'
  const currentUser = getUserById(userId)
  const userServices = getServicesByUserId(userId)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/api/auth/signin')
      return
    }
    
    if (typeof window !== 'undefined') {
      const type = localStorage.getItem('userType') || 'seller'
      setUserType(type)
    }
  }, [session, status, router])

  const stats = {
    totalServices: userServices.length,
    activeServices: userServices.length,
    totalSales: currentUser?.totalSales || 0,
    avgRating: currentUser?.rating || 0,
    totalReviews: currentUser?.totalReviews || 0,
    unreadMessages: 2,
    pendingOrders: 3,
    monthlyEarnings: 1250
  }

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      message: 'طلب جديد على خدمة "تصميم شعار احترافي"',
      time: 'منذ 30 دقيقة',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'message',
      message: 'رسالة جديدة من أحمد محمد',
      time: 'منذ ساعة',
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'review',
      message: 'تقييم جديد 5 نجوم على خدمتك',
      time: 'منذ 3 ساعات',
      icon: Star,
      color: 'text-yellow-600'
    }
  ]

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <MainHeader />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">
              مرحباً، {session?.user?.name || currentUser?.fullName}!
            </h1>
            <p className="text-gray-600" dir="rtl">
              إليك نظرة عامة على أداء حسابك اليوم
            </p>
          </div>

        {/* Quick Actions - Fiverr Style */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4" dir="rtl">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Link
              href="/services/create"
              className="flex flex-col items-center p-3 sm:p-4 border-2 border-dashed border-[#1ab7ea] rounded-lg hover:bg-[#1ab7ea]/5 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#1ab7ea]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#1ab7ea]/20">
                <Plus className="h-6 w-6 text-[#1ab7ea]" />
              </div>
              <span className="text-sm font-medium text-gray-900" dir="rtl">إضافة خدمة</span>
            </Link>

            <Link
              href="/verification"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900" dir="rtl">تحقق من الحساب</span>
              <span className="text-xs text-gray-500">زيادة الثقة</span>
            </Link>

            <Link
              href="/dashboard/profile"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900" dir="rtl">إدارة الملف</span>
              <span className="text-xs text-gray-500">تحديث المعلومات</span>
            </Link>

            <Link
              href="/dashboard/services"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900" dir="rtl">إدارة الخدمات</span>
              <span className="text-xs text-gray-500">{stats.totalServices} خدمة</span>
            </Link>

            <Link
              href="/messages"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <MessageCircle className="h-6 w-6 text-purple-600" />
                {stats.unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {stats.unreadMessages}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900" dir="rtl">الرسائل</span>
              <span className="text-xs text-gray-500">{stats.unreadMessages} جديدة</span>
            </Link>

            <Link
              href="/orders"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
                {stats.pendingOrders > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {stats.pendingOrders}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900" dir="rtl">الطلبات</span>
              <span className="text-xs text-gray-500">{stats.pendingOrders} معلق</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid - Fiverr Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600" dir="rtl">الأرباح هذا الشهر</span>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.monthlyEarnings} ر.س</div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% من الشهر الماضي
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600" dir="rtl">إجمالي الطلبات</span>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalSales}</div>
            <div className="text-xs text-blue-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8% من الشهر الماضي
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600" dir="rtl">متوسط التقييم</span>
              <Star className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-gray-900">{stats.avgRating}</span>
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
            </div>
            <div className="text-xs text-gray-500">{stats.totalReviews} تقييم</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600" dir="rtl">الخدمات النشطة</span>
              <Eye className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.activeServices}</div>
            <div className="text-xs text-gray-500">من أصل {stats.totalServices} خدمة</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold" dir="rtl">النشاطات الأخيرة</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={activity.id} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900" dir="rtl">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6">
                <Link
                  href="/notifications"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  عرض جميع النشاطات →
                </Link>
              </div>
            </div>
          </div>

          {/* Top Services */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold" dir="rtl">أفضل الخدمات أداءً</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {userServices.slice(0, 3).map((service, index) => (
                  <div key={service.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={service.images[0]}
                        alt={service.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate" dir="rtl">
                        {service.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          {service.rating}
                        </span>
                        <span>•</span>
                        <span>{service.totalSales} مبيعة</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">
                        {service.packages[0]?.price} ر.س
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/dashboard/services"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  عرض جميع الخدمات →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" dir="rtl">
            💡 نصائح لزيادة مبيعاتك
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <p dir="rtl">أضف صور عالية الجودة لخدماتك</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <p dir="rtl">رد على الرسائل بسرعة</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <p dir="rtl">حدث أوصاف خدماتك بانتظام</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <p dir="rtl">قدم خدمة عملاء ممتازة</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
    </ProtectedRoute>
  )
}