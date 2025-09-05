'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Search, Eye, MessageSquare, ArrowLeft, DollarSign, Clock, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useServices } from '@/context/ServicesContext'
import { mockUsers } from '@/data/mockData'

export default function AdminOrdersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  const { services: realServices } = useServices()

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
    }
  }, [router])

  // Create mock orders data
  const orders = [
    {
      id: '1',
      serviceId: '1',
      buyerId: '2',
      sellerId: '1',
      amount: 150,
      status: 'active',
      createdAt: '2024-02-20'
    },
    {
      id: '2',
      serviceId: '2',
      buyerId: '3',
      sellerId: '1',
      amount: 500,
      status: 'completed',
      createdAt: '2024-02-18'
    },
    {
      id: '3',
      serviceId: '3',
      buyerId: '4',
      sellerId: '2',
      amount: 75,
      status: 'cancelled',
      createdAt: '2024-02-15'
    },
    {
      id: '4',
      serviceId: '1',
      buyerId: '5',
      sellerId: '1',
      amount: 200,
      status: 'in_progress',
      createdAt: '2024-02-22'
    },
    {
      id: '5',
      serviceId: '4',
      buyerId: '2',
      sellerId: '3',
      amount: 300,
      status: 'completed',
      createdAt: '2024-02-19'
    }
  ].map(order => {
    const service = realServices?.find(s => s.id === order.serviceId)
    const buyer = mockUsers?.find(u => u.id === order.buyerId)
    const seller = mockUsers?.find(u => u.id === order.sellerId)

    const statusMap = {
      'pending': 'قيد الانتظار',
      'active': 'قيد التنفيذ',
      'in_progress': 'قيد التنفيذ',
      'completed': 'مكتمل',
      'cancelled': 'ملغي',
      'disputed': 'متنازع عليه'
    }

    return {
      id: order.id,
      service: service?.title || 'خدمة محذوفة',
      buyer: buyer?.fullName || 'غير معروف',
      seller: seller?.fullName || 'غير معروف',
      amount: order.amount,
      status: statusMap[order.status as keyof typeof statusMap] || order.status,
      originalStatus: order.status,
      date: order.createdAt
    }
  })

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`)
  }

  const handleContactSupport = (orderId: string) => {
    router.push(`/admin/orders/${orderId}/support`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'قيد التنفيذ':
        return <Clock className="h-5 w-5 text-blue-500" />
      case 'متنازع عليه':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return 'bg-green-100 text-green-800'
      case 'قيد التنفيذ':
        return 'bg-blue-100 text-blue-800'
      case 'ملغي':
        return 'bg-red-100 text-red-800'
      case 'متنازع عليه':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في الطلبات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الطلبات</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="مكتمل">مكتمل</option>
              <option value="ملغي">ملغي</option>
              <option value="متنازع عليه">متنازع عليه</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">إجمالي الطلبات</p>
                <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">قيد التنفيذ</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {orders.filter(o => o.originalStatus === 'active' || o.originalStatus === 'in_progress').length}
                </p>
              </div>
              <Clock className="h-12 w-12 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">مكتملة</p>
                <p className="text-3xl font-bold text-green-600">
                  {orders.filter(o => o.originalStatus === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">إجمالي القيمة</p>
                <p className="text-3xl font-bold text-purple-600">
                  ${orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشتري</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{order.service}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.buyer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.seller}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">${order.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewOrder(order.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="عرض التفاصيل"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleContactSupport(order.id)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="الدعم الفني"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
            <p className="text-gray-500">لم يتم العثور على طلبات تطابق معايير البحث</p>
          </div>
        )}
      </div>
  )
}