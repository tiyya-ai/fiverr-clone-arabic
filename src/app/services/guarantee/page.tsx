'use client'

import { Shield, CheckCircle, Clock, RefreshCw, Users, Star, Award, Lock, MessageCircle, Phone, User, ArrowLeft } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import UnifiedButton from '@/components/UnifiedButton'

export default function ServicesGuarantee() {
  const guaranteeFeatures = [
    {
      icon: Shield,
      title: 'ضمان الجودة 100%',
      description: 'نضمن لك جودة الخدمة أو نسترد أموالك كاملة',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Clock,
      title: 'ضمان التسليم في الموعد',
      description: 'التزام تام بالمواعيد المحددة أو تعويض فوري',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: RefreshCw,
      title: 'ضمان الإصلاح المجاني',
      description: 'إصلاح مجاني لأي مشاكل خلال فترة الضمان',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: Lock,
      title: 'ضمان الأمان والحماية',
      description: 'حماية شاملة لممتلكاتك وبياناتك الشخصية',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  const guaranteeSteps = [
    {
      step: '1',
      title: 'اطلب الخدمة',
      description: 'اختر الخدمة المناسبة واطلبها من أحد مقدمي الخدمات المعتمدين'
    },
    {
      step: '2',
      title: 'تنفيذ الخدمة',
      description: 'يقوم مقدم الخدمة بتنفيذ العمل وفقاً للمعايير المحددة'
    },
    {
      step: '3',
      title: 'فحص الجودة',
      description: 'نقوم بفحص جودة العمل للتأكد من مطابقته للمعايير'
    },
    {
      step: '4',
      title: 'ضمان مستمر',
      description: 'نقدم ضمان شامل على جميع الخدمات لفترة محددة'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600" dir="rtl">
            <a href="/" className="hover:text-blue-600">الرئيسية</a>
            <ArrowLeft className="h-4 w-4 rotate-180" />
            <a href="/services" className="hover:text-blue-600">الخدمات</a>
            <ArrowLeft className="h-4 w-4 rotate-180" />
            <span className="text-gray-900 font-medium">ضمان الخدمات</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Shield className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" dir="rtl">
            ضمان شامل على جميع الخدمات
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto" dir="rtl">
            نحن نضمن لك أعلى مستويات الجودة والاحترافية في جميع الخدمات المقدمة على منصتنا
          </p>
          <UnifiedButton 
            variant="primary" 
            size="large"
            onClick={() => window.location.href = '/services'}
          >
            تصفح الخدمات
          </UnifiedButton>
        </div>
      </div>

      {/* Guarantee Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">
              ما نضمنه لك
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" dir="rtl">
              التزامنا بتقديم أفضل تجربة خدمة ممكنة مع ضمانات شاملة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guaranteeFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" dir="rtl">
                  {feature.title}
                </h3>
                <p className="text-gray-600" dir="rtl">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">
              كيف يعمل الضمان
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" dir="rtl">
              عملية بسيطة وواضحة لضمان حصولك على أفضل خدمة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guaranteeSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" dir="rtl">
                  {step.title}
                </h3>
                <p className="text-gray-600" dir="rtl">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" dir="rtl">
            شروط وأحكام الضمان
          </h2>
          
          <div className="space-y-6" dir="rtl">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">فترة الضمان</h3>
              <p className="text-gray-600">
                يسري الضمان لمدة 30 يوماً من تاريخ إتمام الخدمة، ويمكن تمديدها حسب نوع الخدمة.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">شروط الاستبدال</h3>
              <p className="text-gray-600">
                في حالة عدم الرضا عن الخدمة، يمكن طلب إعادة تنفيذها أو استرداد المبلغ كاملاً خلال 7 أيام.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">الدعم الفني</h3>
              <p className="text-gray-600">
                فريق الدعم الفني متاح 24/7 لمساعدتك في أي استفسارات أو مشاكل تتعلق بالخدمة.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" dir="rtl">
            جاهز للبدء؟
          </h2>
          <p className="text-xl text-blue-100 mb-8" dir="rtl">
            اطلب خدمتك الآن واستفد من ضماننا الشامل
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <UnifiedButton 
              variant="secondary" 
              size="large"
              onClick={() => window.location.href = '/services'}
            >
              تصفح الخدمات
            </UnifiedButton>
            <UnifiedButton 
              variant="outline" 
              size="large"
              onClick={() => window.location.href = '/contact'}
            >
              تواصل معنا
            </UnifiedButton>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}