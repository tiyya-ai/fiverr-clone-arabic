'use client'

import { useEffect, useState } from 'react'
import { Users, Package, DollarSign, TrendingUp, CheckCircle, Eye, Edit, Trash2, Search, Download, MessageSquare, Star, Clock, Plus, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useServices } from '@/context/ServicesContext'
import { mockUsers } from '@/data/mockData'
import { LineChart, BarChart, PieChart, DonutChart } from '@/components/Admin/Charts'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  // Get real data from context and mock data
  const { services: realServices } = useServices()
  const realUsers = mockUsers

  // Create mock orders data since it doesn't exist in mockData
  const realOrders = [
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
  ]

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      window.location.href = '/'
    }
  }, [])



  // Calculate real statistics from actual data
  const stats = {
    totalUsers: realUsers?.length || 0,
    totalServices: realServices?.length || 0,
    totalRevenue: realOrders?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0,
    activeOrders: realOrders?.filter(order => order.status === 'active' || order.status === 'in_progress').length || 0
  }

  // Use real users data with admin-friendly format
  const users = realUsers?.map(user => ({
    id: user.id,
    name: user.fullName,
    email: `${user.username}@example.com`, // Generate email from username
    type: user.totalSales > 0 ? 'بائع' : 'مشتري', // Determine type based on sales
    status: 'نشط', // Default to active
    joinDate: user.memberSince,
    orders: user.totalSales || 0,
    rating: user.rating,
    avatar: user.fullName.charAt(0)
  })) || []

  // Use real services data with admin-friendly format
  const services = realServices?.map(service => {
    const seller = realUsers?.find(user => user.id === service.userId)
    return {
      id: service.id,
      title: service.title,
      seller: seller?.fullName || 'غير معروف',
      category: service.category,
      status: 'مقبول', // Default to approved
      price: service.packages[0]?.price || 0,
      views: Math.floor(Math.random() * 5000) + 100, // Generate random views
      orders: service.totalSales || 0,
      rating: service.rating
    }
  }) || []

  // Use real orders data with admin-friendly format
  const orders = realOrders?.map(order => {
    const service = realServices?.find(s => s.id === order.serviceId)
    const buyer = realUsers?.find(u => u.id === order.buyerId)
    const seller = realUsers?.find(u => u.id === order.sellerId)

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
      date: order.createdAt
    }
  }) || []

  // Pagination helper function
  const paginateData = (data: any[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  // Search helper function
  const filterData = (data: any[], searchTerm: string, searchFields: string[]) => {
    if (!searchTerm) return data
    return data.filter(item =>
      searchFields.some(field =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
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
            <ChevronRight className="h-4 w-4" />
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
                className={`px-3 py-1 rounded-lg ${currentPage === pageNum
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
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'sellers':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">إدارة البائعين</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {users.filter(u => u.type === 'بائع').map((seller) => (
                <div key={seller.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center ml-4">
                      <span className="text-green-600 font-bold">{seller.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{seller.name}</h4>
                      <p className="text-sm text-gray-500">{seller.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>الطلبات:</span>
                      <span className="font-bold">{seller.orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>التقييم:</span>
                      <span className="font-bold">{seller.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => router.push(`/profile/${seller.name}`)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
                    >
                      عرض
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`هل تريد تفعيل البائع: ${seller.name}؟`)) {
                          alert(`تم تفعيل البائع: ${seller.name}`)
                        }
                      }}
                      className="flex-1 bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700"
                    >
                      تفعيل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'buyers':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">إدارة المشترين</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشتري</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلبات</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإنفاق</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.filter(u => u.type === 'مشتري').map((buyer) => (
                    <tr key={buyer.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                            <span className="text-blue-600 font-bold text-sm">{buyer.avatar}</span>
                          </div>
                          <div>
                            <div className="font-medium">{buyer.name}</div>
                            <div className="text-sm text-gray-500">{buyer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{buyer.orders}</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600">$1,250</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => router.push(`/profile/${buyer.name}`)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="عرض التفاصيل"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'categories':
        const categoriesData = [
          { id: 1, name: 'تطوير المواقع', services: 1245, icon: '💻', status: 'نشط', created: '2024-01-15' },
          { id: 2, name: 'التصميم الجرافيكي', services: 987, icon: '🎨', status: 'نشط', created: '2024-01-16' },
          { id: 3, name: 'التسويق الرقمي', services: 756, icon: '📱', status: 'نشط', created: '2024-01-17' },
          { id: 4, name: 'الكتابة والترجمة', services: 543, icon: '✍️', status: 'نشط', created: '2024-01-18' },
          { id: 5, name: 'تحرير الفيديو', services: 432, icon: '🎬', status: 'نشط', created: '2024-01-19' },
          { id: 6, name: 'التصوير', services: 321, icon: '📸', status: 'نشط', created: '2024-01-20' }
        ]

        const filteredCategories = filterData(categoriesData, searchTerm, ['name'])
        const paginatedCategories = paginateData(filteredCategories, currentPage, itemsPerPage)

        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">إدارة الفئات</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في الفئات..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => router.push('/admin/categories/create')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  إضافة فئة
                </button>
              </div>
            </div>

            {/* Categories Count */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  {filteredCategories.length} فئة {searchTerm && `(تم العثور عليها من أصل ${categoriesData.length})`}
                </h4>
                <div className="text-sm text-gray-500">
                  الصفحة {currentPage} من {Math.ceil(filteredCategories.length / itemsPerPage) || 1}
                </div>
              </div>
            </div>

            {paginatedCategories.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد الخدمات</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الإنشاء</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedCategories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="text-2xl ml-3">{category.icon}</div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{category.name}</div>
                              <div className="text-sm text-gray-500">ID: {category.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{category.services.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {category.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{category.created}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push('/admin/categories')}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="عرض الفئة"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => router.push(`/admin/categories/${category.id}/edit`)}
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                              title="تعديل الفئة"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`هل تريد حذف فئة ${category.name}؟`)) {
                                  alert(`تم حذف الفئة: ${category.name}`)
                                }
                              }}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="حذف الفئة"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="px-6 py-4">
                  <Pagination
                    totalItems={filteredCategories.length}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد فئات</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'لم يتم العثور على فئات تطابق معايير البحث' : 'لا توجد فئات متاحة'}
                </p>
              </div>
            )}

            {/* View All Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/admin/categories')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                عرض جميع الفئات في صفحة منفصلة ←
              </button>
            </div>
          </div>
        )

      case 'pending':
        const pendingServices = services.filter(s => s.status === 'معلق')
        const filteredPendingServices = filterData(pendingServices, searchTerm, ['title', 'seller', 'category'])
        const paginatedPendingServices = paginateData(filteredPendingServices, currentPage, itemsPerPage)

        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">الخدمات في انتظار الموافقة</h3>
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في الخدمات المعلقة..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Pending Services Count */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  {filteredPendingServices.length} خدمة معلقة {searchTerm && `(تم العثور عليها من أصل ${pendingServices.length})`}
                </h4>
                <div className="text-sm text-gray-500">
                  الصفحة {currentPage} من {Math.ceil(filteredPendingServices.length / itemsPerPage) || 1}
                </div>
              </div>
            </div>

            {paginatedPendingServices.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التقييم</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الإرسال</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedPendingServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <div className="text-sm font-medium text-gray-900 truncate">{service.title}</div>
                            <div className="text-sm text-gray-500">ID: {service.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{service.seller}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{service.category}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">${service.price}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                            <span className="text-sm">{service.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">منذ يومين</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push(`/services/${service.id}`)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="عرض الخدمة"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`هل تريد قبول الخدمة: ${service.title}؟`)) {
                                  alert(`تم قبول الخدمة: ${service.title}`)
                                }
                              }}
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                              title="موافقة على الخدمة"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`هل تريد رفض الخدمة: ${service.title}؟`)) {
                                  alert(`تم رفض الخدمة: ${service.title}`)
                                }
                              }}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="رفض الخدمة"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="px-6 py-4">
                  <Pagination
                    totalItems={filteredPendingServices.length}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد خدمات معلقة</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'لم يتم العثور على خدمات معلقة تطابق معايير البحث' : 'جميع الخدمات تم مراجعتها'}
                </p>
              </div>
            )}
          </div>
        )

      case 'disputes':
        const disputesData = [
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
          },
          {
            id: 4,
            order: 'تصميم موقع',
            buyer: 'أحمد سالم',
            seller: 'محمد عبدالله',
            reason: 'عدم الالتزام بالمواعيد',
            priority: 'عالية',
            amount: 800,
            date: '2024-02-22',
            status: 'مفتوح'
          },
          {
            id: 5,
            order: 'ترجمة نصوص',
            buyer: 'ليلى حسن',
            seller: 'عمر محمود',
            reason: 'أخطاء في الترجمة',
            priority: 'متوسطة',
            amount: 120,
            date: '2024-02-19',
            status: 'قيد المراجعة'
          }
        ]

        const filteredDisputes = filterData(disputesData, searchTerm, ['order', 'buyer', 'seller', 'reason'])
        const paginatedDisputes = paginateData(filteredDisputes, currentPage, itemsPerPage)

        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">إدارة النزاعات</h3>
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في النزاعات..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Disputes Count */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  {filteredDisputes.length} نزاع {searchTerm && `(تم العثور عليها من أصل ${disputesData.length})`}
                </h4>
                <div className="text-sm text-gray-500">
                  الصفحة {currentPage} من {Math.ceil(filteredDisputes.length / itemsPerPage) || 1}
                </div>
              </div>
            </div>

            {paginatedDisputes.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النزاع</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشتري</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السبب</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الأولوية</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedDisputes.map((dispute) => (
                      <tr key={dispute.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{dispute.order}</div>
                            <div className="text-sm text-gray-500">#{dispute.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{dispute.buyer}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{dispute.seller}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate" title={dispute.reason}>
                            {dispute.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">${dispute.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${dispute.priority === 'عالية' ? 'bg-red-100 text-red-800' :
                            dispute.priority === 'متوسطة' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                            {dispute.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${dispute.status === 'محلول' ? 'bg-green-100 text-green-800' :
                            dispute.status === 'قيد المراجعة' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                            {dispute.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{dispute.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push(`/admin/disputes/${dispute.id}`)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="عرض التفاصيل"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {dispute.status !== 'محلول' && (
                              <>
                                <button
                                  onClick={() => {
                                    if (confirm(`هل تريد حل النزاع لصالح المشتري: ${dispute.buyer}؟`)) {
                                      alert(`تم حل النزاع لصالح المشتري: ${dispute.buyer}`)
                                    }
                                  }}
                                  className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                  title="حل لصالح المشتري"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`هل تريد حل النزاع لصالح البائع: ${dispute.seller}؟`)) {
                                      alert(`تم حل النزاع لصالح البائع: ${dispute.seller}`)
                                    }
                                  }}
                                  className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                                  title="حل لصالح البائع"
                                >
                                  <Star className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-6 py-4">
                  <Pagination
                    totalItems={filteredDisputes.length}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نزاعات</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'لم يتم العثور على نزاعات تطابق معايير البحث' : 'لا توجد نزاعات حالياً'}
                </p>
              </div>
            )}

            {/* View All Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/admin/disputes')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                عرض جميع النزاعات في صفحة منفصلة ←
              </button>
            </div>
          </div>
        )

      case 'cart':
        const cartData = [
          {
            id: 1,
            userId: '2',
            userName: 'علي أحمد',
            serviceId: '1',
            serviceName: 'تصميم شعار احترافي',
            seller: 'محمد حسن',
            price: 150,
            quantity: 1,
            addedDate: '2024-02-20',
            status: 'نشط',
            category: 'تصميم'
          },
          {
            id: 2,
            userId: '3',
            userName: 'نور فاطمة',
            serviceId: '2',
            serviceName: 'تطوير موقع إلكتروني',
            seller: 'أحمد علي',
            price: 500,
            quantity: 1,
            addedDate: '2024-02-18',
            status: 'نشط',
            category: 'برمجة'
          },
          {
            id: 3,
            userId: '4',
            userName: 'سارة محمد',
            serviceId: '3',
            serviceName: 'كتابة محتوى تسويقي',
            seller: 'فاطمة علي',
            price: 75,
            quantity: 2,
            addedDate: '2024-02-15',
            status: 'منتهي الصلاحية',
            category: 'كتابة'
          },
          {
            id: 4,
            userId: '5',
            userName: 'أحمد سالم',
            serviceId: '4',
            serviceName: 'تصوير منتجات',
            seller: 'محمد عبدالله',
            price: 200,
            quantity: 1,
            addedDate: '2024-02-22',
            status: 'نشط',
            category: 'تصوير'
          },
          {
            id: 5,
            userId: '2',
            userName: 'علي أحمد',
            serviceId: '5',
            serviceName: 'ترجمة نصوص',
            seller: 'عمر محمود',
            price: 120,
            quantity: 3,
            addedDate: '2024-02-19',
            status: 'نشط',
            category: 'ترجمة'
          }
        ]

        const filteredCart = filterData(cartData, searchTerm, ['userName', 'serviceName', 'seller', 'category'])
        const paginatedCart = paginateData(filteredCart, currentPage, itemsPerPage)

        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">سلة المشتريات</h3>
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
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Cart Stats */}
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

            {/* Cart Count */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  {filteredCart.length} عنصر في السلة {searchTerm && `(تم العثور عليها من أصل ${cartData.length})`}
                </h4>
                <div className="text-sm text-gray-500">
                  الصفحة {currentPage} من {Math.ceil(filteredCart.length / itemsPerPage) || 1}
                </div>
              </div>
            </div>

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
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الإضافة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedCart.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.userName}</div>
                            <div className="text-sm text-gray-500">ID: {item.userId}</div>
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'نشط' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                            }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.addedDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push(`/services/${item.serviceId}`)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="عرض الخدمة"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`هل تريد حذف ${item.serviceName} من سلة ${item.userName}؟`)) {
                                  alert(`تم حذف العنصر من السلة`)
                                }
                              }}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="حذف من السلة"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => alert(`تم إرسال تذكير للمستخدم ${item.userName}`)}
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
                  {searchTerm ? 'لم يتم العثور على عناصر تطابق معايير البحث' : 'لا توجد عناصر في سلة المشتريات حالياً'}
                </p>
              </div>
            )}

            {/* View All Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/admin/cart')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                عرض جميع عناصر السلة في صفحة منفصلة ←
              </button>
            </div>
          </div>
        )

      case 'refunds':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">المبالغ المسترجعة</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشتري</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السبب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { id: 1, buyer: 'علي أحمد', amount: 150, reason: 'عدم الرضا', status: 'معالج' },
                    { id: 2, buyer: 'نور فاطمة', amount: 75, reason: 'تأخير', status: 'قيد المعالجة' }
                  ].map((refund) => (
                    <tr key={refund.id}>
                      <td className="px-6 py-4 text-sm font-medium">#{refund.id}</td>
                      <td className="px-6 py-4 text-sm">{refund.buyer}</td>
                      <td className="px-6 py-4 text-sm font-bold text-red-600">${refund.amount}</td>
                      <td className="px-6 py-4 text-sm">{refund.reason}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${refund.status === 'معالج' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {refund.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'financial':
        const monthlyRevenueData = {
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
          data: [25000, 32000, 28000, 35000, 31000, 42000]
        }
        
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">التقارير المالية</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-2">إجمالي الإيرادات</h4>
                <p className="text-3xl font-bold text-green-600">$331,000</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-2">عمولة المنصة</h4>
                <p className="text-3xl font-bold text-blue-600">$66,200</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="font-semibold text-purple-800 mb-2">مدفوعات البائعين</h4>
                <p className="text-3xl font-bold text-purple-600">$264,800</p>
              </div>
            </div>
            <LineChart data={monthlyRevenueData} title="الإيرادات الشهرية" />
          </div>
        )

      case 'payouts':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">إدارة المدفوعات</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">طريقة الدفع</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { seller: 'أحمد محمد', amount: 1250, method: 'PayPal', status: 'معلق' },
                    { seller: 'فاطمة علي', amount: 890, method: 'بنك', status: 'مكتمل' }
                  ].map((payout, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 text-sm font-medium">{payout.seller}</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600">${payout.amount}</td>
                      <td className="px-6 py-4 text-sm">{payout.method}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${payout.status === 'مكتمل' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            if (confirm(`هل تريد معالجة دفعة ${payout.amount}$ للبائع ${payout.seller}؟`)) {
                              alert(`تم معالجة دفعة ${payout.amount}$ للبائع ${payout.seller}`)
                            }
                          }}
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
        )

      case 'commissions':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">إدارة العمولات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="font-semibold mb-4">إعدادات العمولة</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">نسبة العمولة الافتراضية (%)</label>
                    <input type="number" defaultValue="20" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">عمولة البائعين المميزين (%)</label>
                    <input type="number" defaultValue="15" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('هل تريد حفظ إعدادات العمولة؟')) {
                        alert('تم حفظ إعدادات العمولة بنجاح')
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    حفظ الإعدادات
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="font-semibold mb-4">إحصائيات العمولات</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>عمولات هذا الشهر:</span>
                    <span className="font-bold text-green-600">$12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط العمولة:</span>
                    <span className="font-bold">18.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>أعلى عمولة:</span>
                    <span className="font-bold">$2,100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">التحليلات والإحصائيات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="font-semibold mb-4">نمو المستخدمين</h4>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500">رسم بياني لنمو المستخدمين</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="font-semibold mb-4">توزيع الخدمات</h4>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500">رسم دائري لتوزيع الخدمات</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'users':
        const filteredUsers = filterData(users, searchTerm, ['name', 'email', 'type'])
        const paginatedUsers = paginateData(filteredUsers, currentPage, itemsPerPage)

        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث عن مستخدم..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => router.push('/admin/users/create')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  إضافة مستخدم
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">
                    {filteredUsers.length} مستخدم {searchTerm && `(تم العثور عليهم من أصل ${users.length})`}
                  </h4>
                  <div className="text-sm text-gray-500">
                    الصفحة {currentPage} من {Math.ceil(filteredUsers.length / itemsPerPage) || 1}
                  </div>
                </div>
              </div>

              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلبات</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التقييم</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center ml-4">
                            <span className="text-blue-600 font-bold">{user.avatar}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'نشط' ? 'bg-green-100 text-green-800' :
                          user.status === 'معلق' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.orders}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                          <span className="text-sm">{user.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/profile/${user.name}`)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="عرض التفاصيل"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => router.push(`/admin/users/${user.id}/edit`)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="تعديل"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من حذف المستخدم: ${user.name}؟`)) {
                                alert(`تم حذف المستخدم: ${user.name}`)
                              }
                            }}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="حذف"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        {searchTerm ? 'لم يتم العثور على مستخدمين يطابقون البحث' : 'لا توجد مستخدمين'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <Pagination
                totalItems={filteredUsers.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => router.push('/admin/users')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  عرض جميع المستخدمين في صفحة منفصلة ←
                </button>
              </div>
            </div>
          </div>
        )

      case 'all-services':
        const filteredServices = filterData(services, searchTerm, ['title', 'seller', 'category'])
        const paginatedServices = paginateData(filteredServices, currentPage, itemsPerPage)

        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">جميع الخدمات</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في الخدمات..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>جميع الفئات</option>
                  <option>تصميم</option>
                  <option>برمجة</option>
                  <option>كتابة</option>
                </select>
                <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>جميع الحالات</option>
                  <option>معلق</option>
                  <option>مقبول</option>
                  <option>مرفوض</option>
                </select>
              </div>
            </div>

            {/* Services Count and Page Info */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  {filteredServices.length} خدمة {searchTerm && `(تم العثور عليها من أصل ${services.length})`}
                </h4>
                <div className="text-sm text-gray-500">
                  الصفحة {currentPage} من {Math.ceil(filteredServices.length / itemsPerPage) || 1}
                </div>
              </div>
            </div>

            {paginatedServices.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشاهدات</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلبات</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التقييم</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <div className="text-sm font-medium text-gray-900 truncate">{service.title}</div>
                            <div className="text-sm text-gray-500">ID: {service.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{service.seller}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{service.category}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">${service.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{service.views?.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{service.orders}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                            <span className="text-sm">{service.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.status === 'مقبول' ? 'bg-green-100 text-green-800' :
                            service.status === 'معلق' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push(`/services/${service.id}`)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="عرض الخدمة"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => alert(`تم قبول الخدمة: ${service.title}`)}
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                              title="قبول الخدمة"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`هل تريد رفض الخدمة: ${service.title}؟`)) {
                                  alert(`تم رفض الخدمة: ${service.title}`)
                                }
                              }}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="رفض الخدمة"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد خدمات</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'لم يتم العثور على خدمات تطابق معايير البحث' : 'لا توجد خدمات متاحة'}
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                totalItems={filteredServices.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>

            {/* View All Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/admin/services')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                عرض جميع الخدمات في صفحة منفصلة ←
              </button>
            </div>
          </div>
        )

      case 'services':
        const filteredServicesGeneral = filterData(services, searchTerm, ['title', 'seller', 'category'])
        const paginatedServicesGeneral = paginateData(filteredServicesGeneral, currentPage, itemsPerPage)

        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">إدارة الخدمات</h3>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في الخدمات..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>جميع الفئات</option>
                  <option>تصميم</option>
                  <option>برمجة</option>
                  <option>كتابة</option>
                </select>
                <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>جميع الحالات</option>
                  <option>معلق</option>
                  <option>مقبول</option>
                  <option>مرفوض</option>
                </select>
              </div>
            </div>

            {/* Services Count and Page Info */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  {filteredServicesGeneral.length} خدمة {searchTerm && `(تم العثور عليها من أصل ${services.length})`}
                </h4>
                <div className="text-sm text-gray-500">
                  الصفحة {currentPage} من {Math.ceil(filteredServicesGeneral.length / itemsPerPage) || 1}
                </div>
              </div>
            </div>

            {paginatedServicesGeneral.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشاهدات</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلبات</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التقييم</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedServicesGeneral.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <div className="text-sm font-medium text-gray-900 truncate">{service.title}</div>
                            <div className="text-sm text-gray-500">ID: {service.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{service.seller}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{service.category}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">${service.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{service.views?.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{service.orders}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                            <span className="text-sm">{service.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.status === 'مقبول' ? 'bg-green-100 text-green-800' :
                            service.status === 'معلق' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push(`/services/${service.id}`)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="عرض الخدمة"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => alert(`تم قبول الخدمة: ${service.title}`)}
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                              title="قبول الخدمة"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`هل تريد رفض الخدمة: ${service.title}؟`)) {
                                  alert(`تم رفض الخدمة: ${service.title}`)
                                }
                              }}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="رفض الخدمة"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد خدمات</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'لم يتم العثور على خدمات تطابق معايير البحث' : 'لا توجد خدمات متاحة'}
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                totalItems={filteredServicesGeneral.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )

      case 'orders':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">إدارة الطلبات</h3>
              <div className="flex gap-4">
                <select className="px-4 py-2 border rounded-lg">
                  <option>جميع الطلبات</option>
                  <option>قيد التنفيذ</option>
                  <option>مكتمل</option>
                  <option>ملغي</option>
                </select>
                <button
                  onClick={() => {
                    // In a real app, this would generate and download a CSV/Excel file
                    const csvContent = "data:text/csv;charset=utf-8,ID,Service,Buyer,Seller,Amount,Status\n"
                    const encodedUri = encodeURI(csvContent)
                    const link = document.createElement("a")
                    link.setAttribute("href", encodedUri)
                    link.setAttribute("download", "orders_report.csv")
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    alert('تم تصدير تقرير الطلبات بنجاح')
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  تصدير
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشتري</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{order.buyer}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{order.seller}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600">${order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'مكتمل' ? 'bg-green-100 text-green-800' :
                          order.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/orders/${order.id}`)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="عرض التفاصيل"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => router.push(`/messages?order=${order.id}`)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="المراسلة"
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
          </div>
        )

      default:
        return (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">الأنشطة الأخيرة</h4>
                  <button
                    onClick={() => router.push('/admin/analytics')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    عرض المزيد
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { action: 'مستخدم جديد انضم', time: 'منذ 5 دقائق', type: 'success' },
                    { action: 'خدمة جديدة تم نشرها', time: 'منذ 15 دقيقة', type: 'info' },
                    { action: 'طلب تم إكماله', time: 'منذ ساعة', type: 'success' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        {activity.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {activity.type === 'info' && <Package className="h-5 w-5 text-blue-500" />}
                        <span>{activity.action}</span>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">إحصائيات سريعة</h4>
                  <button
                    onClick={() => router.push('/admin/financial')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    التقرير المالي
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">متوسط قيمة الطلب</span>
                    <span className="font-bold">$127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">وقت الاستجابة</span>
                    <span className="font-bold">2.3 ساعة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">معدل الإكمال</span>
                    <span className="font-bold text-green-600">94.2%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold mb-4">إجراءات سريعة</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => router.push('/admin/users')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                >
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <span className="text-sm font-medium">إدارة المستخدمين</span>
                </button>
                <button
                  onClick={() => router.push('/admin/services')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                >
                  <Package className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <span className="text-sm font-medium">إدارة الخدمات</span>
                </button>
                <button
                  onClick={() => router.push('/admin/orders')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                >
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <span className="text-sm font-medium">إدارة الطلبات</span>
                </button>
                <button
                  onClick={() => router.push('/admin/financial')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                >
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <span className="text-sm font-medium">التقارير المالية</span>
                </button>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">إجمالي المستخدمين</p>
              <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">إجمالي الخدمات</p>
              <p className="text-3xl font-bold">{stats.totalServices.toLocaleString()}</p>
            </div>
            <Package className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">إجمالي الأرباح</p>
              <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-12 w-12 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">الطلبات النشطة</p>
              <p className="text-3xl font-bold">{stats.activeOrders.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  )
}