'use client'

import { useEffect, useState } from 'react'
import { DollarSign, TrendingUp, CreditCard, ArrowLeft, Download, BarChart3 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminFinancialPage() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
    }
  }, [router])

  // Mock financial data
  const financialData = {
    totalRevenue: 331000,
    platformCommission: 66200,
    sellerPayouts: 264800,
    monthlyRevenue: [
      { month: 'يناير', revenue: 25000, commission: 5000 },
      { month: 'فبراير', revenue: 28000, commission: 5600 },
      { month: 'مارس', revenue: 32000, commission: 6400 },
      { month: 'أبريل', revenue: 29000, commission: 5800 },
      { month: 'مايو', revenue: 35000, commission: 7000 },
      { month: 'يونيو', revenue: 38000, commission: 7600 }
    ],
    topEarners: [
      { name: 'أحمد محمد', earnings: 12500, orders: 45 },
      { name: 'فاطمة علي', earnings: 9800, orders: 32 },
      { name: 'محمد حسن', earnings: 8900, orders: 28 },
      { name: 'نور أحمد', earnings: 7600, orders: 24 },
      { name: 'علي محمود', earnings: 6800, orders: 21 }
    ],
    pendingPayouts: [
      { seller: 'أحمد محمد', amount: 1250, method: 'PayPal', date: '2024-02-25' },
      { seller: 'فاطمة علي', amount: 890, method: 'بنك', date: '2024-02-24' },
      { seller: 'محمد حسن', amount: 1100, method: 'PayPal', date: '2024-02-23' },
      { seller: 'نور أحمد', amount: 750, method: 'بنك', date: '2024-02-22' }
    ]
  }

  const handleExportReport = () => {
    // Here you would implement the actual export functionality
    alert('تم تصدير التقرير المالي بنجاح')
  }

  const handleProcessPayout = (seller: string, amount: number) => {
    if (confirm(`هل تريد معالجة دفعة ${amount}$ للبائع ${seller}؟`)) {
      alert(`تم معالجة الدفعة بنجاح`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex justify-end gap-3 mb-6">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">هذا الأسبوع</option>
          <option value="month">هذا الشهر</option>
          <option value="quarter">هذا الربع</option>
          <option value="year">هذا العام</option>
        </select>
        <button
          onClick={handleExportReport}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          تصدير التقرير
        </button>
      </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold">${financialData.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-100 mt-1">+12.5% من الشهر الماضي</p>
              </div>
              <DollarSign className="h-12 w-12 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">عمولة المنصة</p>
                <p className="text-3xl font-bold">${financialData.platformCommission.toLocaleString()}</p>
                <p className="text-sm text-blue-100 mt-1">20% من الإيرادات</p>
              </div>
              <TrendingUp className="h-12 w-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">مدفوعات البائعين</p>
                <p className="text-3xl font-bold">${financialData.sellerPayouts.toLocaleString()}</p>
                <p className="text-sm text-purple-100 mt-1">80% من الإيرادات</p>
              </div>
              <CreditCard className="h-12 w-12 text-purple-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">الإيرادات الشهرية</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {financialData.monthlyRevenue.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{month.month}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(month.revenue / 40000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-green-600">${month.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Earners */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">أعلى البائعين دخلاً</h3>
            <div className="space-y-4">
              {financialData.topEarners.map((earner, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{earner.name}</p>
                      <p className="text-sm text-gray-500">{earner.orders} طلب</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">${earner.earnings.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">المدفوعات المعلقة</h3>
            <span className="text-sm text-gray-500">
              {financialData.pendingPayouts.length} دفعة معلقة
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">طريقة الدفع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {financialData.pendingPayouts.map((payout, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{payout.seller}</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">${payout.amount}</td>
                    <td className="px-6 py-4 text-sm">{payout.method}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{payout.date}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleProcessPayout(payout.seller, payout.amount)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        معالجة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commission Settings */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">إعدادات العمولة</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">نسبة العمولة الافتراضية (%)</label>
                <input 
                  type="number" 
                  defaultValue="20" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">عمولة البائعين المميزين (%)</label>
                <input 
                  type="number" 
                  defaultValue="15" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                حفظ الإعدادات
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">إحصائيات العمولات</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>عمولات هذا الشهر:</span>
                <span className="font-bold text-green-600">$12,450</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>متوسط العمولة:</span>
                <span className="font-bold">18.5%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>أعلى عمولة:</span>
                <span className="font-bold">$2,100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}