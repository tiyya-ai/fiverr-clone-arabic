'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowRight, DollarSign, CreditCard, User, Calendar, CheckCircle, Clock, XCircle, AlertTriangle, Eye, Download, MessageSquare } from 'lucide-react'

export default function AdminPayoutDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [payout, setPayout] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
      return
    }

    // Mock payout data - in real app, fetch from API
    const mockPayout = {
      id: params.id,
      seller: 'محمد حسن',
      email: 'mohamed@example.com',
      phone: '+966501234567',
      amount: 1250,
      commission: 125,
      netAmount: 1125,
      method: 'bank_transfer',
      status: 'pending',
      requestDate: '2024-02-20',
      processedDate: null,
      ordersCount: 5,
      bankDetails: {
        bankName: 'البنك الأهلي السعودي',
        accountNumber: '****1234',
        accountHolder: 'محمد حسن علي',
        iban: 'SA03 8000 0000 6080 1016 7519'
      },
      orders: [
        { id: 'ORD001', amount: 250, commission: 25, date: '2024-02-15' },
        { id: 'ORD002', amount: 300, commission: 30, date: '2024-02-16' },
        { id: 'ORD003', amount: 200, commission: 20, date: '2024-02-17' },
        { id: 'ORD004', amount: 350, commission: 35, date: '2024-02-18' },
        { id: 'ORD005', amount: 150, commission: 15, date: '2024-02-19' }
      ],
      timeline: [
        { date: '2024-02-20 10:30', action: 'طلب سحب الأرباح', status: 'completed' },
        { date: '2024-02-20 14:15', action: 'مراجعة الطلب', status: 'completed' },
        { date: '2024-02-21 09:00', action: 'التحقق من البيانات', status: 'pending' },
        { date: '2024-02-21 16:00', action: 'معالجة الدفعة', status: 'pending' },
        { date: '2024-02-22 12:00', action: 'إرسال الدفعة', status: 'pending' }
      ]
    }

    setPayout(mockPayout)
    setLoading(false)
  }, [params.id, router])

  const handleApprovePayout = () => {
    if (confirm('هل أنت متأكد من الموافقة على هذه الدفعة؟')) {
      alert('تم الموافقة على الدفعة')
    }
  }

  const handleRejectPayout = () => {
    if (confirm('هل أنت متأكد من رفض هذه الدفعة؟')) {
      alert('تم رفض الدفعة')
    }
  }

  const handleProcessPayout = () => {
    if (confirm('هل تريد معالجة هذه الدفعة الآن؟')) {
      alert('تم إرسال الدفعة للمعالجة')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار'
      case 'processing': return 'قيد المعالجة'
      case 'completed': return 'مكتملة'
      case 'rejected': return 'مرفوضة'
      default: return 'غير معروف'
    }
  }

  const getMethodText = (method: string) => {
    switch (method) {
      case 'bank_transfer': return 'تحويل بنكي'
      case 'paypal': return 'PayPal'
      case 'wallet': return 'محفظة إلكترونية'
      default: return 'غير محدد'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!payout) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">الدفعة غير موجودة</h1>
          <button 
            onClick={() => router.push('/admin/payouts')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            العودة إلى الدفعات
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
            onClick={() => router.push('/admin/payouts')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الدفعات
          </button>
          <h1 className="text-2xl font-bold text-gray-900">تفاصيل الدفعة {payout.id}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('تم تحميل التقرير')}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <Download className="h-4 w-4" />
            تحميل التقرير
          </button>
          {payout.status === 'pending' && (
            <>
              <button
                onClick={handleApprovePayout}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                موافقة
              </button>
              <button
                onClick={handleRejectPayout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <XCircle className="h-4 w-4" />
                رفض
              </button>
            </>
          )}
          {payout.status === 'processing' && (
            <button
              onClick={handleProcessPayout}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <DollarSign className="h-4 w-4" />
              معالجة الدفعة
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payout Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">نظرة عامة على الدفعة</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">${payout.amount}</p>
                <p className="text-sm text-gray-600">إجمالي المبيعات</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <CreditCard className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">${payout.commission}</p>
                <p className="text-sm text-gray-600">العمولة (10%)</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">${payout.netAmount}</p>
                <p className="text-sm text-gray-600">صافي المبلغ</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payout.status)}`}>
                  {getStatusText(payout.status)}
                </span>
                <p className="text-sm text-gray-600 mt-1">حالة الدفعة</p>
              </div>
            </div>
          </div>

          {/* Orders Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">تفاصيل الطلبات ({payout.ordersCount} طلبات)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم الطلب
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التاريخ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المبلغ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العمولة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      صافي البائع
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payout.orders?.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => router.push(`/admin/orders/${order.id}`)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          {order.id}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        -${order.commission}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        ${order.amount - order.commission}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">مراحل معالجة الدفعة</h3>
            <div className="space-y-4">
              {payout.timeline?.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-100 text-green-600' : 
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : item.status === 'pending' ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
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
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <p className="text-gray-900">{payout.seller}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <p className="text-gray-900">{payout.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <p className="text-gray-900">{payout.phone}</p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/profile/${payout.seller}`)}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              عرض ملف البائع
            </button>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">طريقة الدفع</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الطريقة</label>
                <p className="text-gray-900">{getMethodText(payout.method)}</p>
              </div>
              {payout.method === 'bank_transfer' && payout.bankDetails && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">البنك</label>
                    <p className="text-gray-900">{payout.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم الحساب</label>
                    <p className="text-gray-900">{payout.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اسم صاحب الحساب</label>
                    <p className="text-gray-900">{payout.bankDetails.accountHolder}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                    <p className="text-gray-900 font-mono text-sm">{payout.bankDetails.iban}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Payout Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">معلومات الدفعة</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">تاريخ الطلب:</span>
                <span className="font-semibold">{payout.requestDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">تاريخ المعالجة:</span>
                <span className="font-semibold">{payout.processedDate || 'لم تتم بعد'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">عدد الطلبات:</span>
                <span className="font-semibold">{payout.ordersCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">معدل العمولة:</span>
                <span className="font-semibold">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}