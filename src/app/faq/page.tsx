'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('general')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'general', name: 'عام', icon: HelpCircle },
    { id: 'account', name: 'الحساب', icon: MessageCircle },
    { id: 'services', name: 'الخدمات', icon: Phone },
    { id: 'payment', name: 'الدفع', icon: Mail },
    { id: 'disputes', name: 'النزاعات', icon: HelpCircle }
  ]

  const faqData = {
    general: [
      {
        question: 'ما هي منصة WBL3؟',
        answer: 'WBL3 هي منصة رقمية رائدة تربط بين العملاء والحرفيين المحترفين المعتمدين لتقديم خدمات الصيانة المنزلية والتقنية عالية الجودة. نحن نوفر حلول شاملة للمنازل والمكاتب في جميع أنحاء المملكة العربية السعودية.'
      },
      {
        question: 'في أي المناطق تتوفر خدماتكم؟',
        answer: 'نغطي حالياً جميع المناطق الرئيسية في المملكة العربية السعودية بما في ذلك الرياض، جدة، الدمام، مكة المكرمة، المدينة المنورة، والطائف. نعمل باستمرار على توسيع نطاق تغطيتنا لتشمل المزيد من المدن والمناطق.'
      },
      {
        question: 'كيف تضمنون جودة الحرفيين؟',
        answer: 'نتبع عملية فحص صارمة تشمل التحقق من الهوية، فحص الخبرات والمؤهلات، اختبارات عملية، والتحقق من السجل الجنائي. كما نراقب الأداء باستمرار من خلال تقييمات العملاء ونظام المتابعة الداخلي.'
      }
    ],
    account: [
      {
        question: 'كيف يمكنني إنشاء حساب جديد؟',
        answer: 'يمكنك إنشاء حساب جديد بسهولة من خلال النقر على زر "حساب جديد" في أعلى الصفحة، ثم ملء البيانات المطلوبة مثل الاسم، البريد الإلكتروني، ورقم الهاتف. ستتلقى رسالة تأكيد لتفعيل حسابك.'
      },
      {
        question: 'نسيت كلمة المرور، كيف يمكنني استعادتها؟',
        answer: 'انقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول، أدخل بريدك الإلكتروني، وستتلقى رابط إعادة تعيين كلمة المرور. اتبع التعليمات في البريد الإلكتروني لإنشاء كلمة مرور جديدة.'
      },
      {
        question: 'كيف يمكنني تحديث معلومات حسابي؟',
        answer: 'بعد تسجيل الدخول، انتقل إلى "الملف الشخصي" أو "إعدادات الحساب" حيث يمكنك تحديث جميع معلوماتك الشخصية مثل الاسم، العنوان، رقم الهاتف، والبريد الإلكتروني.'
      }
    ],
    services: [
      {
        question: 'ما هي أنواع الخدمات المتاحة؟',
        answer: 'نقدم مجموعة واسعة من الخدمات تشمل: الكهرباء والإضاءة، السباكة وأعمال المياه، التكييف والتبريد، النجارة والأثاث، كاميرات المراقبة والأمان، البناء والمقاولات، الدهان والديكور، وصيانة الأجهزة المنزلية.'
      },
      {
        question: 'كيف يمكنني طلب خدمة؟',
        answer: 'تصفح الخدمات المتاحة، اختر الخدمة المناسبة، حدد التفاصيل والموعد المفضل، أكمل معلومات الطلب، واختر طريقة الدفع. ستتلقى تأكيد الطلب ومعلومات الحرفي المخصص لك.'
      },
      {
        question: 'كم يستغرق تنفيذ الخدمة؟',
        answer: 'يختلف وقت التنفيذ حسب نوع الخدمة وتعقيدها. الخدمات البسيطة تتم خلال ساعات قليلة، بينما المشاريع الكبيرة قد تستغرق عدة أيام. سيتم إعلامك بالوقت المتوقع عند تأكيد الطلب.'
      }
    ],
    payment: [
      {
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نقبل جميع طرق الدفع الرئيسية: البطاقات الائتمانية (فيزا، ماستركارد)، مدى، التحويل البنكي، المحافظ الرقمية (STC Pay، Apple Pay)، والدفع النقدي عند إتمام الخدمة.'
      },
      {
        question: 'متى يتم خصم المبلغ؟',
        answer: 'يتم حجز المبلغ عند تأكيد الطلب كضمان، ولكن الخصم الفعلي يتم فقط بعد إتمام الخدمة وتأكيد رضاك عنها. هذا يضمن حقوقك كعميل.'
      },
      {
        question: 'هل يمكنني استرداد المبلغ؟',
        answer: 'نعم، يمكنك طلب استرداد المبلغ في حالات محددة مثل إلغاء الطلب قبل البدء، عدم رضاك عن جودة الخدمة، أو عدم التزام الحرفي بالمواعيد. يتم معالجة طلبات الاسترداد خلال 3-7 أيام عمل.'
      }
    ],
    disputes: [
      {
        question: 'ماذا أفعل إذا لم أكن راضياً عن الخدمة؟',
        answer: 'تواصل معنا فوراً عبر خدمة العملاء أو قم بتقديم شكوى من خلال حسابك. سنقوم بمراجعة الحالة والتواصل مع الحرفي لحل المشكلة أو ترتيب إعادة تنفيذ الخدمة مجاناً.'
      },
      {
        question: 'كيف يتم حل النزاعات؟',
        answer: 'لدينا فريق متخصص لحل النزاعات يعمل بحيادية تامة. نراجع جميع الأدلة والمستندات، نستمع لكلا الطرفين، ونتخذ قراراً عادلاً خلال 24-48 ساعة. قد يشمل الحل إعادة تنفيذ الخدمة أو استرداد المبلغ.'
      },
      {
        question: 'هل هناك ضمان على الخدمات؟',
        answer: 'نعم، نقدم ضمان على جميع خدماتنا يتراوح من 30 يوم إلى سنة كاملة حسب نوع الخدمة. إذا ظهرت أي مشاكل خلال فترة الضمان، سنقوم بإصلاحها مجاناً.'
      }
    ]
  }

  const filteredFaqs = faqData[activeCategory as keyof typeof faqData].filter(
    faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h1>
          <p className="text-xl text-gray-600">نجيب على أكثر الأسئلة شيوعاً حول خدماتنا ومنصتنا</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="ابحث في الأسئلة الشائعة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            dir="rtl"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-right">الفئات</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const globalIndex = `${activeCategory}-${index}`
                return (
                  <div key={globalIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <button
                      onClick={() => setOpenFaq(openFaq === globalIndex ? null : globalIndex)}
                      className="w-full p-6 text-right flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        {openFaq === globalIndex ? (
                          <ChevronUp className="h-5 w-5 text-blue-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
                        {faq.question}
                      </h3>
                    </button>
                    {openFaq === globalIndex && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed text-right pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
                <p className="text-gray-500">لم نجد أي أسئلة تطابق بحثك. جرب كلمات مختلفة.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">لم تجد إجابة لسؤالك؟</h3>
          <p className="text-gray-600 mb-8">فريق خدمة العملاء متاح 24/7 لمساعدتك</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <MessageCircle className="h-5 w-5" />
              تواصل معنا
            </a>
            <a
              href="tel:+966123456789"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <Phone className="h-5 w-5" />
              اتصل بنا: 123456789 966+
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}