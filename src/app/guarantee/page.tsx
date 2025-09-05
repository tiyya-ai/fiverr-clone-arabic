import { Shield, CheckCircle, Clock, RefreshCw, Users, Star, Award, Lock, MessageCircle, Phone, User, ArrowLeft } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function Guarantee() {
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



  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600" dir="rtl">
            <a href="/" className="hover:text-blue-600">الرئيسية</a>
            <ArrowLeft className="h-4 w-4 rotate-180" />
            <span className="text-gray-900 font-medium">ضمان الجودة</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center" dir="rtl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">ضمان WBL3</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            نحن في WBL3 نضمن لك جودة الخدمات المقدمة ورضاك التام. إذا لم تكن راضياً عن الخدمة، فسنعمل على حل المشكلة أو إعادة أموالك.
          </p>
        </div>
      </section>

      {/* Guarantee Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12" dir="rtl">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">ماذا نضمن لك؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              التزامنا بتقديم أفضل تجربة ممكنة لعملائنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guaranteeFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow" dir="rtl">
                  <div className="flex items-start gap-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to Claim */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12" dir="rtl">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">كيفية المطالبة بالضمان</h2>
            <p className="text-gray-600">خطوات بسيطة للحصول على حقوقك</p>
          </div>

          <div className="space-y-6" dir="rtl">
            {[
              { step: '1', title: 'تواصل معنا', desc: 'أرسل رسالة تتضمن تفاصيل المشكلة ورقم الطلب' },
              { step: '2', title: 'مراجعة الطلب', desc: 'سيقوم فريقنا بمراجعة طلبك خلال 24 ساعة' },
              { step: '3', title: 'الحل', desc: 'إما إصلاح المشكلة أو استرداد المبلغ حسب الحالة' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Terms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12" dir="rtl">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">شروط وأحكام الضمان</h2>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6" dir="rtl">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  فترات الضمان
                </h3>
                <div className="space-y-2 text-gray-600 text-sm mr-7">
                  <p>• الخدمات العامة: 30 يوماً من تاريخ التسليم</p>
                  <p>• أعمال الصيانة: 90 يوماً من تاريخ الإنجاز</p>
                  <p>• التركيبات الكبيرة: 6 أشهر من تاريخ التسليم</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  ما يشمله الضمان
                </h3>
                <div className="space-y-2 text-gray-600 text-sm mr-7">
                  <p>• عيوب في جودة التنفيذ</p>
                  <p>• عدم مطابقة المواصفات المتفق عليها</p>
                  <p>• مشاكل ناتجة عن خطأ في العمل</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-orange-600" />
                  ما لا يشمله الضمان
                </h3>
                <div className="space-y-2 text-gray-600 text-sm mr-7">
                  <p>• الأضرار الناتجة عن سوء الاستخدام</p>
                  <p>• التلف بسبب عوامل خارجية</p>
                  <p>• التعديلات التي يقوم بها طرف ثالث</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12" dir="rtl">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
          </div>

          <div className="space-y-4" dir="rtl">
            {[
              {
                q: 'كم تستغرق عملية معالجة طلب الضمان؟',
                a: 'نقوم بمراجعة جميع طلبات الضمان خلال 24 ساعة من استلامها، وسنتواصل معك لإعلامك بالخطوات التالية.'
              },
              {
                q: 'هل يمكنني المطالبة بالضمان بعد انتهاء المدة المحددة؟',
                a: 'للأسف، لا يمكن المطالبة بالضمان بعد انتهاء المدة المحددة لكل نوع خدمة. ننصحك بالتواصل معنا فور ملاحظة أي مشكلة.'
              },
              {
                q: 'ما هي الوثائق المطلوبة للمطالبة بالضمان؟',
                a: 'تحتاج إلى رقم الطلب، وصف تفصيلي للمشكلة، وصور أو فيديو إن أمكن لتوضيح المشكلة.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center" dir="rtl">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">هل تحتاج مساعدة؟</h2>
          <p className="text-gray-600 mb-8">
            فريق دعم العملاء متاح لمساعدتك في أي استفسار حول الضمان
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              تواصل معنا
            </a>
            <a
              href="/services"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              تصفح الخدمات
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}