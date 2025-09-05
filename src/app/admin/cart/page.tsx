'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, Search, Eye, Trash2, MessageSquare, CheckCircle, Clock, DollarSign, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminCartPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(15)

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
    }
  }, [router])

  // Mock cart data
  const cartData = [
    {
      id: 1,
      userId: '2',
      userName: 'علي أحمد',
      userEmail: 'ali@example.com',
      serviceId: '1',
      serviceName: 'تصميم شعار احترافي',
      seller: 'محمد حسن',
      price: 150,
      quantity: 1,
      addedDate: '2024-02-20',
      status: 'نشط',
      category: 'تصميم',
      daysInCart: 3
    },
    {
      id: 2,
      userId: '3',
      userName: 'نور فاطمة',
      userEmail: 'nour@example.com',
      serviceId: '2',
      serviceName: 'تطوير موقع إلكتروني متجاوب',
      seller: 'أحمد علي',
      price: 500,
      quantity: 1,
      addedDate: '2024-02-18',
      status: 'نشط',
      category: 'برمجة',
      daysInCart: 5
    },
    {
      id: 3,
      userId: '4',
      userName: 'سارة محمد',
      userEmail: 'sara@example.com',
      serviceId: '3',
      serviceName: 'كتابة محتوى تسويقي',
      seller: 'فاطمة علي',
      price: 75,
      quantity: 2,
      addedDate: '2024-02-15',
      status: 'منتهي الصلاحية',
      category: 'كتابة',
      daysInCart: 8
    },
    {
      id: 4,
      userId: '5',
      userName: 'أحمد سالم',
      userEmail: 'ahmed@example.com',
      serviceId: '4',
      serviceName: 'تصوير منتجات احترافي',
      seller: 'محمد عبدالله',
      price: 200,
      quantity: 1,
      addedDate: '2024-02-22',
      status: 'نشط',
      category: 'تصوير',
      daysInCart: 1
    },
    {
      id: 5,
      userId: '2',
      userName: 'علي أحمد',
      userEmail: 'ali@example.com',
      serviceId: '5',
      serviceName: 'ترجمة نصوص من العربية للإنجليزية',
      seller: 'عمر محمود',
      price: 120,
      quantity: 3,
      addedDate: '2024-02-19',
      status: 'نشط',
      category: 'ترجمة',
      daysInCart: 4
    },
    {
      id: 6,
      userId: '6',
      userName: 'ليلى حسن',
      userEmail: 'layla@example.com',
      serviceId: '6',
      serviceName: 'تحرير فيديو تسويقي',
      seller: 'يوسف أحمد',
      price: 300,
      quantity: 1,
      addedDate: '2024-02-16',
      status: 'نشط',
      category: 'فيديو',
      daysInCart: 7
    }
  ]

  // Filter and pagination logic
  const filteredCart = cartData.filter(item => {
    const matchesSearch = item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const paginatedCart = filteredCart.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const categories = [...new Set(cartData.map(item => item.category))]

  // Action handlers
  const handleViewService = (serviceId: string) => {
    router.push(`/services/${serviceId}`)
  }

  const handleRemoveFromCart = (item: any) => {
    if (confirm(`هل تريد حذف "${item.serviceName}" من سلة ${item.userName}؟`)) {
      alert('تم حذف العنصر من السلة بنجاح')
    }
  }

  const handleSendReminder = (item: any) => {
    alert(`تم إرسال تذكير للمستخدم ${item.userName} بخصوص العناصر في السلة`)
  }

  const handleClearExpiredItems = () => {
    const expiredCount = cartData.filter(item => item.status === 'منتهي الصلاحية').length
    if (confirm(`هل تريد حذف جميع العناصر منتهية الصلاحية (${expiredCount} عنصر)؟`)) {
      alert(`تم حذف ${expiredCount} عنصر منتهي الصلاحية`)
    }
  }

  // Pagination component
  const Pagination = ({ totalItems, currentPage, itemsPerPage, onPageChange }: {
    totalItems: number
    currentPage: number
    itemsPerPage: number
    onPageChange: (page: number) => void
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    
    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          عرض {((currentPage - 1) * itemsPerPage) + 1} إلى {Math.min(currentPage * itemsPerPage, totalItems)} من {totalItems} عنصر
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            السابق
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'border hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            التالي
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في السلة..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">جميع الحالات</option>
            <option value="نشط">نشط</option>
            <option value="منتهي الصلاحية">منتهي الصلاحية</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">جميع الفئات</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            onClick={handleClearExpiredItems}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            حذف المنتهية الصلاحية
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">إجمالي العناصر</p>
              <p className="text-3xl font-bold text-blue-600">{cartData.length}</p>
            </div>
            <ShoppingCart className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">عناصر نشطة</p>
              <p className="text-3xl font-bold text-green-600">
                {cartData.filter(item => item.status === 'نشط').length}
              </p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">منتهية الصلاحية</p>
              <p className="text-3xl font-bold text-red-600">
                {cartData.filter(item => item.status === 'منتهي الصلاحية').length}
              </p>
            </div>
            <Clock className="h-12 w-12 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">إجمالي القيمة</p>
              <p className="text-3xl font-bold text-purple-600">
                ${cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-12 w-12 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Cart Table */}
      {paginatedCart.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الكمية</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجمالي</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">مدة البقاء</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedCart.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.userName}</div>
                      <div className="text-sm text-gray-500">{item.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-gray-900 truncate" title={item.serviceName}>
                        {item.serviceName}
                      </div>
                      <div className="text-sm text-gray-500">#{item.serviceId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.seller}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">${item.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm font-bold text-blue-600">
                    ${(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'نشط' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.daysInCart} {item.daysInCart === 1 ? 'يوم' : 'أيام'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewService(item.serviceId)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="عرض الخدمة"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleRemoveFromCart(item)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="حذف من السلة"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleSendReminder(item)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="إرسال تذكير"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="px-6 py-4">
            <Pagination
              totalItems={filteredCart.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عناصر في السلة</h3>
          <p className="text-gray-500">
            {searchTerm || filterStatus !== 'all' || filterCategory !== 'all' 
              ? 'لم يتم العثور على عناصر تطابق معايير البحث' 
              : 'لا توجد عناصر في سلة المشتريات حالياً'}
          </p>
        </div>
      )}
    </div>
  )
}