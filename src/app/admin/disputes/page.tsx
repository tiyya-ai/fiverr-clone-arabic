'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, Search, ArrowLeft, MessageSquare, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminDisputesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
    }
  }, [router])

  const disputes = [
    { 
      id: 1, 
      order: 'تصميم شعار', 
      buyer: 'علي أحمد', 
      seller: 'محمد حسن', 
      reason: 'عدم مطابقة المواصفات', 
      priority: 'عالية',
      amount: 150,
      date: '2024-02-20',
      status: 'مفتوح'
    },
    { 
      id: 2, 
      order: 'تطوير موقع', 
      buyer: 'نور فاطمة', 
      seller: 'أحمد علي', 
      reason: 'تأخير في التسليم', 
      priority: 'متوسطة',
      amount: 500,
      date: '2024-02-18',
      status: 'قيد المراجعة'
    },
    { 
      id: 3, 
      order: 'كتابة محتوى', 
      buyer: 'سارة محمد', 
      seller: 'فاطمة علي', 
      reason: 'جودة غير مرضية', 
      priority: 'منخفضة',
      amount: 75,
      date: '2024-02-15',
      status: 'محلول'
    }
  ]

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.order.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === 'all' || dispute.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  const handleResolveForBuyer = (dispute: any) => {
    if (confirm(`هل تريد حل النزاع لصالح المشتري ${dispute.buyer}؟`)) {
      alert(`تم حل النزاع لصالح المشتري: ${dispute.buyer}`)
    }
  }

  const handleResolveForSeller = (dispute: any) => {
    if (confirm(`هل تريد حل النزاع لصالح البائع ${dispute.seller}؟`)) {
      alert(`تم حل النزاع لصالح البائع: ${dispute.seller}`)
    }
  }

  const handleViewDetails = (disputeId: number) => {
    router.push(`/admin/disputes/${disputeId}`)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية':
        return 'bg-red-100 text-red-800'
      case 'متوسطة':
        return 'bg-yellow-100 text-yellow-800'
      case 'منخفضة':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'محلول':
        return 'bg-green-100 text-green-800'
      case 'قيد المراجعة':
        return 'bg-blue-100 text-blue-800'
      case 'مفتوح':
        return 'bg-red-100 text-red-800'
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
                placeholder="البحث في النزاعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الأولويات</option>
              <option value="عالية">عالية</option>
              <option value="متوسطة">متوسطة</option>
              <option value="منخفضة">منخفضة</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">إجمالي النزاعات</p>
                <p className="text-3xl font-bold text-blue-600">{disputes.length}</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">مفتوحة</p>
                <p className="text-3xl font-bold text-red-600">
                  {disputes.filter(d => d.status === 'مفتوح').length}
                </p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">قيد المراجعة</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {disputes.filter(d => d.status === 'قيد المراجعة').length}
                </p>
              </div>
              <MessageSquare className="h-12 w-12 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">محلولة</p>
                <p className="text-3xl font-bold text-green-600">
                  {disputes.filter(d => d.status === 'محلول').length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Disputes List */}
        <div className="space-y-4">
          {filteredDisputes.map((dispute) => (
            <div key={dispute.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg">#{dispute.id} - {dispute.order}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(dispute.priority)}`}>
                      {dispute.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>
                      {dispute.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">السبب: {dispute.reason}</p>
                  <p className="text-sm text-gray-500">التاريخ: {dispute.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 text-lg">${dispute.amount}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-500">المشتري:</span>
                  <p className="font-medium">{dispute.buyer}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-500">البائع:</span>
                  <p className="font-medium">{dispute.seller}</p>
                </div>
              </div>

              {dispute.status !== 'محلول' && (
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => handleResolveForBuyer(dispute)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    حل لصالح المشتري
                  </button>
                  <button 
                    onClick={() => handleResolveForSeller(dispute)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    حل لصالح البائع
                  </button>
                  <button 
                    onClick={() => handleViewDetails(dispute.id)}
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                  >
                    عرض التفاصيل
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredDisputes.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نزاعات</h3>
            <p className="text-gray-500">لم يتم العثور على نزاعات تطابق معايير البحث</p>
          </div>
        )}
      </div>
  )
}