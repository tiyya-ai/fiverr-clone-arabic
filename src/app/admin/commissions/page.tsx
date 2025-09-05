'use client'

import { useState } from 'react'
import { Search, TrendingUp, DollarSign, Percent, Calendar, BarChart3, PieChart } from 'lucide-react'

export default function CommissionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const commissionsData = [
    {
      id: 'COM001',
      orderId: 'ORD123',
      service: 'تصميم شعار احترافي',
      seller: 'محمد حسن',
      buyer: 'أحمد علي',
      orderAmount: 150,
      commissionRate: 10,
      commissionAmount: 15,
      date: '2024-02-20',
      status: 'collected'
    },
    {
      id: 'COM002',
      orderId: 'ORD124',
      service: 'تطوير موقع إلكتروني',
      seller: 'فاطمة علي',
      buyer: 'سارة أحمد',
      orderAmount: 800,
      commissionRate: 10,
      commissionAmount: 80,
      date: '2024-02-18',
      status: 'collected'
    },
    {
      id: 'COM003',
      orderId: 'ORD125',
      service: 'كتابة محتوى تسويقي',
      seller: 'أحمد سالم',
      buyer: 'نور فاطمة',
      orderAmount: 75,
      commissionRate: 10,
      commissionAmount: 7.5,
      date: '2024-02-15',
      status: 'pending'
    },
    {
      id: 'COM004',
      orderId: 'ORD126',
      service: 'تصميم موقع ويب',
      seller: 'علي محمود',
      buyer: 'ليلى حسن',
      orderAmount: 500,
      commissionRate: 10,
      commissionAmount: 50,
      date: '2024-02-22',
      status: 'collected'
    },
    {
      id: 'COM005',
      orderId: 'ORD127',
      service: 'ترجمة نصوص',
      seller: 'نور عبدالله',
      buyer: 'محمد سالم',
      orderAmount: 120,
      commissionRate: 10,
      commissionAmount: 12,
      date: '2024-02-19',
      status: 'collected'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'collected': return 'bg-green-100 text-green-800'
      case 'refunded': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار'
      case 'collected': return 'تم التحصيل'
      case 'refunded': return 'مسترد'
      default: return status
    }
  }

  const filteredCommissions = commissionsData.filter(commission => {
    const matchesSearch = commission.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesDate = true
    if (dateFilter !== 'all') {
      const commissionDate = new Date(commission.date)
      const now = new Date()
      
      switch (dateFilter) {
        case 'today':
          matchesDate = commissionDate.toDateString() === now.toDateString()
          break
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesDate = commissionDate >= weekAgo
          break
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          matchesDate = commissionDate >= monthAgo
          break
      }
    }
    
    return matchesSearch && matchesDate
  })

  const totalPages = Math.ceil(filteredCommissions.length / itemsPerPage)
  const paginatedCommissions = filteredCommissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Calculate statistics
  const totalCommissions = commissionsData.reduce((sum, c) => sum + c.commissionAmount, 0)
  const collectedCommissions = commissionsData
    .filter(c => c.status === 'collected')
    .reduce((sum, c) => sum + c.commissionAmount, 0)
  const pendingCommissions = commissionsData
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.commissionAmount, 0)
  const totalOrders = commissionsData.length
  const averageCommission = totalCommissions / totalOrders

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">العمولات</h1>
          <p className="text-gray-600 mt-2">تتبع وإدارة عمولات المنصة</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي العمولات</p>
              <p className="text-2xl font-bold text-green-600">${totalCommissions.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">تم التحصيل</p>
              <p className="text-2xl font-bold text-blue-600">${collectedCommissions.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">${pendingCommissions.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Percent className="h-6 w-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">متوسط العمولة</p>
              <p className="text-2xl font-bold text-purple-600">${averageCommission.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Rate Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات العمولة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">العمولة الافتراضية</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue="10"
                className="w-20 px-3 py-2 border rounded-lg"
              />
              <span className="text-gray-600">%</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">العمولة المطبقة على جميع الخدمات</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">عمولة البائعين المميزين</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue="8"
                className="w-20 px-3 py-2 border rounded-lg"
              />
              <span className="text-gray-600">%</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">عمولة مخفضة للبائعين المميزين</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">عمولة الخدمات المميزة</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue="12"
                className="w-20 px-3 py-2 border rounded-lg"
              />
              <span className="text-gray-600">%</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">عمولة إضافية للخدمات المميزة</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            حفظ الإعدادات
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في العمولات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الفترات</option>
              <option value="today">اليوم</option>
              <option value="week">آخر أسبوع</option>
              <option value="month">آخر شهر</option>
            </select>
          </div>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم العمولة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">مبلغ الطلب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">معدل العمولة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">مبلغ العمولة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedCommissions.map((commission) => (
              <tr key={commission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{commission.id}</td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium">{commission.orderId}</td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <div className="text-sm font-medium text-gray-900 truncate">{commission.service}</div>
                    <div className="text-sm text-gray-500">مشتري: {commission.buyer}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{commission.seller}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">${commission.orderAmount}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{commission.commissionRate}%</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600">${commission.commissionAmount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                    {getStatusText(commission.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{commission.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                عرض {((currentPage - 1) * itemsPerPage) + 1} إلى {Math.min(currentPage * itemsPerPage, filteredCommissions.length)} من {filteredCommissions.length} عمولة
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  السابق
                </button>
                <span className="px-3 py-1">
                  {currentPage} من {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  التالي
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}