'use client'

import { useEffect, useState } from 'react'
import { BarChart3, TrendingUp, Users, Package, DollarSign, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LineChart, BarChart, PieChart as CustomPieChart, DonutChart } from '@/components/Admin/Charts'

export default function AdminAnalyticsPage() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState('30')

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
    }
  }, [router])

  const revenueData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    data: [12000, 19000, 15000, 25000, 22000, 30000]
  }

  const categoryData = {
    labels: ['تصميم', 'برمجة', 'كتابة', 'تسويق', 'ترجمة'],
    data: [35, 25, 20, 15, 5],
    colors: ['#1ab7ea', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  }

  const dailySalesData = {
    labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    data: [1200, 1900, 1500, 2500, 2200, 3000, 2800]
  }

  const userGrowthData = {
    labels: ['المشترين', 'البائعين', 'المدراء'],
    data: [65, 30, 5],
    colors: ['#1ab7ea', '#10b981', '#f59e0b']
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">التحليلات والإحصائيات</h1>
        <div className="flex gap-4">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">آخر 7 أيام</option>
            <option value="30">آخر 30 يوم</option>
            <option value="90">آخر 3 أشهر</option>
            <option value="365">آخر سنة</option>
          </select>
          <button 
            onClick={() => {
              const reportData = {
                period: dateRange,
                revenue: '$45,230',
                users: '1,234',
                services: '567',
                conversion: '3.2%'
              }
              const dataStr = JSON.stringify(reportData, null, 2)
              const dataBlob = new Blob([dataStr], {type: 'application/json'})
              const url = URL.createObjectURL(dataBlob)
              const link = document.createElement('a')
              link.href = url
              link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`
              link.click()
              URL.revokeObjectURL(url)
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            تصدير التقرير
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">إجمالي الإيرادات</p>
              <p className="text-3xl font-bold">$45,230</p>
              <p className="text-sm text-blue-200">+12.5% من الشهر الماضي</p>
            </div>
            <DollarSign className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">المستخدمين الجدد</p>
              <p className="text-3xl font-bold">1,234</p>
              <p className="text-sm text-green-200">+8.2% من الشهر الماضي</p>
            </div>
            <Users className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">الخدمات النشطة</p>
              <p className="text-3xl font-bold">567</p>
              <p className="text-sm text-purple-200">+15.3% من الشهر الماضي</p>
            </div>
            <Package className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">معدل التحويل</p>
              <p className="text-3xl font-bold">3.2%</p>
              <p className="text-sm text-yellow-200">+0.5% من الشهر الماضي</p>
            </div>
            <TrendingUp className="h-12 w-12 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart data={revenueData} title="نمو الإيرادات الشهرية" />
        <CustomPieChart data={categoryData} title="توزيع الخدمات حسب الفئة" />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BarChart data={dailySalesData} title="أداء المبيعات اليومي" />
        </div>

        <div className="space-y-6">
          <DonutChart 
            data={userGrowthData} 
            title="توزيع المستخدمين" 
            centerText="1,234"
          />
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">أهم الإحصائيات</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">متوسط قيمة الطلب</span>
                <span className="font-bold text-green-600">$127</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">وقت الاستجابة المتوسط</span>
                <span className="font-bold">2.3 ساعة</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">معدل إكمال الطلبات</span>
                <span className="font-bold text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">معدل رضا العملاء</span>
                <span className="font-bold text-green-600">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}