
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, Heart, Share2, Flag, Clock, RefreshCw, Check, MessageCircle, Shield, Award, ChevronLeft, ChevronRight, Play, ChevronDown, ChevronUp, User, MapPin, Calendar, Zap, Users, Trophy, CheckCircle } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import UnifiedButton from '@/components/UnifiedButton'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'
import Image from 'next/image'

export default function ServiceDetail() {
  const params = useParams()
  const { services } = useServices()
  const [service, setService] = useState<any>(null)
  const [seller, setSeller] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [reportDetails, setReportDetails] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false)
  const [favoriteMessageText, setFavoriteMessageText] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showFavoriteModal, setShowFavoriteModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(0)

  // Reviews data - Arabic reviews
  const reviews = [
    {
      id: 1,
      user: "أحمد حسن",
      rating: 5,
      date: "منذ أسبوعين",
      comment: "عمل ممتاز! احترافية عالية وتسليم في الوقت المحدد. أنصح بشدة!",
      country: "السعودية"
    },
    {
      id: 2,
      user: "سارة محمد",
      rating: 5,
      date: "منذ شهر", 
      comment: "جودة مذهلة وتواصل رائع طوال فترة المشروع.",
      country: "الإمارات"
    },
    {
      id: 3,
      user: "عمر علي",
      rating: 4,
      date: "منذ شهرين",
      comment: "عمل جيد بشكل عام، احتجت لبعض التعديلات البسيطة لكن البائع كان متعاوناً جداً.",
      country: "مصر"
    }
  ]

  // Remove hardcoded packages - use real data from service
  const packages = service?.packages || []

  useEffect(() => {
    if (params.id && services.length > 0) {
      const foundService = services.find(s => s.id === params.id)
      if (foundService) {
        setService(foundService)
        const sellerData = getUserById(foundService.userId)
        setSeller(sellerData)
      }
    }
  }, [params.id, services])

  const nextImage = () => {
    if (service?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % service.images.length)
    }
  }

  const prevImage = () => {
    if (service?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    setFavoriteMessageText(isFavorite ? 'Removed from favorites' : 'Added to favorites')
    setShowFavoriteModal(true)
    setTimeout(() => setShowFavoriteModal(false), 2000)
  }

  const handleReport = () => {
    setShowReportModal(false)
    setShowSuccessModal(true)
    setTimeout(() => setShowSuccessModal(false), 3000)
  }

  if (!service || !seller) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-green-600">Fiverr</a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <a href="/services" className="hover:text-green-600">Graphics & Design</a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service Details */}
          <div className="lg:col-span-2">
            {/* Service Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {service.title}
            </h1>

            {/* Seller Info */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <Image 
                  src={seller.avatar || "/api/placeholder/48/48"} 
                  alt={seller.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 mr-2">{seller.name}</span>
                  <span className="text-sm text-gray-600">Level 2 Seller</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex items-center mr-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900 ml-1">{seller.rating}</span>
                    <span className="text-sm text-gray-600 ml-1">({seller.reviewCount} reviews)</span>
                  </div>
                  <span className="text-sm text-gray-600">2 Orders in Queue</span>
                </div>
              </div>
            </div>

            {/* Service Images */}
            <div className="relative mb-8">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {service.images && service.images.length > 0 ? (
                  <Image 
                    src={service.images[currentImageIndex]} 
                    alt={service.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              
              {service.images && service.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Image indicators */}
              {service.images && service.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {service.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* About This Gig */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">حول هذه الخدمة</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {service?.description}
                </p>
              </div>
            </div>

            {/* About The Seller */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">حول البائع</h2>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={seller.avatar || "/api/placeholder/64/64"} 
                    alt={seller.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{seller.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{seller.title || "Professional Designer"}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{seller.rating} ({seller.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{seller.location || "Saudi Arabia"}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {seller.bio || "Experienced professional with expertise in design and development. Committed to delivering high-quality work that exceeds client expectations."}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
              <div className="space-y-4">
                {service?.faq?.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-3 text-gray-700 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                التقييمات ({reviews.length})
              </h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.user}</h4>
                            <p className="text-sm text-gray-600">{review.country}</p>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Pricing */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Package Selection */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    {packages.map((pkg, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPackage(index)}
                        className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                          selectedPackage === index
                            ? 'border-green-500 text-green-600 bg-green-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {pkg.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {packages[selectedPackage].name}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${packages[selectedPackage].price}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    وفر حتى 20% مع وقت تسليم أطول
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">وقت التسليم</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {packages[selectedPackage].deliveryTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <RefreshCw className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">التعديلات</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {packages[selectedPackage].revisions}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {packages[selectedPackage].features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                      متابعة (${packages[selectedPackage].price})
                    </button>
                    <button className="w-full border border-green-500 text-green-500 hover:bg-green-50 font-semibold py-3 px-4 rounded-lg transition-colors">
                      تواصل معي
                    </button>
                  </div>
                </div>
              </div>

              {/* Seller Actions */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={toggleFavorite}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isFavorite 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">حفظ</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm font-medium">مشاركة</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Flag className="h-4 w-4" />
                    <span className="text-sm font-medium">إبلاغ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">إبلاغ عن هذه الخدمة</h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  سبب الإبلاغ
                </label>
                <select 
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">اختر السبب</option>
                  <option value="inappropriate">محتوى غير مناسب</option>
                  <option value="spam">رسائل مزعجة</option>
                  <option value="copyright">انتهاك حقوق الطبع والنشر</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تفاصيل إضافية
                </label>
                <textarea 
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="يرجى تقديم المزيد من التفاصيل..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleReport}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  إرسال البلاغ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">تم إرسال البلاغ</h3>
            <p className="text-gray-600 text-sm">
              شكراً لك على البلاغ. سنقوم بمراجعته واتخاذ الإجراء المناسب.
            </p>
          </div>
        </div>
      )}

      {/* Favorite Modal */}
      {showFavoriteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-red-500 fill-current" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{favoriteMessageText}</h3>
            <p className="text-gray-600 text-sm">
              يمكنك عرض الخدمات المحفوظة في قائمة المفضلة.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
