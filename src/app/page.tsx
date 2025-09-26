'use client'

import { useState, useRef } from 'react'
import { Search, Star, Shield, Plus, User, MessageCircle, ChevronDown, FileText, Users, CreditCard, Headphones, MapPin } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import CategoryIcon from '@/components/Icons/CategoryIcon'
import LoginModal from '@/components/LoginModal'
import { getUserById } from '@/data/mockData'
import { useServices } from '@/context/ServicesContext'
import { getCategoryIcon } from '@/config/icons'
import { generateServiceSlug } from '@/utils/slug'
import VerificationBadge from '@/components/VerificationBadge'
import Image from 'next/image';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const { services } = useServices() || { services: [] }
  const categoriesCarouselRef = useRef<HTMLDivElement>(null)
  const popularServicesCarouselRef = useRef<HTMLDivElement>(null)





  // Simple 6 categories
  const simpleCategories = [
    { key: 'electrical', url: '/services?category=الكهرباء' },
    { key: 'plumbing', url: '/services?category=السباكة' },
    { key: 'hvac', url: '/services?category=التكييف والتبريد' },
    { key: 'security', url: '/services?category=تركيب كاميرات المراقبة' },
    { key: 'carpentry', url: '/services?category=النجارة' },
    { key: 'construction', url: '/services?category=البناء والمقاولات' }
  ]

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
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
        {/* Professional Blue Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B1D44] to-[#3E429A]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[500px]">
            {/* Left Content */}
            <div className="text-white" dir="rtl">
              <div className="inline-flex items-center gap-2 bg-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <div className="w-2 h-2 bg-[#00C7B7] rounded-full animate-pulse"></div>
                منصة الخدمات المنزلية الأولى
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6 text-right text-white">
                اعثر على أفضل <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C7B7] to-[#ffffff]"> الحرفيين </span> لمنزلك

              </h1>

              <p className="text-lg text-white/90 mb-8 text-right leading-relaxed max-w-lg">
                خدمات صيانة منزلية عالية الجودة من محترفين معتمدين. كهرباء، سباكة، تكييف، نجارة وأكثر.
              </p>

              <div className="mb-6">
                <div className="flex bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl max-w-lg border border-white/20" dir="rtl">
                  <input
                    type="text"
                    placeholder="ابحث عن الخدمة التي تحتاجها..."
                    className="flex-1 px-4 py-4 text-[#0f172a] text-base outline-none text-right placeholder-[#64748b] bg-transparent font-medium"
                    dir="rtl"
                  />
                  <button className="bg-[#1dbf73] hover:bg-[#19a463] backdrop-blur-md px-6 py-4 transition-all duration-200 border-r border-[#1dbf73]/20 hover:shadow-lg">
                    <Search className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="text-right" dir="rtl">
                <div className="flex flex-wrap gap-2 justify-start items-center">
                  <span className="text-white/80 text-sm mr-3 font-medium">الأكثر طلباً:</span>
                  {['الكهرباء', 'السباكة', 'التكييف', 'النجارة'].map((tag) => (
                    <a
                      key={tag}
                      href={`/services?category=${encodeURIComponent(tag)}`}
                      className="px-4 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-sm text-white transition-all duration-200 font-medium hover:shadow-lg backdrop-blur-sm border border-white/20"
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
                  <Image
                    src="/hero-services.png"
                    alt="خدمات الصيانة المنزلية - كهرباء، سباكة، تكييف، نجارة"
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-[#f8fafc] py-8 border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <span className="text-[#475569] font-semibold">موثوق من قبل:</span>
            <div className="flex items-center gap-8 opacity-60 hover:opacity-80 transition-opacity duration-200">
              <Image src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png" alt="Meta" width={80} height={32} className="h-8 filter grayscale hover:grayscale-0 transition-all duration-200" />
              <Image src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png" alt="Google" width={80} height={32} className="h-8 filter grayscale hover:grayscale-0 transition-all duration-200" />
              <Image src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png" alt="Netflix" width={80} height={32} className="h-8 filter grayscale hover:grayscale-0 transition-all duration-200" />
              <Image src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png" alt="P&G" width={80} height={32} className="h-8 filter grayscale hover:grayscale-0 transition-all duration-200" />
              <Image src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png" alt="PayPal" width={80} height={32} className="h-8 filter grayscale hover:grayscale-0 transition-all duration-200" />
            </div>
          </div>
        </div>
      </section>

      

      

      {/* Popular Services - Carousel Style */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header with title and controls */}
          <div className="flex justify-between items-center mb-12" dir="rtl">
            <h2 className="text-3xl font-bold text-[#0f172a]">الأصناف</h2>
            
            {/* Carousel Controls */}
            <div className="flex gap-2">
              <button 
                onClick={() => scrollCarousel(categoriesCarouselRef, 'right')}
                className="bg-white hover:bg-[#1e40af] text-[#475569] hover:text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-110 border border-[#e2e8f0] hover:border-[#1e40af]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button 
                onClick={() => scrollCarousel(categoriesCarouselRef, 'left')}
                className="bg-white hover:bg-[#1e40af] text-[#475569] hover:text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-110 border border-[#e2e8f0] hover:border-[#1e40af]"
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
              style={{scrollbarWidth: 'none', msOverflowStyle: 'none'} as React.CSSProperties}
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
                   className="group flex flex-col items-center text-center min-w-[140px] max-w-[140px] p-4 border border-[#e2e8f0] rounded-2xl bg-white flex-shrink-0 hover:border-[#1e40af] hover:shadow-lg transition-all duration-300 hover:shadow-[#1e40af]/10"
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
                    <h4 className="font-bold text-[#0f172a] group-hover:text-[#1e40af] text-sm leading-tight text-center transition-colors duration-300" dir="rtl">
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
                 className="group flex flex-col items-center text-center p-4 border border-[#e2e8f0] rounded-2xl bg-white hover:border-[#1e40af] hover:shadow-lg transition-all duration-300 hover:shadow-[#1e40af]/10"
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
                  <h4 className="font-bold text-[#0f172a] group-hover:text-[#1e40af] text-xs leading-tight text-center transition-colors duration-300" dir="rtl">
                    {service.name}
                  </h4>
               </a>
            ))}
          </div>
          
          {/* View More Button - Mobile Only */}
          <div className="text-center mt-6 md:hidden">
            <a
              href="/services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e3a8a] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
      <section className="py-20 bg-[#F7F7F8]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12" dir="rtl">
            <h2 className="text-3xl font-bold text-[#0f172a]">الخدمات الأكثر شيوعاً</h2>
            <p className="text-lg text-[#475569] mt-2">اكتشف أكثر الخدمات طلباً من محترفين معتمدين</p>
          </div>
          
          {/* Services Grid - 3 cards inline per row, 2 rows total */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services?.slice(0, 6).map((service) => {
              const user = getUserById(service.userId);
              return (
                <div key={service.id} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden group flex flex-col hover:shadow-lg hover:border-[#cbd5e1] transition-all duration-300">
                  <a href={`/services/${generateServiceSlug(service.title, service.id)}`} className="relative block">
                    <Image
                       src={service.images[0]}
                       alt={service.title}
                       width={350}
                       height={180}
                       className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
                     />
                  </a>
                  <div className="p-5 flex flex-col flex-grow">
                     <div className="flex items-center mb-3">
                       <Image
                           src={user?.avatar || '/api/placeholder/32/32'}
                           alt={user?.fullName as string || ''}
                           width={32}
                           height={32}
                           className="w-8 h-8 rounded-full object-cover"
                         />
                       <div className="mr-3 flex-1">
                       <div className="flex items-center gap-1">
                           <h3 className="font-bold text-sm text-[#0f172a]">{user?.fullName}</h3>
                           {user?.isVerified && (
                             <VerificationBadge type="verified" size="sm" showLabel={false} />
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
                       <span className="text-sm text-[#64748b]">{service.category}</span>
                     </div>
                     <div className="flex items-center justify-between pt-3 border-t border-[#e2e8f0]" dir="rtl">
                       <span className="text-xs text-[#64748b]">ابتداءً من</span>
                       <div className="font-bold text-[#0f172a] text-lg">{service.packages[0]?.price} ر.س</div>
                     </div>
                   </div>
                </div>
              )
            })}
          </div>

          {/* View All Services Button */}
          <div className="text-center">
            <a 
              href="/services"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e3a8a] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>عرض جميع الخدمات</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-[#0f172a]">هل تحتاج إلى القيام بشيء ما؟</h3>
            <p className="text-lg text-[#475569] max-w-2xl mx-auto">اتبع هذه الخطوات البسيطة لإنجاز مشروعك بسهولة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group p-6 border border-[#e2e8f0] rounded-2xl hover:border-[#1e40af] transition-all duration-300 hover:shadow-lg hover:shadow-[#1e40af]/10">
              <div className="mb-8">
                <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:-translate-y-1">
                  <Image 
                    src="/icons/نشر وظيفة.webp" 
                    alt="نشر وظيفة" 
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-[#0f172a]">نشر وظيفة</h4>
              <p className="text-[#475569] leading-relaxed">انشر وظيفتك الآن للعثور على أفضل المحترفين وإنجاز عملك بسرعة وكفاءة.</p>
            </div>

            <div className="text-center group p-6 border border-[#e2e8f0] rounded-2xl hover:border-[#1e40af] transition-all duration-300 hover:shadow-lg hover:shadow-[#1e40af]/10">
              <div className="mb-8">
                <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:-translate-y-1">
                  <Image 
                    src="/icons/اختر المستقلين.webp" 
                    alt="اختر المستقلين" 
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-[#0f172a]">اختر المستقلين</h4>
              <p className="text-[#475569] leading-relaxed">اختر المستقلين الأنسب لمشروعك وابدأ العمل بثقة.</p>
            </div>

            <div className="text-center group p-6 border border-[#e2e8f0] rounded-2xl hover:border-[#1e40af] transition-all duration-300 hover:shadow-lg hover:shadow-[#1e40af]/10">
              <div className="mb-8">
                <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:-translate-y-1">
                  <Image 
                    src="/icons/ادفع بأمان.webp" 
                    alt="ادفع بأمان" 
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-[#0f172a]">ادفع بأمان</h4>
              <p className="text-[#475569] leading-relaxed">ادفع بأمان من خلال نظام محمي يضمن حقوقك حتى إتمام العمل بنجاح.</p>
            </div>

            <div className="text-center group p-6 border border-[#e2e8f0] rounded-2xl hover:border-[#1e40af] transition-all duration-300 hover:shadow-lg hover:shadow-[#1e40af]/10">
              <div className="mb-8">
                <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform group-hover:-translate-y-1">
                  <Image 
                    src="/icons/نحن هنا للمساعدة.webp" 
                    alt="نحن هنا للمساعدة" 
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 text-[#0f172a]">نحن هنا للمساعدة</h4>
              <p className="text-[#475569] leading-relaxed">نحن هنا للمساعدة — تواصل معنا في أي وقت لدعمك في كل خطوة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1B1D44] to-[#3E429A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">ابدأ مشروعك اليوم</h3>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">انضم إلى آلاف العملاء الراضين واحصل على خدمتك المثالية</p>
          <button 
            onClick={() => setShowLoginModal(true)} 
            className="bg-white text-[#1B1D44] hover:bg-gray-100 px-12 py-4 rounded-2xl font-semibold text-lg transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            ابدأ الآن مجاناً
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#F7F7F8]">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center text-[#0f172a]">الأسئلة الشائعة</h3>
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
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-300">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-[#f8fafc] transition-colors"
                    dir="rtl"
                  >
                    <h4 className="text-lg font-semibold text-[#0f172a] flex-1">{faq.question}</h4>
                    <ChevronDown 
                      className={`h-5 w-5 text-[#64748b] transition-transform duration-200 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-4">
                      <p className="text-[#475569] leading-relaxed" dir="rtl">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  )
}