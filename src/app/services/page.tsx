'use client'

import { useState, useEffect } from 'react'
import { MapPin, Star, Clock, Shield, Filter, Search, Heart, ArrowLeft, ChevronDown } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import UnifiedCard from '@/components/UnifiedCard'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'
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
              <a key={service.id} href={`/services/${service.id}`} className="flex-shrink-0 w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden group flex flex-col hover:shadow-lg transition-all duration-300 hover:border-[#1ab7ea]">
                <div className="relative">
                  <Image
                    src={service.images?.[0] || `https://images.pexels.com/photos/${580151 + parseInt(service.id)}/pexels-photo-${580151 + parseInt(service.id)}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt={service.title}
                    width={300}
                    height={170}
                    className="w-full h-[170px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center mb-3">
                    <Image
                      src={user?.avatar || '/img/noavatar.jpg'}
                      alt={user?.fullName || 'أحمد محمد الحرفي'}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="mr-3 text-right">
                      <h3 className="font-semibold text-sm text-gray-800">{user?.fullName || 'أحمد محمد الحرفي'}</h3>
                      <p className="text-xs text-gray-500">{user?.level || 'محترف معتمد'}</p>
                    </div>
                  </div>
                  <a href={`/services/${service.id}`} className="text-gray-800 hover:text-green-500 transition-colors duration-200 text-right font-semibold leading-snug flex-grow">
                    {service.title}
                  </a>
                  <div className="flex items-center mt-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 mr-1 font-bold">
                      {service.rating}
                    </span>
                    <span className="text-xs text-gray-400">({service.totalReviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <button className="text-gray-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="text-left">
                      <span className="text-xs text-gray-500 block">ابتداءً من</span>
                      <div className="font-bold text-gray-800 text-lg">{service.packages?.[0]?.price || 50} ريال</div>
                    </div>
                  </div>
                </div>
              </a>
            )
          }) : (
            // Fallback sample services when no data is loaded
            Array.from({ length: 8 }, (_, index) => {
              const sampleServices = [
                { id: `sample-${index}`, title: 'خدمة صيانة الكهرباء المنزلية', rating: '4.9', totalReviews: 123, price: 150 },
                { id: `sample-${index}`, title: 'إصلاح وصيانة السباكة', rating: '4.8', totalReviews: 89, price: 120 },
                { id: `sample-${index}`, title: 'تركيب وصيانة التكييف', rating: '4.7', totalReviews: 156, price: 200 },
                { id: `sample-${index}`, title: 'أعمال النجارة والأثاث', rating: '4.9', totalReviews: 234, price: 180 },
                { id: `sample-${index}`, title: 'تركيب كاميرات المراقبة', rating: '4.6', totalReviews: 67, price: 300 },
                { id: `sample-${index}`, title: 'أعمال البناء والمقاولات', rating: '4.8', totalReviews: 145, price: 500 },
                { id: `sample-${index}`, title: 'تنسيق وصيانة الحدائق', rating: '4.7', totalReviews: 98, price: 250 },
                { id: `sample-${index}`, title: 'صيانة المصاعد والسلالم', rating: '4.5', totalReviews: 45, price: 400 }
              ]
              const service = sampleServices[index % sampleServices.length]
              return (
                <a key={service.id} href={`/services/${service.id}`} className="flex-shrink-0 w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden group flex flex-col hover:shadow-lg transition-all duration-300 hover:border-[#1ab7ea]">
                  <div className="relative">
                    <Image
                      src={`https://images.pexels.com/photos/${580151 + index}/pexels-photo-${580151 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                      alt={service.title}
                      width={300}
                      height={170}
                      className="w-full h-[170px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center mb-3">
                      <Image
                        src="/img/noavatar.jpg"
                        alt="أحمد محمد الحرفي"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="mr-3 text-right">
                        <h3 className="font-semibold text-sm text-gray-800">أحمد محمد الحرفي</h3>
                        <p className="text-xs text-gray-500">محترف معتمد</p>
                      </div>
                    </div>
                    <a href={`/services/${service.id}`} className="text-gray-800 hover:text-green-500 transition-colors duration-200 text-right font-semibold leading-snug flex-grow">
                      {service.title}
                    </a>
                    <div className="flex items-center mt-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 mr-1 font-bold">{service.rating}</span>
                      <span className="text-xs text-gray-400">({service.totalReviews})</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <button className="text-gray-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className="text-left">
                        <span className="text-xs text-gray-500 block">ابتداءً من</span>
                        <div className="font-bold text-gray-800 text-lg">{service.price} ريال</div>
                      </div>
                    </div>
                  </div>
                </a>
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