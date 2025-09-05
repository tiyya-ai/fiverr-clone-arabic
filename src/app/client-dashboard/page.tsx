'use client'

import { useState, useEffect } from 'react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import { ShoppingCart, Heart, MessageCircle, Star, Clock, CreditCard } from 'lucide-react'

export default function ClientDashboard() {
  const [orders, setOrders] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
    const userFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setOrders(userOrders)
    setFavorites(userFavorites)
  }, [])

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter(o => o.status === 'active').length,
    totalSpent: orders.reduce((sum, order) => sum + (order.amount || 0), 0),
    favoriteServices: favorites.length,
    unreadMessages: 2
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">
            مرحباً بك في لوحة العميل!
          </h1>
          <p className="text-gray-600" dir="rtl">
            إدارة طلباتك والخدمات المفضلة لديك
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4" dir="rtl">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/services" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900" dir="rtl">تصفح الخدمات</span>
            </a>

            <a href="/orders" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900" dir="rtl">طلباتي</span>
              <span className="text-xs text-gray-500">{stats.totalOrders} طلب</span>
            </a>

            <a href="/messages" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors relative">
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
            </a>

            <a href="/favorites" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-900" dir="rtl">المفضلة</span>
              <span className="text-xs text-gray-500">{stats.favoriteServices} خدمة</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600" dir="rtl">إجمالي الطلبات</span>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
            <div className="text-xs text-gray-500">جميع طلباتك</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600" dir="rtl">الطلبات النشطة</span>
              <Clock className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.activeOrders}</div>
            <div className="text-xs text-gray-500">قيد التنفيذ</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600" dir="rtl">إجمالي المدفوع</span>
              <CreditCard className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalSpent} ر.س</div>
            <div className="text-xs text-gray-500">المبلغ الإجمالي</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600" dir="rtl">الخدمات المفضلة</span>
              <Heart className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.favoriteServices}</div>
            <div className="text-xs text-gray-500">في قائمة المفضلة</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4" dir="rtl">ابدأ رحلتك</h2>
          <div className="text-center py-8">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">مرحباً بك كعميل جديد!</h3>
            <p className="text-gray-600 mb-4">ابدأ بتصفح الخدمات واطلب ما تحتاجه</p>
            <a href="/services" className="inline-flex items-center gap-2 bg-[#1ab7ea] text-white px-6 py-3 rounded-lg hover:bg-[#0ea5d9]">
              تصفح الخدمات
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}