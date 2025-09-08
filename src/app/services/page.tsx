'use client'

import { useState, useEffect } from 'react'
import { MapPin, Star, Clock, Shield, Filter, Search, Heart, ArrowLeft, ChevronDown } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import UnifiedCard from '@/components/UnifiedCard'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'

export default function Services() {
  const { services } = useServices()
  const [filteredServices, setFilteredServices] = useState<any[]>([])
  const [userLocation, setUserLocation] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [sortBy, setSortBy] = useState('recommended')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const servicesPerPage = 12

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const city = urlParams.get('city')
    const category = urlParams.get('category')
    
    if (city) setUserLocation(city)
    if (category) setSelectedCategory(category)
    
    // Services loaded from context
  }, [])

  useEffect(() => {
    let filtered = services

    if (selectedCategory) {
      filtered = filtered.filter(service => service.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 

        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredServices(filtered)
    setCurrentPage(1) // Reset to first page on filter change
  }, [selectedCategory, searchQuery, services])

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const categories = ['الكهرباء', 'السباكة', 'التكييف والتبريد', 'النجارة', 'تركيب كاميرات المراقبة']
  const priceRanges = [
    { label: 'أقل من 50 ر.س', value: '0-50' },
    { label: '50-100 ر.س', value: '50-100' },
    { label: '100-200 ر.س', value: '100-200' },
    { label: 'أكثر من 200 ر.س', value: '200+' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      {/* Hero Section */}
      <div className="bg-[#003912] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center" dir="rtl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {selectedCategory || 'خدمات الصيانة المنزلية'}
            </h1>
            <p className="text-xl text-green-100 mb-8">
              اعثر على أفضل المحترفين لجميع احتياجاتك المنزلية
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="flex bg-white rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="ما الخدمة التي تبحث عنها؟"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-6 py-4 text-gray-900 text-right outline-none"
                  dir="rtl"
                />
                <button className="bg-[#1ab7ea] hover:bg-[#0ea5d9] px-8 py-4 text-white font-semibold transition-colors">
                  بحث
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" dir="rtl">
          <a href="/" className="hover:text-[#1ab7ea]">الرئيسية</a>
          <span>/</span>
          <span className="text-gray-700">الخدمات</span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span className="text-gray-700 font-medium">{selectedCategory}</span>
            </>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4" dir="rtl">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">تصفية</span>
            </button>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              dir="rtl"
            >
              <option value="">جميع الفئات</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              dir="rtl"
            >
              <option value="">جميع الأسعار</option>
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{filteredServices.length} خدمة</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              dir="rtl"
            >
              <option value="recommended">الموصى به</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentServices.length > 0 ? currentServices.map((service) => {
            const user = getUserById(service.userId)
            return (
              <UnifiedCard
                key={service.id}
                type="service"
                data={{
                  ...service,
                  cover: service.images?.[0],
                  sellerName: user?.fullName,
                  sellerImg: user?.avatar,
                  price: service.packages?.[0]?.price
                }}
                linkTo={`/services/${service.id}`}
              />
            )
          }) : (
            // Fallback sample services when no data is loaded
            Array.from({ length: 8 }, (_, index) => {
              const sampleServices: any[] = [
                { id: `sample-${index}`, title: 'خدمة صيانة الكهرباء المنزلية', category: 'الكهرباء', rating: '4.9', totalReviews: 123, price: 150 },
                { id: `sample-${index}`, title: 'إصلاح وصيانة السباكة', category: 'السباكة', rating: '4.8', totalReviews: 89, price: 120 },
                { id: `sample-${index}`, title: 'تركيب وصيانة التكييف', category: 'التكييف والتبريد', rating: '4.7', totalReviews: 156, price: 200 },
                { id: `sample-${index}`, title: 'أعمال النجارة والأثاث', category: 'النجارة', rating: '4.9', totalReviews: 234, price: 180 },
                { id: `sample-${index}`, title: 'تركيب كاميرات المراقبة', category: 'تركيب كاميرات المراقبة', rating: '4.6', totalReviews: 67, price: 300 },
                { id: `sample-${index}`, title: 'أعمال البناء والمقاولات', category: 'البناء والمقاولات', rating: '4.8', totalReviews: 145, price: 500 },
                { id: `sample-${index}`, title: 'تنسيق وصيانة الحدائق', category: 'تنسيق الحدائق', rating: '4.7', totalReviews: 98, price: 250 },
                { id: `sample-${index}`, title: 'صيانة المصاعد والسلالم', category: 'صيانة المصاعد', rating: '4.5', totalReviews: 45, price: 400 }
              ]
              const service = sampleServices[index % sampleServices.length]
              return (
                <UnifiedCard
                  key={service.id}
                  type="service"
                  data={{
                    ...service,
                    cover: `https://images.pexels.com/photos/${580151 + index}/pexels-photo-${580151 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`,
                    sellerName: `مقدم الخدمة ${index + 1}`,
                    sellerImg: '/img/noavatar.jpg'
                  }}
                  linkTo={`/services/${service.id}`}
                />
              )
            })
          )}
        </div>
          
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">لا توجد نتائج مطابقة</h3>
            <p className="text-gray-600">حاول تعديل بحثك أو إزالة بعض الفلاتر للعثور على ما تبحث عنه.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                السابق
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i
                if (pageNum > totalPages) return null
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === pageNum 
                        ? 'bg-[#1ab7ea] text-white' 
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                التالي
              </button>
            </nav>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}