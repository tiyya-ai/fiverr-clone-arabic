'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus, Edit, Trash2, Save, X, Search, Eye } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
  description: string
  icon: string
  image?: string // New field for uploaded images
  color: string
  isActive: boolean
  serviceCount: number
  createdAt: string
  updatedAt: string
}

export default function CategoriesManagement() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Initial categories data - All categories from your website
  const initialCategories: Category[] = useMemo(() => [
    {
      id: '1',
      name: 'صيانة الكهرباء',
      description: 'جميع خدمات الصيانة الكهربائية المنزلية والتجارية',
      icon: '⚡',
      color: '#f59e0b',
      isActive: true,
      serviceCount: 145,
      createdAt: '2024-01-15',
      updatedAt: '2024-02-20'
    },
    {
      id: '2',
      name: 'صيانة السباكة',
      description: 'خدمات السباكة وإصلاح الأنابيب والتسريبات',
      icon: '🔧',
      color: '#3b82f6',
      isActive: true,
      serviceCount: 123,
      createdAt: '2024-01-15',
      updatedAt: '2024-02-18'
    },
    {
      id: '3',
      name: 'صيانة التكييف',
      description: 'صيانة وإصلاح أجهزة التكييف والتبريد',
      icon: '❄️',
      color: '#06b6d4',
      isActive: true,
      serviceCount: 98,
      createdAt: '2024-01-15',
      updatedAt: '2024-02-15'
    },
    {
      id: '4',
      name: 'أعمال النجارة',
      description: 'صناعة وإصلاح الأثاث والأعمال الخشبية',
      icon: '🪚',
      color: '#92400e',
      isActive: true,
      serviceCount: 87,
      createdAt: '2024-01-15',
      updatedAt: '2024-02-12'
    },
    {
      id: '5',
      name: 'كاميرات المراقبة',
      description: 'تركيب وصيانة أنظمة المراقبة والأمان',
      icon: '📹',
      color: '#7c3aed',
      isActive: true,
      serviceCount: 76,
      createdAt: '2024-01-15',
      updatedAt: '2024-02-10'
    },
    {
      id: '6',
      name: 'البناء والمقاولات',
      description: 'أعمال البناء والتشييد والمقاولات العامة',
      icon: '🏗️',
      color: '#dc2626',
      isActive: true,
      serviceCount: 134,
      createdAt: '2024-01-15',
      updatedAt: '2024-02-08'
    },
    {
      id: '7',
      name: 'تنسيق الحدائق',
      description: 'تصميم وتنسيق الحدائق والمساحات الخضراء',
      icon: '🌿',
      color: '#16a34a',
      isActive: true,
      serviceCount: 89,
      createdAt: '2024-01-20',
      updatedAt: '2024-02-05'
    },
    {
      id: '8',
      name: 'صيانة المصاعد',
      description: 'صيانة وإصلاح المصاعد والسلالم المتحركة',
      icon: '🛗',
      color: '#6b7280',
      isActive: true,
      serviceCount: 45,
      createdAt: '2024-01-22',
      updatedAt: '2024-02-03'
    },
    {
      id: '9',
      name: 'جبس بورد والديكور',
      description: 'أعمال الجبس بورد والديكورات الداخلية',
      icon: '🎨',
      color: '#ec4899',
      isActive: true,
      serviceCount: 112,
      createdAt: '2024-01-25',
      updatedAt: '2024-02-01'
    },
    {
      id: '10',
      name: 'الدهان والتشطيبات',
      description: 'أعمال الدهان والتشطيبات النهائية',
      icon: '🎨',
      color: '#8b5cf6',
      isActive: true,
      serviceCount: 156,
      createdAt: '2024-01-28',
      updatedAt: '2024-01-30'
    },
    {
      id: '11',
      name: 'نقل العفش',
      description: 'خدمات نقل الأثاث والعفش المنزلي',
      icon: '📦',
      color: '#f97316',
      isActive: true,
      serviceCount: 78,
      createdAt: '2024-02-01',
      updatedAt: '2024-02-15'
    },
    {
      id: '12',
      name: 'تنظيف المنازل',
      description: 'خدمات التنظيف الشامل للمنازل والمكاتب',
      icon: '🧽',
      color: '#06b6d4',
      isActive: true,
      serviceCount: 203,
      createdAt: '2024-02-05',
      updatedAt: '2024-02-18'
    }
  ], [])

  const [newCategory, setNewCategory] = useState<Omit<Category, 'id' | 'serviceCount' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    icon: '',
    image: '',
    color: '#16a34a',
    isActive: true
  })

    useEffect(() => {
    // Check admin access
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
      return
    }

    // Load categories from localStorage or use initial data
    const savedCategories = localStorage.getItem('adminCategories')
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    } else {
      setCategories(initialCategories)
      localStorage.setItem('adminCategories', JSON.stringify(initialCategories))
    }
    setLoading(false)
  }, [router, initialCategories])

  const saveCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories)
    localStorage.setItem('adminCategories', JSON.stringify(updatedCategories))
  }

  // Image upload handler
  const handleImageUpload = (file: File, isEditing: boolean = false) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        if (isEditing && editingCategory) {
          setEditingCategory(prev => prev ? ({ ...prev, image: imageUrl }) : null)
        } else {
          setNewCategory(prev => ({ ...prev, image: imageUrl }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return

    const category: Category = {
      ...newCategory,
      id: Date.now().toString(),
      serviceCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    const updatedCategories = [...categories, category]
    saveCategories(updatedCategories)
    
    setNewCategory({
      name: '',
      description: '',
      icon: '',
      image: '',
      color: '#16a34a',
      isActive: true
    })
    setShowAddModal(false)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory) return

    const updatedCategories = categories.map(cat =>
      cat.id === editingCategory.id
        ? { ...editingCategory, updatedAt: new Date().toISOString().split('T')[0] }
        : cat
    )
    
    saveCategories(updatedCategories)
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
      const updatedCategories = categories.filter(cat => cat.id !== id)
      saveCategories(updatedCategories)
    }
  }

  const handleToggleActive = (id: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === id
        ? { ...cat, isActive: !cat.isActive, updatedAt: new Date().toISOString().split('T')[0] }
        : cat
    )
    saveCategories(updatedCategories)
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination helper functions
  const paginateData = (data: any[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  const paginatedCategories = paginateData(filteredCategories, currentPage, itemsPerPage)

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
          عرض {((currentPage - 1) * itemsPerPage) + 1} إلى {Math.min(currentPage * itemsPerPage, totalItems)} من {totalItems} فئة
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
                    ? 'bg-green-600 text-white'
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          إضافة فئة جديدة
        </button>
      </div>

        {/* Search and Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في الفئات..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              dir="rtl"
            />
          </div>
          <div className="text-sm text-gray-500">
            {filteredCategories.length} فئة {searchQuery && `(من أصل ${categories.length})`}
          </div>
        </div>

        {/* Categories Table */}
        {paginatedCategories.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الوصف</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد الخدمات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">آخر تحديث</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden ml-3 flex-shrink-0">
                          {category.image ? (
                            <Image 
                              src={category.image} 
                              alt={category.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center text-xl"
                              style={{ backgroundColor: category.color + '20' }}
                            >
                              {category.icon}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500">ID: {category.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={category.description}>
                        {category.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {category.serviceCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(category.id)}
                          className={`w-8 h-5 rounded-full transition-colors ${
                            category.isActive ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                            category.isActive ? 'translate-x-4' : 'translate-x-1'
                          }`} />
                        </button>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {category.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {category.updatedAt}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="تعديل الفئة"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
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
            <div className="text-gray-400 text-6xl mb-4">📂</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد فئات</h3>
            <p className="text-gray-600">
              {searchQuery ? 'لم يتم العثور على فئات تطابق البحث' : 'لا توجد فئات متاحة'}
            </p>
          </div>
        )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900" dir="rtl">إضافة فئة جديدة</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم الفئة</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  dir="rtl"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">صورة الفئة</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                    {newCategory.image ? (
                      <Image 
                        src={newCategory.image} 
                        alt="Preview"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: newCategory.color + '20' }}
                      >
                        {newCategory.icon || '📁'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file, false)
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">اختر صورة للفئة (اختياري)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة (نص)</label>
                  <input
                    type="text"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="⚡"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-center text-2xl"
                  />
                  <p className="text-xs text-gray-500 mt-1">أيقونة نصية كبديل للصورة</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللون</label>
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">لون خلفية الأيقونة</p>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={newCategory.isActive}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="mr-2 block text-sm text-gray-900">
                  فئة نشطة
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddCategory}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900" dir="rtl">تعديل الفئة</h2>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم الفئة</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  dir="rtl"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">صورة الفئة</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                    {editingCategory.image ? (
                      <Image 
                        src={editingCategory.image} 
                        alt="Preview"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: editingCategory.color + '20' }}
                      >
                        {editingCategory.icon || '📁'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file, true)
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">اختر صورة جديدة للفئة (اختياري)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة (نص)</label>
                  <input
                    type="text"
                    value={editingCategory.icon}
                    onChange={(e) => setEditingCategory(prev => prev ? ({ ...prev, icon: e.target.value }) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-center text-2xl"
                  />
                  <p className="text-xs text-gray-500 mt-1">أيقونة نصية كبديل للصورة</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللون</label>
                  <input
                    type="color"
                    value={editingCategory.color}
                    onChange={(e) => setEditingCategory(prev => prev ? ({ ...prev, color: e.target.value }) : null)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">لون خلفية الأيقونة</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingCategory(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                إلغاء
              </button>
              <button
                onClick={handleUpdateCategory}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
