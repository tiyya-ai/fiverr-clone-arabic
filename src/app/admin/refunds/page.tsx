'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Eye, CheckCircle, XCircle, DollarSign, Calendar, User, Package } from 'lucide-react'

export default function RefundsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
    }
  }, [router])

  const refundsData = [
    {
      id: 'REF001',
      orderId: 'ORD123',
      service: 'تصميم شعار احترافي',
      buyer: 'أحمد محمد',
      seller: 'فاطمة علي',
      amount: 150,
      reason: 'عدم مطابقة المواصفات',
      status: 'pending',
      requestDate: '2024-02-20',
      processedDate: null
    },
    {
      id: 'REF002',
      orderId: 'ORD124',
      service: 'تطوير موقع إلكتروني',
      buyer: 'سارة أحمد',
      seller: 'محمد حسن',
      amount: 800,
      reason: 'تأخير في التسليم',
      status: 'approved',
      requestDate: '2024-02-18',
      processedDate: '2024-02-19'
    },
    {
      id: 'REF003',
      orderId: 'ORD125',
      service: 'كتابة محتوى تسويقي',
      buyer: 'علي سالم',
      seller: 'نور فاطمة',
      amount: 75,
      reason: 'جودة غير مرضية',
      status: 'rejected',
      requestDate: '2024-02-15',
      processedDate: '2024-02-16'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': 
        return 'bg-yellow-100 text-yellow-800'
      case 'approved': 
        return 'bg-green-100 text-green-800'
      case 'rejected': 
        return 'bg-red-100 text-red-800'
      default: 
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': 
        return 'قيد المراجعة'
      case 'approved': 
        return 'مقبول'
      case 'rejected': 
        return 'مرفوض'
      default: 
        return status
    }
  }

  const filteredRefunds = refundsData.filter(refund => {
    const matchesSearch = refund.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || refund.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredRefunds.length / itemsPerPage)
  const paginatedRefunds = filteredRefunds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleRefundAction = (refundId: string, action: 'approve' | 'reject') => {
    const actionText = action === 'approve' ? 'قبول' : 'رفض'
    if (confirm(`هل تريد ${actionText} طلب الاسترداد ${refundId}؟`)) {
      alert(`تم ${actionText} طلب الاسترداد بنجاح`)
    }
  }

  const handleViewDetails = (refundId: string) => {
    router.push(`/admin/refunds/${refundId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">المبالغ المسترجعة</h1>
          <p className="text-gray-600 mt-2">إدارة طلبات استرداد الأموال</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
              <p className="text-2xl font-bold text-gray-900">{refundsData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
              <p className="text-2xl font-bold text-yellow-600">
                {refundsData.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">مقبولة</p>
              <p className="text-2xl font-bold text-green-600">
                {refundsData.filter(r => r.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">مرفوضة</p>
              <p className="text-2xl font-bold text-red-600">
                {refundsData.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في طلبات الاسترداد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">قيد المراجعة</option>
              <option value="approved">مقبول</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الطلب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشتري</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السبب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الطلب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedRefunds.map((refund) => (
              <tr key={refund.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{refund.id}</td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <div className="text-sm font-medium text-gray-900 truncate">{refund.service}</div>
                    <div className="text-sm text-gray-500">طلب: {refund.orderId}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{refund.buyer}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{refund.seller}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600">${refund.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{refund.reason}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(refund.status)}`}>
                    {getStatusText(refund.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{refund.requestDate}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(refund.id)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="عرض التفاصيل"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {refund.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleRefundAction(refund.id, 'approve')}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                          title="قبول الطلب"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRefundAction(refund.id, 'reject')}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="رفض الطلب"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                عرض {((currentPage - 1) * itemsPerPage) + 1} إلى {Math.min(currentPage * itemsPerPage, filteredRefunds.length)} من {filteredRefunds.length} طلب
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