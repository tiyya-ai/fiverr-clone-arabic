'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle, Eye, MessageCircle } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

interface Order {
  id: string
  serviceTitle: string
  clientName: string
  amount: number
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  deadline: string
  description: string
}

const mockOrders: Order[] = [
  {
    id: '1',
    serviceTitle: 'تصميم شعار احترافي لشركتك',
    clientName: 'محمد أحمد',
    amount: 50,
    status: 'in_progress',
    createdAt: '2024-02-20',
    deadline: '2024-02-25',
    description: 'أحتاج تصميم شعار لشركة تقنية جديدة مع الألوان الزرقاء'
  },
  {
    id: '2',
    serviceTitle: 'تطوير موقع إلكتروني متجاوب',
    clientName: 'فاطمة علي',
    amount: 300,
    status: 'pending',
    createdAt: '2024-02-21',
    deadline: '2024-03-07',
    description: 'موقع لعرض الخدمات مع نظام حجز'
  },
  {
    id: '3',
    serviceTitle: 'تصميم واجهة مستخدم احترافية',
    clientName: 'سارة محمد',
    amount: 150,
    status: 'completed',
    createdAt: '2024-02-15',
    deadline: '2024-02-22',
    description: 'تصميم واجهة لتطبيق جوال'
  }
]

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders)
  const [activeTab, setActiveTab] = useState('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatDate = (dateString: string) => {
    if (!mounted) return dateString // Return original string during SSR
    return new Date(dateString).toLocaleDateString('ar-SA')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار'
      case 'in_progress': return 'قيد التنفيذ'
      case 'completed': return 'مكتمل'
      case 'cancelled': return 'ملغي'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'in_progress': return <Clock className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab)

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">طلباتي</h1>
          <p className="text-gray-600" dir="rtl">إدارة ومتابعة جميع طلباتك</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" dir="rtl">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" dir="rtl">قيد التنفيذ</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === 'in_progress').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" dir="rtl">مكتملة</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" dir="rtl">إجمالي الأرباح</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${orders.reduce((sum, order) => sum + order.amount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'all', label: 'جميع الطلبات', count: orders.length },
                { id: 'pending', label: 'في الانتظار', count: orders.filter(o => o.status === 'pending').length },
                { id: 'in_progress', label: 'قيد التنفيذ', count: orders.filter(o => o.status === 'in_progress').length },
                { id: 'completed', label: 'مكتملة', count: orders.filter(o => o.status === 'completed').length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900" dir="rtl">
                          {order.serviceTitle}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3" dir="rtl">
                        العميل: {order.clientName}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-4" dir="rtl">
                        {order.description}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>تاريخ الطلب: {formatDate(order.createdAt)}</span>
                        <span>الموعد النهائي: {formatDate(order.deadline)}</span>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className="text-2xl font-bold text-green-600 mb-4">
                        ${order.amount}
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
                          <Eye className="h-4 w-4" />
                          عرض
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 text-sm border border-green-600 text-green-600 rounded-md hover:bg-green-50">
                          <MessageCircle className="h-4 w-4" />
                          رسالة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات</h3>
                <p className="text-gray-600">لا توجد طلبات في هذا التصنيف حالياً</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}