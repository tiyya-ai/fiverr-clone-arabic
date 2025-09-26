'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Plus, X, Upload } from 'lucide-react'

export default function CreateServicePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    images: [],
    packages: [
      { type: 'BASIC', title: 'الباقة الأساسية', price: 50, deliveryTime: 3, revisions: 1, features: [''] },
      { type: 'STANDARD', title: 'الباقة المتقدمة', price: 100, deliveryTime: 5, revisions: 3, features: [''] },
      { type: 'PREMIUM', title: 'الباقة المميزة', price: 200, deliveryTime: 7, revisions: 5, features: [''] }
    ]
  })

  const categories = [
    'الكهرباء',
    'السباكة', 
    'التكييف والتبريد',
    'النجارة',
    'تركيب كاميرات المراقبة',
    'البناء والمقاولات',
    'الحدادة والألمنيوم',
    'الدهان والتشطيبات',
    'تنسيق الحدائق',
    'صيانة عامة'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save service logic here
    alert('تم إنشاء الخدمة بنجاح!')
    router.push('/dashboard/services')
  }

  const addFeature = (packageIndex: number) => {
    const newPackages = [...formData.packages]
    newPackages[packageIndex].features.push('')
    setFormData({ ...formData, packages: newPackages })
  }

  const updateFeature = (packageIndex: number, featureIndex: number, value: string) => {
    const newPackages = [...formData.packages]
    newPackages[packageIndex].features[featureIndex] = value
    setFormData({ ...formData, packages: newPackages })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" dir="rtl">إنشاء خدمة جديدة</h1>
          <p className="text-gray-600 text-sm sm:text-base" dir="rtl">أضف خدمتك وابدأ في كسب المال</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4" dir="rtl">المعلومات الأساسية</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div dir="rtl">
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الخدمة</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                  placeholder="مثال: تصميم شعار احترافي لشركتك"
                  required
                />
              </div>

              <div dir="rtl">
                <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                  required
                >
                  <option value="">اختر الفئة</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div dir="rtl">
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف الخدمة</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                  placeholder="اكتب وصفاً مفصلاً عن خدمتك..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4" dir="rtl">تسعير الخدمة ومناطق العمل</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {formData.packages.map((pkg, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3" dir="rtl">{pkg.title}</h3>
                  
                  <div className="space-y-3">
                    <div dir="rtl">
                      <label className="block text-xs text-gray-600 mb-1">السعر (ر.س)</label>
                      <input
                        type="number"
                        value={pkg.price}
                        onChange={(e) => {
                          const newPackages = [...formData.packages]
                          newPackages[index].price = parseInt(e.target.value)
                          setFormData({...formData, packages: newPackages})
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right text-sm"
                      />
                    </div>

                    <div dir="rtl">
                      <label className="block text-xs text-gray-600 mb-1">مدة التسليم (أيام)</label>
                      <input
                        type="number"
                        value={pkg.deliveryTime}
                        onChange={(e) => {
                          const newPackages = [...formData.packages]
                          newPackages[index].deliveryTime = parseInt(e.target.value)
                          setFormData({...formData, packages: newPackages})
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right text-sm"
                      />
                    </div>

                    <div dir="rtl">
                      <label className="block text-xs text-gray-600 mb-1">المراجعات</label>
                      <input
                        type="number"
                        value={pkg.revisions}
                        onChange={(e) => {
                          const newPackages = [...formData.packages]
                          newPackages[index].revisions = parseInt(e.target.value)
                          setFormData({...formData, packages: newPackages})
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right text-sm"
                      />
                    </div>

                    <div dir="rtl">
                      <label className="block text-xs text-gray-600 mb-1">المميزات</label>
                      {pkg.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, fIndex, e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                            placeholder="مميزة الباقة"
                          />
                          {pkg.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newPackages = [...formData.packages]
                                newPackages[index].features.splice(fIndex, 1)
                                setFormData({...formData, packages: newPackages})
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addFeature(index)}
                        className="text-[#1ab7ea] hover:text-[#0ea5d9] text-sm flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        إضافة مميزة
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#1ab7ea] text-white rounded-lg hover:bg-[#0ea5d9]"
            >
              إنشاء الخدمة
            </button>
          </div>
        </form>
      </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}