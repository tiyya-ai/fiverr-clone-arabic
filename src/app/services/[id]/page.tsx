
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, Heart, Share2, Flag, Clock, RefreshCw, Check, MessageCircle, Shield, Award, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import UnifiedButton from '@/components/UnifiedButton'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'
import Image from 'next/image';

export default function ServiceDetail() {
  const params = useParams()
  const { services } = useServices()
  const [service, setService] = useState<any>(null)
  const [seller, setSeller] = useState<any>(null)
  const [selectedPackage, setSelectedPackage] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const serviceId = params.id
    const foundService = services.find(s => s.id === serviceId)
    if (foundService) {
      setService(foundService)
      const sellerData = getUserById(foundService.userId)
      setSeller(sellerData)
    }
  }, [params.id, services])

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ab7ea] mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل تفاصيل الخدمة...</p>
          </div>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length)
  }

  const addToCart = () => {
    if (typeof window !== 'undefined' && (window as any).addToCart) {
      const selectedPkg = service.packages[selectedPackage]
      ;(window as any).addToCart({
        id: service.id,
        title: service.title,
        category: service.category,
        price: selectedPkg.price,
        package: selectedPkg.name,
        seller: seller?.fullName,
        image: service.images[0]
      })
    }
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    const message = !isFavorite ? 'تم إضافة الخدمة للمفضلة' : 'تم إزالة الخدمة من المفضلة'
    alert(message)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: service.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('تم نسخ رابط الخدمة')
    }
  }

  const handleReport = () => {
    const reason = prompt('يرجى ذكر سبب الإبلاغ:')
    if (reason) {
      alert('تم إرسال البلاغ بنجاح. سيتم مراجعته من قبل فريقنا.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" dir="rtl">
          <a href="/" className="hover:text-[#1ab7ea]">الرئيسية</a>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <a href="/services" className="hover:text-[#1ab7ea]">الخدمات</a>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span className="text-gray-700">{service.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Service Title */}
            <div className="mb-6" dir="rtl">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 text-right leading-tight">
                {service.title}
              </h1>
              
              {/* Seller Info */}
              <div className="mb-4 text-right">
                <h3 className="text-lg font-bold text-gray-900">أحمد محمد الحرفي</h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleFavorite}
                  className={`flex items-center gap-2 transition-colors ${
                    isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span className="text-sm">إضافة للمفضلة</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#1ab7ea] transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">مشاركة</span>
                </button>
                <button 
                  onClick={handleReport}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Flag className="h-5 w-5" />
                  <span className="text-sm">إبلاغ</span>
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4">
                <Image 
                  src={service.images[currentImageIndex]} 
                  alt={service.title}
                  width={800}
                  height={600}
                  className="w-full h-96 object-cover"
                />
                
                {service.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Video Play Button */}
                <button 
                  onClick={() => setShowVideoModal(true)}
                  className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                >
                  <Play className="h-6 w-6" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              {service.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {service.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? 'border-[#1ab7ea]' : 'border-gray-200'
                      }`}
                    >
                      <Image src={image} alt="" width={80} height={80} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About This Service */}
            <div className="mb-8" dir="rtl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-right">حول هذه الخدمة</h2>
              <div className="prose prose-gray max-w-none text-right">
                <p className="text-gray-700 leading-relaxed">
                  {service.description || 'سأقوم بتقديم خدمة احترافية عالية الجودة تلبي احتياجاتك وتتجاوز توقعاتك. أتمتع بخبرة واسعة في هذا المجال وأضمن لك النتائج المرضية في الوقت المحدد.'}
                </p>
              </div>
            </div>

            {/* About The Seller */}
            <div className="mb-8" dir="rtl">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">حول مقدم الخدمة</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Image 
                    src={seller?.avatar || '/img/noavatar.jpg'} 
                    alt={seller?.fullName}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1 text-right">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{seller?.fullName}</h3>
                    <p className="text-gray-600 mb-3">{seller?.title || 'مقدم خدمات محترف'}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-bold">{service.rating}</span>
                        <span className="text-gray-500">({service.totalReviews})</span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600">{service.totalOrders} طلب مكتمل</span>
                    </div>
                    <UnifiedButton variant="outline" size="small">
                      تواصل معي
                    </UnifiedButton>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-right">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">من</div>
                    <div className="font-semibold">{seller?.country || 'المملكة العربية السعودية'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">عضو منذ</div>
                    <div className="font-semibold">يناير 2024</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">متوسط وقت الرد</div>
                    <div className="font-semibold">ساعة واحدة</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">آخر تسليم</div>
                    <div className="font-semibold">يوم واحد</div>
                  </div>
                </div>

                <hr className="my-6" />
                <p className="text-gray-700 text-right leading-relaxed">
                  {seller?.bio || 'مقدم خدمات محترف مع سنوات من الخبرة في تقديم حلول عالية الجودة للعملاء. أسعى دائماً لتحقيق أفضل النتائج وتجاوز توقعات العملاء.'}
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-8" dir="rtl">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-right">التقييمات ({service.totalReviews})</h2>
              
              {/* Reviews Summary */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-1">{service.rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">{service.totalReviews} تقييم</div>
                  </div>
                  
                  <div className="flex-1">
                    {[5,4,3,2,1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3 mb-2">
                        <span className="text-sm w-8">{rating} نجوم</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {[1,2,3].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-6">
                    <div className="flex items-start gap-4">
                      <Image 
                        src="/img/noavatar.jpg" 
                        alt="مراجع"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 text-right">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">أحمد محمد</h4>
                            <div className="flex items-center gap-1">
                              {[1,2,3,4,5].map((star) => (
                                <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">منذ أسبوع</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          خدمة ممتازة وجودة عالية. تم التسليم في الوقت المحدد والنتيجة فاقت توقعاتي. أنصح بالتعامل مع هذا المقدم.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Package Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Package Tabs */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="flex border-b border-gray-200">
                  {service.packages?.map((pkg: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPackage(index)}
                      className={`flex-1 py-3 px-2 text-xs font-medium transition-colors ${
                        selectedPackage === index 
                          ? 'bg-[#1ab7ea] text-white' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pkg?.name || ['أساسي', 'متقدم', 'مميز'][index]}
                    </button>
                  )) || [
                    <button key={0} onClick={() => setSelectedPackage(0)} className="flex-1 py-3 px-2 text-xs font-medium bg-[#1ab7ea] text-white">أساسي</button>,
                    <button key={1} onClick={() => setSelectedPackage(1)} className="flex-1 py-3 px-2 text-xs font-medium bg-gray-50 text-gray-700 hover:bg-gray-100">متقدم</button>,
                    <button key={2} onClick={() => setSelectedPackage(2)} className="flex-1 py-3 px-2 text-xs font-medium bg-gray-50 text-gray-700 hover:bg-gray-100">مميز</button>
                  ]}
                </div>

                <div className="p-6" dir="rtl">
                  {(() => {
                    const packages = service.packages || [
                      { name: 'أساسي', price: 50, description: 'خدمة أساسية عالية الجودة', deliveryTime: 3, revisions: 2, features: ['تصميم احترافي', 'تسليم سريع'] },
                      { name: 'متقدم', price: 100, description: 'خدمة متقدمة مع مميزات إضافية', deliveryTime: 5, revisions: 3, features: ['تصميم احترافي', 'تسليم سريع', 'مراجعات إضافية'] },
                      { name: 'مميز', price: 200, description: 'خدمة مميزة شاملة', deliveryTime: 7, revisions: 5, features: ['تصميم احترافي', 'تسليم سريع', 'مراجعات إضافية', 'دعم مجاني'] }
                    ]
                    const pkg = packages[selectedPackage] || packages[0]
                    return (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">{pkg.price} ريال</div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-6 text-right leading-relaxed">
                          {pkg.description}
                        </p>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{pkg.deliveryTime} أيام تسليم</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <RefreshCw className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{pkg.revisions} مراجعات</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          {pkg.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center gap-3">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <UnifiedButton 
                            variant="primary" 
                            className="w-full"
                            onClick={addToCart}
                          >
                            متابعة ({pkg.price} ريال)
                          </UnifiedButton>
                          
                          <UnifiedButton variant="outline" className="w-full">
                            <div className="inline-flex items-center gap-2" dir="rtl">
                              <span>تواصل مع البائع</span>
                              <MessageCircle className="h-4 w-4" />
                            </div>
                          </UnifiedButton>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Shield className="h-4 w-4" />
                            <span>حماية الأموال حتى التسليم</span>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-black rounded-lg overflow-hidden">
              <video 
                controls 
                autoPlay
                className="w-full h-auto"
                poster={service.images[0]}
              >
                <source src="/sample-video.mp4" type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
