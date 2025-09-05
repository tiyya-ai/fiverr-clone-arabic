'use client'

import { useState, useRef } from 'react'
import { Search, Star, Shield, Plus, User, MessageCircle, ChevronDown, FileText, Users, CreditCard, Headphones } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import CategoryIcon from '@/components/Icons/CategoryIcon'
import { getUserById } from '@/data/mockData'
import { useServices } from '@/context/ServicesContext'
import { getCategoryIcon } from '@/config/icons'

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const { services } = useServices()
  const categoriesCarouselRef = useRef<HTMLDivElement>(null)
  const popularServicesCarouselRef = useRef<HTMLDivElement>(null)

  const handleLogin = (userType: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userType', userType)
      localStorage.setItem('isLoggedIn', 'true')
      setShowLoginModal(false)

      if (userType === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/dashboard'
      }
    }
  }



  // Simple 6 categories
  const simpleCategories = [
    { key: 'electrical', url: '/services?category=الكهرباء' },
    { key: 'plumbing', url: '/services?category=السباكة' },
    { key: 'hvac', url: '/services?category=التكييف والتبريد' },
    { key: 'security', url: '/services?category=تركيب كاميرات المراقبة' },
    { key: 'carpentry', url: '/services?category=النجارة' },
    { key: 'construction', url: '/services?category=البناء والمقاولات' }
  ]

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero - Clean Professional Style */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/saudi-arabia-bg.jpg" 
            alt="Saudi Arabia Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[500px]">
            {/* Left Content */}
            <div className="text-white" dir="rtl">
              <div className="inline-flex items-center gap-2 bg-[#1ab7ea]/20 text-[#1ab7ea] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-[#1ab7ea] rounded-full animate-pulse"></div>
                منصة الخدمات المنزلية الأولى
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6 text-right">
                اعثر على أفضل <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1ab7ea] to-[#00d4ff]">الحرفيين المحترفين</span><br />
                لمنزلك
              </h1>

              <p className="text-lg text-slate-300 mb-8 text-right leading-relaxed max-w-lg">
                خدمات صيانة منزلية عالية الجودة من محترفين معتمدين. كهرباء، سباكة، تكييف، نجارة وأكثر.
              </p>

              <div className="mb-6">
                <div className="flex bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl max-w-lg border border-white/20" dir="rtl">
                  <input
                    type="text"
                    placeholder="ابحث عن الخدمة التي تحتاجها..."
                    className="flex-1 px-4 py-4 text-slate-900 text-base outline-none text-right placeholder-slate-500 bg-transparent"
                    dir="rtl"
                  />
                  <button className="bg-[#1ab7ea] hover:bg-[#0ea5d9] backdrop-blur-md px-6 py-4 transition-colors border-r border-[#1ab7ea]/20">
                    <Search className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="text-right" dir="rtl">
                <div className="flex flex-wrap gap-2 justify-start items-center">
                  <span className="text-white/70 text-sm mr-3">الأكثر طلباً:</span>
                  {['الكهرباء', 'السباكة', 'التكييف', 'النجارة'].map((tag) => (
                    <a
                      key={tag}
                      href="/service/1"
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Hero Visual */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                {/* Main Hero Image */}
                <div className="relative">
                  <img
                    src="/hero-services.png"
                    alt="خدمات الصيانة المنزلية - كهرباء، سباكة، تكييف، نجارة"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-gray-50 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <span className="text-gray-500 font-semibold">موثوق من قبل:</span>
            <div className="flex items-center gap-8 opacity-70">
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png" alt="Meta" className="h-8" />
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png" alt="Google" className="h-8" />
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png" alt="Netflix" className="h-8" />
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png" alt="P&G" className="h-8" />
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </section>

      

      

      {/* Popular Services - Carousel Style */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header with title and controls */}
          <div className="flex justify-between items-center mb-12" dir="rtl">
            <h2 className="text-3xl font-bold text-gray-800">الأصناف</h2>
            
            {/* Carousel Controls */}
            <div className="flex gap-2">
              <button 
                onClick={() => scrollCarousel(categoriesCarouselRef, 'right')}
                className="bg-white hover:bg-[#1ab7ea] text-slate-800 hover:text-white rounded-full p-3 shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-110 border border-slate-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button 
                onClick={() => scrollCarousel(categoriesCarouselRef, 'left')}
                className="bg-white hover:bg-[#1ab7ea] text-slate-800 hover:text-white rounded-full p-3 shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-110 border border-slate-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Desktop Carousel - No Background */}
          <div className="hidden md:block relative overflow-hidden p-4">
            
            <div 
              ref={categoriesCarouselRef}
              id="categories-carousel"
              className="flex gap-6 cursor-grab active:cursor-grabbing overflow-x-auto" 
              style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
            >
              {(() => {
                const originalServices = [
                  { key: 'electrical', name: 'الكهرباء' },
                  { key: 'plumbing', name: 'السباكة' },
                  { key: 'hvac', name: 'التكييف والتبريد' },
                  { key: 'carpentry', name: 'النجارة' },
                  { key: 'security', name: 'كاميرات المراقبة' },
                  { key: 'construction', name: 'البناء والمقاولات' },
                  { key: 'gardening', name: 'تنسيق الحدائق' },
                  { key: 'elevator', name: 'صيانة المصاعد' },
                  { key: 'gypsum', name: 'جبس بورد والديكور' },
                  { key: 'renovation', name: 'الدهان والتشطيبات' },
                  { key: 'moving', name: 'نقل العفش والأثاث' },
                  { key: 'stairs', name: 'صيانة السلالم' },
                  { key: 'metalwork', name: 'الحدادة والألمنيوم' },
                  { key: 'cleaning', name: 'تنظيف الواجهات والزجاج' },
                  { key: 'maintenance', name: 'صيانة الشقق والأبراج السكنية' },
                  { key: 'safety', name: 'السلامة وتسعير المخططات' }
                ];
                
                // Create exactly 2 copies for perfect 50% loop
                const doubleServices = [...originalServices, ...originalServices];
                
                return doubleServices.map((service, index) => (
                <a
                   key={`${service.key}-${index}`}
                   href={`/services?category=${encodeURIComponent(service.name)}`}
                   className="group flex flex-col items-center text-center min-w-[140px] max-w-[140px] p-4 border border-slate-200 rounded-xl bg-white flex-shrink-0 hover:border-[#1ab7ea] hover:shadow-lg transition-all duration-300"
                 >
                   {/* Icon Container - No Background */}
                    <div className="w-16 h-16 flex items-center justify-center mb-3">
                     <CategoryIcon 
                       categoryKey={service.key} 
                       size="md" 
                       useExternal={true}
                       showFallback={true}
                       variant="minimal"
                     />
                   </div>
                   
                   {/* Service Name - Bold Text */}
                    <h4 className="font-bold text-slate-800 group-hover:text-[#1ab7ea] text-sm leading-tight text-center transition-colors duration-300" dir="rtl">
                      {service.name}
                    </h4>
                 </a>
                ));
              })()}
            </div>
          </div>

          {/* Mobile Grid - 2 Columns */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {[
               { key: 'electrical', name: 'الكهرباء' },
               { key: 'plumbing', name: 'السباكة' },
               { key: 'hvac', name: 'التكييف والتبريد' },
               { key: 'carpentry', name: 'النجارة' },
               { key: 'security', name: 'كاميرات المراقبة' },
               { key: 'construction', name: 'البناء والمقاولات' },
               { key: 'gardening', name: 'تنسيق الحدائق' },
               { key: 'elevator', name: 'صيانة المصاعد' },
               { key: 'gypsum', name: 'جبس بورد والديكور' },
               { key: 'renovation', name: 'الدهان والتشطيبات' },
               { key: 'moving', name: 'نقل العفش والأثاث' },
               { key: 'stairs', name: 'صيانة السلالم' }
             ].map((service, index) => (
              <a
                 key={`mobile-${service.key}-${index}`}
                 href={`/services?category=${encodeURIComponent(service.name)}`}
                 className="group flex flex-col items-center text-center p-4 border border-slate-200 rounded-xl bg-white hover:border-[#1ab7ea] hover:shadow-lg transition-all duration-300"
               >
                 {/* Icon Container - No Background */}
                  <div className="w-12 h-12 flex items-center justify-center mb-3">
                   <CategoryIcon 
                     categoryKey={service.key} 
                     size="sm" 
                     useExternal={true}
                     showFallback={true}
                     variant="minimal"
                   />
                 </div>
                 
                 {/* Service Name - Bold Text */}
                  <h4 className="font-bold text-slate-800 group-hover:text-[#1ab7ea] text-xs leading-tight text-center transition-colors duration-300" dir="rtl">
                    {service.name}
                  </h4>
               </a>
            ))}
          </div>
          
          {/* View More Button - Mobile Only */}
          <div className="text-center mt-6 md:hidden">
            <a
              href="/services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1ab7ea] to-[#0ea5d9] hover:from-[#0ea5d9] hover:to-[#0288c7] text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>عرض جميع الخدمات</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header with title and controls */}
          <div className="flex justify-between items-center mb-12" dir="rtl">
            <h2 className="text-3xl font-bold text-gray-900">الخدمات الأكثر شيوعاً</h2>
            
            {/* Carousel Controls */}
            <div className="flex gap-2">
              <button 
                onClick={() => scrollCarousel(popularServicesCarouselRef, 'right')}
                className="bg-white hover:bg-[#1ab7ea] text-slate-800 hover:text-white rounded-full p-3 shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-110 border border-slate-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button 
                onClick={() => scrollCarousel(popularServicesCarouselRef, 'left')}
                className="bg-white hover:bg-[#1ab7ea] text-slate-800 hover:text-white rounded-full p-3 shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-110 border border-slate-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div 
              ref={popularServicesCarouselRef}
              id="popular-services-carousel"
              className="flex gap-8 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
              {services.map((service) => {
                const user = getUserById(service.userId);
                return (
                  <div key={service.id} className="flex-shrink-0 w-[300px] bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden group flex flex-col">
                    <div className="relative">
                      <img
                        src={service.images[0]}
                        alt={service.title}
                        className="w-full h-[170px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center mb-3">
                        <img
                          src={user?.avatar}
                          alt={user?.fullName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="mr-3 text-right">
                          <h3 className="font-semibold text-sm text-gray-800">{user?.fullName}</h3>
                          <p className="text-xs text-gray-500">{user?.level}</p>
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
                          <div className="font-bold text-gray-800 text-lg">${service.packages[0]?.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-gray-900">هل تحتاج إلى القيام بشيء ما؟</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">اتبع هذه الخطوات البسيطة لإنجاز مشروعك بسهولة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-300">
              <div className="mb-8">
                <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:-translate-y-1">
                  <img 
                    src="/icons/نشر وظيفة.webp" 
                    alt="نشر وظيفة" 
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">نشر وظيفة</h4>
              <p className="text-gray-600 leading-relaxed">انشر وظيفتك الآن للعثور على أفضل المحترفين وإنجاز عملك بسرعة وكفاءة.</p>
            </div>

            <div className="text-center group p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-300">
              <div className="mb-8">
                <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:-translate-y-1">
                  <img 
                    src="/icons/اختر المستقلين.webp" 
                    alt="اختر المستقلين" 
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">اختر المستقلين</h4>
              <p className="text-gray-600 leading-relaxed">اختر المستقلين الأنسب لمشروعك وابدأ العمل بثقة.</p>
            </div>

            <div className="text-center group p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-300">
              <div className="mb-8">
                <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:-translate-y-1">
                  <img 
                    src="/icons/ادفع بأمان.webp" 
                    alt="ادفع بأمان" 
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">ادفع بأمان</h4>
              <p className="text-gray-600 leading-relaxed">ادفع بأمان من خلال نظام محمي يضمن حقوقك حتى إتمام العمل بنجاح.</p>
            </div>

            <div className="text-center group p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-300">
              <div className="mb-8">
                <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:-translate-y-1">
                  <img 
                    src="/icons/نحن هنا للمساعدة.webp" 
                    alt="نحن هنا للمساعدة" 
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">نحن هنا للمساعدة</h4>
              <p className="text-gray-600 leading-relaxed">نحن هنا للمساعدة — تواصل معنا في أي وقت لدعمك في كل خطوة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">ابدأ مشروعك اليوم</h3>
          <p className="text-xl md:text-2xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">انضم إلى آلاف العملاء الراضين واحصل على خدمتك المثالية</p>
          <button 
            onClick={() => setShowLoginModal(true)} 
            className="bg-gradient-to-r from-[#1ab7ea] to-[#0ea5d9] hover:from-[#0ea5d9] hover:to-[#0288c7] text-white px-12 py-4 rounded-2xl font-bold text-lg transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            ابدأ الآن مجاناً
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">الأسئلة الشائعة</h3>
          <div className="space-y-4">
            {[
              {
                question: 'كيف يمكنني العثور على حرفي موثوق؟',
                answer: 'يمكنك تصفح الحرفيين بناءً على التقييمات والمراجعات من العملاء السابقين. جميع الحرفيين متاحون بعد عملية تحقق من هويتهم ومهاراتهم.'
              },
              {
                question: 'هل يمكنني إلغاء الخدمة بعد بدء العمل؟',
                answer: 'نعم، يمكنك إلغاء الخدمة في أي وقت قبل اكتمالها. سيتم استرداد المبلغ بناءً على مرحلة العمل وسياسة الإلغاء.'
              },
              {
                question: 'كيف يتم ضمان جودة العمل؟',
                answer: 'نضمن جودة العمل من خلال نظام تقييم شامل وضمان استرداد المال في حالة عدم الرضا عن العمل.'
              },
              {
                question: 'ما هي طرق الدفع المتاحة؟',
                answer: 'نقبل جميع طرق الدفع الرئيسية بما في ذلك البطاقات الائتمانية والتحويل البنكي والمحافظ الرقمية.'
              },
              {
                question: 'كم يستغرق إنجاز العمل؟',
                answer: 'يختلف وقت الإنجاز حسب نوع الخدمة وتعقيدها. يمكنك مناقشة الجدول الزمني مع الحرفي قبل بدء العمل.'
              }
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-100 transition-colors"
                    dir="rtl"
                  >
                    <h4 className="text-lg font-semibold text-gray-800 flex-1">{faq.question}</h4>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-600 transition-transform duration-200 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed" dir="rtl">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">تسجيل الدخول التجريبي</h2>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleLogin('user')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                دخول كمستخدم عادي
              </button>

              <button
                onClick={() => handleLogin('admin')}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
              >
                دخول كمدير
              </button>

              <button
                onClick={() => handleLogin('seller')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                دخول كبائع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}