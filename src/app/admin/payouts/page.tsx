'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Eye, CheckCircle, Clock, DollarSign, CreditCard, User, Calendar } from 'lucide-react'

export default function PayoutsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const payoutsData = [
    {
      id: 'PAY001',
      seller: 'محمد حسن',
      email: 'mohamed@example.com',
      amount: 1250,
      commission: 125,
      netAmount: 1125,
      method: 'bank_transfer',
      status: 'pending',
      requestDate: '2024-02-20',
      processedDate: null,
      ordersCount: 5
    },
    {
      id: 'PAY002',
      seller: 'فاطمة علي',
      email: 'fatima@example.com',
      amount: 800,
      commission: 80,
      netAmount: 720,
      method: 'paypal',
      status: 'completed',
      requestDate: '2024-02-18',
      processedDate: '2024-02-19',
      ordersCount: 3
    },
    {
      id: 'PAY003',
      seller: 'أحمد سالم',
      email: 'ahmed@example.com',
      amount: 450,
      commission: 45,
      netAmount: 405,
      method: 'bank_transfer',
      status: 'processing',
      requestDate: '2024-02-15',
      processedDate: null,
      ordersCount: 2
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار'
      case 'processing': return 'قيد المعالجة'
      case 'completed': return 'مكتمل'
      case 'failed': return 'فشل'
      default: return status
    }
  }

  const getMethodText = (method: string) => {
    switch (method) {
      case 'bank_transfer': return 'تحويل بنكي'
      case 'paypal': return 'PayPal'
      case 'stripe': return 'Stripe'
      default: return method
    }
  }

  const filteredPayouts = payoutsData.filter(payout => {
    const matchesSearch = payout.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || payout.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredPayouts.length / itemsPerPage)
  const paginatedPayouts = filteredPayouts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePayoutAction = (payoutId: string, action: 'approve' | 'process' | 'complete') => {
    const actionText = action === 'approve' ? 'الموافقة على' : action === 'process' ? 'معالجة' : 'إكمال'
    if (confirm(`هل تريد ${actionText} الدفعة ${payoutId}؟`)) {
      alert(`تم ${actionText} الدفعة بنجاح`)
    }
  }

  const totalPendingAmount = payoutsData
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.netAmount, 0)

  const totalProcessingAmount = payoutsData
    .filter(p => p.status === 'processing')
    .reduce((sum, p) => sum + p.netAmount, 0)

  const totalCompletedAmount = payoutsData
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.netAmount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">المدفوعات</h1>
          <p className="text-gray-600 mt-2">إدارة مدفوعات البائعين</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">${totalPendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">قيد المعالجة</p>
              <p className="text-2xl font-bold text-blue-600">${totalProcessingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">مكتملة</p>
              <p className="text-2xl font-bold text-green-600">${totalCompletedAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gray-100">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
              <p className="text-2xl font-bold text-gray-900">{payoutsData.length}</p>
            </div>
          </div>
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
                placeholder="البحث في المدفوعات..."
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
              <option value="pending">قيد الانتظار</option>
              <option value="processing">قيد المعالجة</option>
              <option value="completed">مكتمل</option>
              <option value="failed">فشل</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الدفعة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ الإجمالي</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العمولة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ الصافي</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">طريقة الدفع</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الطلب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedPayouts.map((payout) => (
              <tr key={payout.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{payout.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{payout.seller}</div>
                    <div className="text-sm text-gray-500">{payout.email}</div>
                    <div className="text-xs text-gray-400">{payout.ordersCount} طلبات</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">${payout.amount}</td>
                <td className="px-6 py-4 text-sm text-red-600">-${payout.commission}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600">${payout.netAmount}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{getMethodText(payout.method)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                    {getStatusText(payout.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>{payout.requestDate}</div>
                  {payout.processedDate && (
                    <div className="text-xs text-green-600">تم: {payout.processedDate}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/payouts/${payout.id}`)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="عرض التفاصيل"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {payout.status === 'pending' && (
                      <button
                        onClick={() => handlePayoutAction(payout.id, 'approve')}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="الموافقة على الدفعة"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    {payout.status === 'processing' && (
                      <button
                        onClick={() => handlePayoutAction(payout.id, 'complete')}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="إكمال الدفعة"
                      >
                        <DollarSign className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                عرض {((currentPage - 1) * itemsPerPage) + 1} إلى {Math.min(currentPage * itemsPerPage, filteredPayouts.length)} من {filteredPayouts.length} دفعة
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