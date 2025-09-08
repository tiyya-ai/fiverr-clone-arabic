'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, Package, Eye, TrendingUp, Users } from 'lucide-react'
import Image from 'next/image';

interface Category {
  id: string
  name: string
  description: string
  icon: string
  image?: string
  color: string
  isActive: boolean
  serviceCount: number
  createdAt: string
  updatedAt: string
}

export default function AdminCategoryDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id as string
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock services data for this category
  const mockServices = [
    {
      id: '1',
      title: 'تصميم شعار احترافي',
      seller: 'محمد أحمد',
      price: 150,
      rating: 4.8,
      orders: 45,
      status: 'نشط'
    },
    {
      id: '2',
      title: 'تطوير موقع إلكتروني',
      seller: 'فاطمة علي',
      price: 500,
      rating: 4.9,
      orders: 23,
      status: 'نشط'
    },
    {
      id: '3',
      title: 'كتابة محتوى تسويقي',
      seller: 'أحمد محمود',
      price: 75,
      rating: 4.7,
      orders: 67,
      status: 'معلق'
    }
  ]

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
      return
    }

    // Load categories from localStorage
    const savedCategories = localStorage.getItem('adminCategories')
    if (savedCategories) {
      const categories = JSON.parse(savedCategories)
      const foundCategory = categories.find((cat: Category) => cat.id === categoryId)
      setCategory(foundCategory || null)
    }
    setLoading(false)
  }, [router, categoryId])

  const handleEditCategory = () => {
    router.push(`/admin/categories/${categoryId}/edit`)
  }

  const handleDeleteCategory = () => {
    if (confirm(`هل أنت متأكد من حذف الفئة: ${category?.name}؟`)) {
      // Remove from localStorage
      const savedCategories = localStorage.getItem('adminCategories')
      if (savedCategories) {
        const categories = JSON.parse(savedCategories)
        const updatedCategories = categories.filter((cat: Category) => cat.id !== categoryId)
        localStorage.setItem('adminCategories', JSON.stringify(updatedCategories))
      }
      alert(`تم حذف الفئة: ${category?.name}`)
      router.push('/admin/categories')
    }
  }

  const handleToggleStatus = () => {
    if (!category) return
    
    const updatedCategory = { ...category, isActive: !category.isActive }
    setCategory(updatedCategory)
    
    // Update in localStorage
    const savedCategories = localStorage.getItem('adminCategories')
    if (savedCategories) {
      const categories = JSON.parse(savedCategories)
      const updatedCategories = categories.map((cat: Category) =>
        cat.id === categoryId ? updatedCategory : cat
      )
      localStorage.setItem('adminCategories', JSON.stringify(updatedCategories))
    }
    
    alert(`تم ${updatedCategory.isActive ? 'تفعيل' : 'إلغاء تفعيل'} الفئة`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">الفئة غير موجودة</h2>
        <p className="text-gray-600 mb-6">لم يتم العثور على الفئة المطلوبة</p>
        <button
          onClick={() => router.push('/admin/categories')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          العودة إلى قائمة الفئات
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/categories')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">تفاصيل الفئة</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleEditCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            تعديل
          </button>
          <button
            onClick={handleDeleteCategory}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            حذف
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden mx-auto mb-4">
                {category.image ? (
                  <Image 
                    src={category.image} 
                    alt={category.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center text-4xl"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    {category.icon}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{category.description}</p>
              <div className="mt-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {category.isActive ? 'نشط' : 'غير نشط'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">معرف الفئة:</span>
                <span className="font-medium">{category.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">عدد الخدمات:</span>
                <span className="font-bold text-blue-600">{category.serviceCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">تاريخ الإنشاء:</span>
                <span className="font-medium">{category.createdAt}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">آخر تحديث:</span>
                <span className="font-medium">{category.updatedAt}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">اللون:</span>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="font-medium">{category.color}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button
                onClick={handleToggleStatus}
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  category.isActive 
                    ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {category.isActive ? 'إلغاء تفعيل الفئة' : 'تفعيل الفئة'}
              </button>
            </div>
          </div>
        </div>

        {/* Category Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">إجمالي الخدمات</p>
                  <p className="text-2xl font-bold text-blue-600">{category.serviceCount}</p>
                </div>
                <Package className="h-10 w-10 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">الخدمات النشطة</p>
                  <p className="text-2xl font-bold text-green-600">{Math.floor(category.serviceCount * 0.8)}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">البائعين</p>
                  <p className="text-2xl font-bold text-purple-600">{Math.floor(category.serviceCount * 0.6)}</p>
                </div>
                <Users className="h-10 w-10 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Services in this Category */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">الخدمات في هذه الفئة</h3>
              <button
                onClick={() => router.push(`/admin/services?category=${category.name}`)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                عرض الكل
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمة</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">البائع</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">التقييم</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلبات</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {service.title}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{service.seller}</td>
                      <td className="px-4 py-4 text-sm font-bold text-green-600">${service.price}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{service.rating}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{service.orders}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => router.push(`/services/${service.id}`)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="عرض الخدمة"
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

          {/* Category Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء الفئة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">إحصائيات الشهر الحالي</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">خدمات جديدة:</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">طلبات جديدة:</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">إجمالي المبيعات:</span>
                    <span className="font-medium text-green-600">$12,450</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">مقارنة بالشهر السابق</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">نمو الخدمات:</span>
                    <span className="font-medium text-green-600">+15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">نمو الطلبات:</span>
                    <span className="font-medium text-green-600">+23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">نمو المبيعات:</span>
                    <span className="font-medium text-green-600">+18%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}