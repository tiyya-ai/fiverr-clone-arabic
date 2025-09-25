
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, Heart, Share2, Flag, Clock, RefreshCw, Check, MessageCircle, Shield, Award, ChevronLeft, ChevronRight, Play, ChevronDown, ChevronUp, User, MapPin, Calendar, Zap, Users, Trophy, CheckCircle } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import UnifiedButton from '@/components/UnifiedButton'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'
import { extractServiceIdFromSlug } from '@/utils/slug'
import Image from 'next/image'

export default function ServiceDetail() {
  const params = useParams()
  const { services } = useServices()
  const [service, setService] = useState<any>(null)
  const [seller, setSeller] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [modalState, setModalState] = useState({
    showReportModal: false,
    showSuccessModal: false,
    showFavoriteModal: false,
    reportReason: '',
    reportDetails: '',
    favoriteMessageText: '',
  })
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
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
      user: "محمد علي",
      rating: 4,
      date: "منذ 3 أسابيع",
      comment: "خدمة ممتازة وسرعة في التنفيذ. راضي جداً عن النتيجة النهائية.",
      country: "الكويت"
    }
  ]

  // Package data
  const packages = [
    {
      name: "الأساسي",
      price: 50,
      deliveryTime: "3 أيام",
      revisions: "2",
      features: ["تصميم أساسي", "ملف مصدر واحد", "دعم فني لمدة أسبوع"]
    },
    {
      name: "المتقدم", 
      price: 100,
      deliveryTime: "5 أيام",
      revisions: "5",
      features: ["تصميم متقدم", "3 ملفات مصدر", "دعم فني لمدة شهر", "تعديلات إضافية"]
    },
    {
      name: "المميز",
      price: 200,
      deliveryTime: "7 أيام", 
      revisions: "غير محدود",
      features: ["تصميم مميز", "ملفات مصدر متعددة", "دعم فني لمدة 3 أشهر", "تعديلات غير محدودة", "استشارة مجانية"]
    }
  ]

  useEffect(() => {
    if (params.slug && services.length > 0) {
      // Extract service ID from slug
      const serviceId = extractServiceIdFromSlug(params.slug as string)
      
      if (serviceId) {
        const foundService = services.find(s => s.id === serviceId)
        if (foundService) {
          setService(foundService)
          const sellerData = getUserById(foundService.userId)
          setSeller(sellerData)
        } else {
          setService(null)
          setSeller(null)
        }
      } else {
        // Fallback: try to find service by treating slug as direct ID
        const foundService = services.find(s => s.id === params.slug)
        if (foundService) {
          setService(foundService)
          const sellerData = getUserById(foundService.userId)
          setSeller(sellerData)
        } else {
          setService(null)
          setSeller(null)
        }
      }
    }
  }, [params.slug, services])

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
    setModalState((prev) => ({
      ...prev,
      favoriteMessageText: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      showFavoriteModal: true,
    }))
    setTimeout(() => setModalState((prev) => ({ ...prev, showFavoriteModal: false })), 2000)
  }

  const handleReport = () => {
    setModalState((prev) => ({
      ...prev,
      showReportModal: false,
      showSuccessModal: true,
    }))
    setTimeout(() => setModalState((prev) => ({ ...prev, showSuccessModal: false })), 3000)
  }

  if (services.length > 0 && !service) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Service not found</p>
            <a href="/services" className="text-blue-600 hover:underline">Browse all services</a>
          </div>
        </div>
        <Footer />
      </div>
    )
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>

            {/* Seller Info */}
            <div className="flex items-center mb-6">
              <Image
                src={seller.avatar || "/api/placeholder/48/48"}
                alt={seller.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 mr-2">{seller.name}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(seller.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm font-semibold text-gray-900 ml-1">{seller.rating}</span>
                    <span className="text-sm text-gray-600 ml-1">({seller.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Images */}
            <div className="relative mb-8">
              {service.images && service.images.length > 0 ? (
                <Image
                  src={service.images[currentImageIndex]}
                  alt={service.title}
                  width={800}
                  height={450}
                  className="w-full h-96 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}

              {/* Navigation arrows */}
              {service.images && service.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Image indicators */}
              {service.images && service.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {service.images.map((_: string, index: number) => (
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
                <Image
                  src={seller.avatar || "/api/placeholder/64/64"}
                  alt={seller.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
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
                {service?.faq?.map((faq: any, index: number) => (
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
                      <div className="px-4 pb-3 text-gray-700">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
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
                          <div className="flex items-center space-x-2">
                            <div className="flex">
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
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex border-b border-gray-200 mb-4">
                  {packages.map((pkg: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPackage(index)}
                      className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        selectedPackage === index
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {pkg.name}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {packages[selectedPackage]?.name || 'Package'}
                  </h3>
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    ${packages[selectedPackage]?.price || 0}
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    وفر حتى 20% مع وقت التسليم الأطول
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">وقت التسليم</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {packages[selectedPackage]?.deliveryTime || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <RefreshCw className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">التعديلات</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {packages[selectedPackage]?.revisions || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {(packages[selectedPackage]?.features || []).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <UnifiedButton
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).addToCart) {
                        const cartItem = {
                          id: service.id,
                          title: service.title,
                          price: packages[selectedPackage]?.price || 0,
                          category: service.category,
                          package: packages[selectedPackage]?.title || 'Basic',
                          seller: seller?.fullName || 'Unknown',
                          image: service.images?.[0] || ''
                        };
                        (window as any).addToCart(cartItem);
                      } else {
                        console.error('addToCart function not available');
                      }
                    }}
                    className="w-full mb-3"
                  >
                    متابعة (${packages[selectedPackage]?.price || 0})
                  </UnifiedButton>
                  
                  <UnifiedButton
                    variant="outline"
                    onClick={() => window.location.href = `/messages?user=${service.userId}`}
                    className="w-full"
                  >
                    تواصل معي
                  </UnifiedButton>
                </div>
              </div>

              {/* Seller Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex space-x-2">
                  <button
                    onClick={toggleFavorite}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isFavorite
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    <span className="text-sm">{isFavorite ? 'محفوظ' : 'حفظ'}</span>
                  </button>
                  
                  <button
                    onClick={() => navigator.share ? navigator.share({title: service.title, url: window.location.href}) : navigator.clipboard.writeText(window.location.href)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">مشاركة</span>
                  </button>
                  
                  <button
                    onClick={() => setModalState((prev) => ({ ...prev, showReportModal: true }))}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Flag className="h-4 w-4" />
                    <span className="text-sm">إبلاغ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {modalState.showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">إبلاغ عن هذه الخدمة</h3>
              <button
                onClick={() => setModalState((prev) => ({ ...prev, showReportModal: false }))}
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
                  value={modalState.reportReason}
                  onChange={(e) => setModalState((prev) => ({ ...prev, reportReason: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  value={modalState.reportDetails}
                  onChange={(e) => setModalState((prev) => ({ ...prev, reportDetails: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="اكتب تفاصيل إضافية هنا..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setModalState((prev) => ({ ...prev, showReportModal: false }))}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleReport}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                إرسال البلاغ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {modalState.showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">تم إرسال البلاغ</h3>
            <p className="text-gray-600">شكراً لك، سنراجع بلاغك في أقرب وقت ممكن.</p>
          </div>
        </div>
      )}

      {/* Favorite Modal */}
      {modalState.showFavoriteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4 fill-current" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{modalState.favoriteMessageText}</h3>
            <p className="text-gray-600">يمكنك عرض خدماتك المحفوظة في قائمة المفضلة.</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
