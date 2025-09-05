'use client'

import { useState, useEffect } from 'react'
import { User, Package, DollarSign, Star, Plus, MessageCircle, ShoppingCart, TrendingUp, Calendar, Award } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import UnifiedButton from '@/components/UnifiedButton'

export default function UserDashboard() {
  const [userType, setUserType] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const type = localStorage.getItem('userType') || 'user'
      setUserType(type)
      setUserName(type === 'admin' ? 'المدير' : type === 'seller' ? 'مقدم الخدمة' : 'العميل')
    }
  }, [])

  const stats = [
    { 
      title: 'الطلبات النشطة', 
      value: '12', 
      icon: Package, 
      color: '#1ab7ea',
      change: '+3 هذا الأسبوع'
    },
    { 
      title: 'إجمالي الأرباح', 
      value: '2,450 ريال', 
      icon: DollarSign, 
      color: '#10b981',
      change: '+15% هذا الشهر'
    },
    { 
      title: 'الخدمات النشطة', 
      value: '8', 
      icon: Star, 
      color: '#f59e0b',
      change: '+2 خدمة جديدة'
    },
    { 
      title: 'التقييمات', 
      value: '4.9', 
      icon: Award, 
      color: '#8b5cf6',
      change: '45 تقييم إيجابي'
    }
  ]

  const recentOrders = [
    { 
      id: '1', 
      title: 'تصميم شعار احترافي', 
      client: 'أحمد محمد', 
      amount: '150 ريال', 
      status: 'قيد التنفيذ',
      date: '2024-01-15'
    },
    { 
      id: '2', 
      title: 'تطوير موقع إلكتروني', 
      client: 'فاطمة أحمد', 
      amount: '800 ريال', 
      status: 'مكتمل',
      date: '2024-01-14'
    },
    { 
      id: '3', 
      title: 'كتابة محتوى تسويقي', 
      client: 'محمد علي', 
      amount: '200 ريال', 
      status: 'في الانتظار',
      date: '2024-01-13'
    }
  ]

  const quickActions = [
    { 
      title: 'إنشاء خدمة جديدة', 
      icon: Plus, 
      link: '/services/create', 
      color: '#1ab7ea',
      description: 'أضف خدمة جديدة لعرضها'
    },
    { 
      title: 'عرض الطلبات', 
      icon: Package, 
      link: '/orders', 
      color: '#10b981',
      description: 'إدارة طلباتك الحالية'
    },
    { 
      title: 'الرسائل', 
      icon: MessageCircle, 
      link: '/messages', 
      color: '#f59e0b',
      description: 'تواصل مع العملاء'
    },
    { 
      title: 'خدماتي', 
      icon: Star, 
      link: '/dashboard/services', 
      color: '#8b5cf6',
      description: 'إدارة خدماتك المنشورة'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800'
      case 'قيد التنفيذ': return 'bg-blue-100 text-blue-800'
      case 'في الانتظار': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="text-right" dir="rtl">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                مرحباً بك، {userName}!
              </h1>
              <p className="text-gray-600">
                إليك ملخص نشاطك اليوم على المنصة
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1ab7ea] to-[#0ea5d9] rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="text-right" dir="rtl">
                <div className="text-sm text-gray-500">عضو منذ</div>
                <div className="font-semibold">يناير 2024</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <IconComponent 
                      className="h-6 w-6" 
                      style={{ color: stat.color }}
                    />
                  </div>
                </div>
                <div className="text-right" dir="rtl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900" dir="rtl">
                  الطلبات الأخيرة
                </h2>
                <UnifiedButton 
                  variant="ghost" 
                  size="small"
                  href="/orders"
                >
                  عرض الكل
                </UnifiedButton>
              </div>
              
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1ab7ea] transition-colors">
                    <div className="flex-1 text-right" dir="rtl">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {order.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        العميل: {order.client}
                      </p>
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-sm text-gray-500">{order.date}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-left ml-4">
                      <span className="font-bold text-lg text-[#1ab7ea]">
                        {order.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6" dir="rtl">
                نظرة عامة على الأداء
              </h2>
              <div className="h-64 flex items-end justify-center gap-4 bg-gray-50 rounded-lg p-4">
                {[60, 80, 45, 90, 70].map((height, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-gradient-to-t from-[#1ab7ea] to-[#0ea5d9] rounded-t-md"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'][index]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-4">
                الأرباح خلال الأشهر الخمسة الماضية
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6" dir="rtl">
                إجراءات سريعة
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon
                  return (
                    <a
                      key={index}
                      href={action.link}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#1ab7ea] hover:bg-gray-50 transition-all group"
                      dir="rtl"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${action.color}20` }}
                      >
                        <IconComponent 
                          className="h-5 w-5" 
                          style={{ color: action.color }}
                        />
                      </div>
                      <div className="flex-1 text-right">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {action.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Tips & Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6" dir="rtl">
                نصائح وإرشادات
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3" dir="rtl">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">💡</span>
                  </div>
                  <div className="text-right">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      حسّن خدماتك
                    </h4>
                    <p className="text-xs text-gray-600">
                      أضف كلمات مفتاحية أكثر لتحسين الظهور
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3" dir="rtl">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📈</span>
                  </div>
                  <div className="text-right">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      زيادة المبيعات
                    </h4>
                    <p className="text-xs text-gray-600">
                      رد على الرسائل خلال ساعة واحدة
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}