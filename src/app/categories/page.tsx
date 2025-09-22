'use client'

import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import CategoryIcon from '@/components/Icons/CategoryIcon'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { key: 'electrical', name: 'الكهرباء', description: 'إصلاح وصيانة الأعطال الكهربائية', serviceCount: 45 },
    { key: 'plumbing', name: 'السباكة', description: 'إصلاح التسريبات وصيانة الأنابيب', serviceCount: 38 },
    { key: 'hvac', name: 'التكييف والتبريد', description: 'تركيب وصيانة أجهزة التكييف', serviceCount: 52 },
    { key: 'carpentry', name: 'النجارة', description: 'أعمال الخشب والأثاث المخصص', serviceCount: 29 },
    { key: 'security', name: 'كاميرات المراقبة', description: 'تركيب وصيانة أنظمة الأمان', serviceCount: 31 },
    { key: 'construction', name: 'البناء والمقاولات', description: 'أعمال البناء والتشييد', serviceCount: 67 },
    { key: 'gardening', name: 'تنسيق الحدائق', description: 'تصميم وصيانة المساحات الخضراء', serviceCount: 24 },
    { key: 'elevator', name: 'صيانة المصاعد', description: 'صيانة وإصلاح المصاعد والسلالم', serviceCount: 18 },
    { key: 'gypsum', name: 'جبس بورد والديكور', description: 'أعمال الجبس والتشطيبات الداخلية', serviceCount: 35 },
    { key: 'renovation', name: 'الدهان والتشطيبات', description: 'أعمال الطلاء والتشطيبات النهائية', serviceCount: 42 },
    { key: 'moving', name: 'نقل العفش والأثاث', description: 'خدمات النقل والتغليف المحترفة', serviceCount: 26 },
    { key: 'cleaning', name: 'تنظيف المنازل', description: 'خدمات التنظيف الشاملة للمنازل', serviceCount: 33 }
  ]

  const filteredCategories = categories.filter(category =>
    category.name.includes(searchQuery) || category.description.includes(searchQuery)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1e40af] to-[#3b82f6] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center" dir="rtl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            جميع فئات الخدمات
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            اكتشف جميع الخدمات المنزلية المتاحة واختر ما يناسب احتياجاتك
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="ابحث في الفئات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-gray-900 text-right outline-none"
                dir="rtl"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-white transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <a
              key={category.key}
              href={`/services?category=${encodeURIComponent(category.name)}`}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CategoryIcon 
                  categoryKey={category.key} 
                  size="lg" 
                  useExternal={true}
                  showFallback={true}
                  variant="minimal"
                />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors" dir="rtl">
                {category.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 leading-relaxed" dir="rtl">
                {category.description}
              </p>
              
              <div className="text-xs text-blue-600 font-medium">
                {category.serviceCount} خدمة متاحة
              </div>
            </a>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">لا توجد فئات مطابقة</h3>
            <p className="text-gray-600">حاول البحث بكلمات مختلفة</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}