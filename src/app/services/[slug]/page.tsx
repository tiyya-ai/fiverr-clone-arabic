'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, CheckCircle, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import UnifiedButton from '@/components/UnifiedButton'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'
import { useCart } from '@/context/CartContext'
import { generateServiceSlug } from '@/utils/slug'
import Image from 'next/image'

export default function ServiceDetail() {
  const params = useParams()
  const { services } = useServices()
  const [service, setService] = useState<any>(null)
  const [seller, setSeller] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState(0)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { addToCart } = useCart()

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

  const packages = service?.packages || [
    { title: "الأساسي", price: 50, deliveryTime: 3, revisions: 2, features: ["تصميم أساسي", "ملف مصدر واحد", "دعم فني لمدة أسبوع"] },
    { title: "المتقدم", price: 100, deliveryTime: 5, revisions: 5, features: ["تصميم متقدم", "3 ملفات مصدر", "دعم فني لمدة شهر", "تعديلات إضافية"] },
    { title: "المميز", price: 200, deliveryTime: 7, revisions: 999, features: ["تصميم مميز", "ملفات مصدر متعددة", "دعم فني لمدة 3 أشهر", "تعديلات غير محدودة", "استشارة مجانية"] }
  ]

  useEffect(() => {
    console.log('Debug - params.slug:', params.slug)
    console.log('Debug - services:', services)
    
    if (params.slug && services.length > 0) {
      let foundService = services.find(s => s.id === params.slug)
      console.log('Debug - foundService by direct ID:', foundService)
      
      if (!foundService && typeof params.slug === 'string') {
        const idMatch = params.slug.match(/-([0-9]+)$/)
        console.log('Debug - idMatch:', idMatch)
        if (idMatch) {
          const extractedId = idMatch[1]
          console.log('Debug - extractedId:', extractedId)
          foundService = services.find(s => s.id === extractedId)
          console.log('Debug - foundService by extracted ID:', foundService)
        }
      }
      
      if (foundService) {
        console.log('Debug - Setting service:', foundService)
        setService(foundService)
        const sellerData = getUserById(foundService.userId)
        console.log('Debug - Setting seller:', sellerData)
        setSeller(sellerData)
      } else {
        console.log('Debug - No service found')
      }
    } else {
      console.log('Debug - No params.slug or no services')
    }
  }, [params.slug, services])

  if (!service || !seller) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">الرئيسية</a>
            <span className="mx-2">/</span>
            <a href="/services" className="hover:text-blue-600">الخدمات</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{service.category}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">{service.title}</h1>
            </div>

            {/* Service Gallery */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="relative">
                {service.images && service.images.length > 0 ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      src={service.images[currentImageIndex]}
                      alt={service.title}
                      width={800}
                      height={400}
                      className="w-full h-80 object-cover"
                    />
                    
                    {service.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % service.images.length)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {service.images.map((_: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">لا توجد صور متاحة</span>
                  </div>
                )}
              </div>
            </div>

            {/* About Service */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4" dir="rtl">وصف الخدمة</h2>
              <p className="text-gray-700 leading-relaxed" dir="rtl">{service.description}</p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6" dir="rtl">التقييمات ({reviews.length})</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{review.user}</h4>
                            <span className="text-sm text-gray-600">•</span>
                            <p className="text-sm text-gray-600">{review.country}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-700" dir="rtl">{review.comment}</p>
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
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Package Tabs */}
                <div className="flex border-b">
                  {packages.map((pkg: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPackage(index)}
                      className={`flex-1 py-3 px-4 text-sm font-medium ${
                        selectedPackage === index
                          ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {pkg.title}
                    </button>
                  ))}
                </div>

                {/* Package Details */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {packages[selectedPackage].price} ر.س
                    </div>
                    <div className="text-sm text-gray-600">
                      التسليم في {packages[selectedPackage].deliveryTime} يوم
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {packages[selectedPackage].features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                        <span dir="rtl">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        const cartItem = {
                          id: Date.now(),
                          title: service.title,
                          seller: seller.fullName,
                          package: packages[selectedPackage].title,
                          price: packages[selectedPackage].price,
                          quantity: 1,
                          image: service.images[0] || '/api/placeholder/60/60'
                        }
                        addToCart(cartItem)
                        setShowCartModal(true)
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      اطلب الآن ({packages[selectedPackage].price} ر.س)
                    </button>
                    <UnifiedButton 
                      variant="outline" 
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium"
                      onClick={() => setShowContactModal(true)}
                    >
                      تواصل مع البائع
                    </UnifiedButton>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="border-t p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={seller.avatar || "/api/placeholder/40/40"}
                      alt={seller.fullName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="mr-3">
                      <h4 className="text-sm font-medium">{seller.fullName}</h4>
                      <p className="text-xs text-gray-600">{seller.level}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                      <div className="text-sm font-medium">التسليم</div>
                      <div className="text-xs text-gray-600">3-7 أيام</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                      <div className="text-sm font-medium">التقييم</div>
                      <div className="text-xs text-gray-600">{seller.rating}/5</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
                      <div className="text-sm font-medium">المبيعات</div>
                      <div className="text-xs text-gray-600">{seller.totalSales}+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Services */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8" dir="rtl">خدمات ذات صلة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.filter(s => s.category === service.category && s.id !== service.id).slice(0, 4).map((relatedService) => {
            const relatedSeller = getUserById(relatedService.userId)
            return (
              <div key={relatedService.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                <a href={`/services/${generateServiceSlug(relatedService.title, relatedService.id)}`} className="block">
                  <div className="relative">
                    <Image
                      src={relatedService.images[0] || '/api/placeholder/300/180'}
                      alt={relatedService.title}
                      width={300}
                      height={180}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <Image
                        src={relatedSeller?.avatar || '/api/placeholder/24/24'}
                        alt={relatedSeller?.fullName || ''}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600 mr-2">{relatedSeller?.fullName}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-right" dir="rtl">
                      {relatedService.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 mr-1">{relatedService.rating}</span>
                        <span className="text-xs text-gray-500 mr-1">({relatedService.totalReviews})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">ابتداءاً من</span>
                        <div className="font-bold text-gray-900">{relatedService.packages[0]?.price} ر.س</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
        
        {services.filter(s => s.category === service.category && s.id !== service.id).length > 4 && (
          <div className="text-center mt-8">
            <a
              href={`/services?category=${encodeURIComponent(service.category)}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              عرض المزيد من {service.category}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>

      <Footer />

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" dir="rtl">إضافة إلى السلة</h2>
              <button onClick={() => setShowCartModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Image
                  src={service.images[0] || '/api/placeholder/80/80'}
                  alt={service.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="mr-4 flex-1">
                  <h3 className="font-semibold text-sm" dir="rtl">{service.title}</h3>
                  <p className="text-sm text-gray-600" dir="rtl">{packages[selectedPackage].title}</p>
                  <p className="text-lg font-bold text-blue-600">{packages[selectedPackage].price} ر.س</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <a 
                  href="/checkout"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-center"
                >
                  متابعة الطلب
                </a>
                <button 
                  onClick={() => setShowCartModal(false)}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors"
                >
                  متابعة التسوق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Seller Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" dir="rtl">تواصل مع البائع</h2>
              <button onClick={() => setShowContactModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Image
                  src={seller.avatar || "/api/placeholder/50/50"}
                  alt={seller.fullName}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="mr-3">
                  <h3 className="font-semibold" dir="rtl">{seller.fullName}</h3>
                  <p className="text-sm text-gray-600" dir="rtl">{seller.level}</p>
                </div>
              </div>
              
              <form className="space-y-4">
                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    موضوع الرسالة
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    placeholder="موضوع الرسالة"
                  />
                </div>
                
                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرسالة
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowContactModal(false)
                      setShowSuccessModal(true)
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    إرسال
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2" dir="rtl">تم إرسال الرسالة بنجاح!</h3>
              <p className="text-gray-600" dir="rtl">سيتم الرد عليك في أقرب وقت</p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              حسناً
            </button>
          </div>
        </div>
      )}
    </div>
  )
}