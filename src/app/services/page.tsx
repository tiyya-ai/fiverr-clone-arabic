'use client'

import { useState, useEffect } from 'react'
import { MapPin, Star, Clock, Shield, Filter, Search, Heart, ArrowLeft, ChevronDown } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import UnifiedCard from '@/components/UnifiedCard'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'
import { sanitizeInput } from '@/utils/sanitize'
import { generateServiceSlug } from '@/utils/slug'
import Image from 'next/image'

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
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4" dir="rtl">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto justify-center"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">تصفية</span>
              </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white w-full"
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
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white w-full"
                  dir="rtl"
                >
                  <option value="">جميع الأسعار</option>
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-sm text-gray-600">{filteredServices.length} خدمة</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white w-full sm:w-auto"
                dir="rtl"
              >
                <option value="recommended">الموصى به</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid - Home Page Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {currentServices.length > 0 ? currentServices.map((service) => {
            const user = getUserById(service.userId)
            return (
              <div key={service.id} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden group flex flex-col hover:shadow-lg hover:border-[#cbd5e1] transition-all duration-300 cursor-pointer" onClick={() => window.location.href = `/services/${generateServiceSlug(service.title, service.id)}`}>
                <div className="relative">
                  <Image
                    src={service.image || `https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt={service.title}
                    width={350}
                    height={180}
                    className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center mb-3">
                    <Image
                      src={user?.avatar || '/img/noavatar.jpg'}
                      alt={user?.fullName || 'مقدم الخدمة'}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="mr-3 flex-1">
                      <div className="flex items-center gap-1">
                        <h3 className="font-bold text-sm text-[#0f172a]">{user?.fullName || 'مقدم الخدمة'}</h3>
                        {user?.isVerified && (
                          <Shield className="h-3 w-3 text-green-500 fill-current" />
                        )}
                      </div>
                    </div>
                  </div>
                  <a href={`/services/${generateServiceSlug(service.title, service.id)}`} className="text-[#0f172a] hover:text-[#1e40af] transition-colors duration-200 text-right font-medium text-base leading-snug flex-grow mb-3 block">
                    {service.title}
                  </a>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 text-[#64748b] ml-1" />
                      <span className="text-sm text-[#64748b]">السعودية</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                      <span className="text-sm text-[#475569] font-bold">
                        {service.rating}
                      </span>
                      <span className="text-xs text-[#64748b] mr-1">({service.totalReviews})</span>
                    </div>
                  </div>
                  <div className="text-right mb-3">
                    <span className="text-sm text-[#64748b]">{service.category || "تصميم وبرمجة"}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#e2e8f0]" dir="rtl">
                    <span className="text-xs text-[#64748b]">ابتداءً من</span>
                    <div className="font-bold text-[#0f172a] text-lg">{service.packages?.[0]?.price || 50} ر.س</div>
                  </div>
                </div>
              </div>
            )
          }) : (
            // Fallback sample services when no data is loaded
            (() => {
              const sampleServices = [
                { id: 'sample-1', title: 'خدمة صيانة الكهرباء المنزلية', rating: '4.9', totalReviews: 123, price: 150, category: 'الكهرباء', seller: 'أحمد محمد الحرفي', avatar: '/img/noavatar.jpg', image: 'https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { id: 'sample-2', title: 'إصلاح وصيانة السباكة', rating: '4.8', totalReviews: 89, price: 120, category: 'السباكة', seller: 'محمد أحمد الحرفي', avatar: '/img/noavatar.jpg', image: 'https://images.pexels.com/photos/580152/pexels-photo-580152.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { id: 'sample-3', title: 'تركيب وصيانة التكييف', rating: '4.7', totalReviews: 156, price: 200, category: 'التكييف والتبريد', seller: 'علي محمد الحرفي', avatar: '/img/noavatar.jpg', image: 'https://images.pexels.com/photos/580153/pexels-photo-580153.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { id: 'sample-4', title: 'أعمال النجارة والأثاث', rating: '4.9', totalReviews: 234, price: 180, category: 'النجارة', seller: 'سعد أحمد الحرفي', avatar: '/img/noavatar.jpg', image: 'https://images.pexels.com/photos/580154/pexels-photo-580154.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { id: 'sample-5', title: 'تركيب كاميرات المراقبة', rating: '4.6', totalReviews: 67, price: 300, category: 'تركيب كاميرات المراقبة', seller: 'خالد محمد الحرفي', avatar: '/img/noavatar.jpg', image: 'https://images.pexels.com/photos/580155/pexels-photo-580155.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { id: 'sample-6', title: 'أعمال البناء والمقاولات', rating: '4.8', totalReviews: 145, price: 500, category: 'البناء والمقاولات', seller: 'عبدالله أحمد الحرفي', avatar: '/img/noavatar.jpg', image: 'https://images.pexels.com/photos/580156/pexels-photo-580156.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { id: 'sample-7', title: 'تنسيق وصيانة الحدائق', rating: '4.7', totalReviews: 98, price: 250, category: 'تنسيق الحدائق', seller: 'فهد محمد الحرفي', avatar: '/img/noavatar.jpg', image: 'https://images.pexels.com/photos/580157/pexels-photo-580157.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { id: 'sample-8', title: 'صيانة المصاعد والسلالم', rating: '4.5', totalReviews: 45, price: 400, category: 'صيانة المصاعد', seller: 'ناصر أحمد الحرفي', avatar: '/img/noavatar.jpg', image: 'https://images.pexels.com/photos/580158/pexels-photo-580158.jpeg?auto=compress&cs=tinysrgb&w=400' }
              ]
              return sampleServices.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden group flex flex-col hover:shadow-lg hover:border-[#cbd5e1] transition-all duration-300 cursor-pointer" onClick={() => window.location.href = `/services/${generateServiceSlug(service.title, service.id)}`}>
                  <div className="relative">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={350}
                      height={180}
                      className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center mb-3">
                      <Image
                        src={service.avatar}
                        alt={service.seller}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="mr-3 flex-1">
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-sm text-[#0f172a]">{service.seller}</h3>
                          <Shield className="h-3 w-3 text-green-500 fill-current" />
                        </div>
                      </div>
                    </div>
                    <a href={`/services/${generateServiceSlug(service.title, service.id)}`} className="text-[#0f172a] hover:text-[#1e40af] transition-colors duration-200 text-right font-medium text-base leading-snug flex-grow mb-3 block">
                      {service.title}
                    </a>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 text-[#64748b] ml-1" />
                        <span className="text-sm text-[#64748b]">السعودية</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                        <span className="text-sm text-[#475569] font-bold">
                          {service.rating}
                        </span>
                        <span className="text-xs text-[#64748b] mr-1">({service.totalReviews})</span>
                      </div>
                    </div>
                    <div className="text-right mb-3">
                      <span className="text-sm text-[#64748b]">{service.category}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#e2e8f0]" dir="rtl">
                      <span className="text-xs text-[#64748b]">ابتداءً من</span>
                      <div className="font-bold text-[#0f172a] text-lg">{service.price} ر.س</div>
                    </div>
                  </div>
                </div>
              ))
            })()
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