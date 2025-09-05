'use client'

import { useState } from 'react'
import { AlertTriangle, FileText, Send, Clock, ArrowLeft, Scale, MessageCircle } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function Dispute() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    disputeType: '',
    description: '',
    evidence: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('تم تقديم النزاع بنجاح! سيتم مراجعته خلال 24-48 ساعة.')
    setFormData({ orderNumber: '', disputeType: '', description: '', evidence: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600" dir="rtl">
            <a href="/" className="hover:text-blue-600">الرئيسية</a>
            <ArrowLeft className="h-4 w-4 rotate-180" />
            <span className="text-gray-900 font-medium">حل النزاعات</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center" dir="rtl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <Scale className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">عملية حل النزاع</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            نحن في WBL3 نلتزم بحل جميع النزاعات بعدالة وشفافية. فريقنا متاح لمساعدتك في إيجاد حل عادل لجميع الأطراف.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dispute Form */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-right" dir="rtl">تقديم نزاع جديد</h2>
            <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">رقم الطلب *</label>
                <input
                  type="text"
                  required
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  placeholder="أدخل رقم الطلب"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">نوع النزاع *</label>
                <select
                  required
                  value={formData.disputeType}
                  onChange={(e) => setFormData({...formData, disputeType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                >
                  <option value="">اختر نوع النزاع</option>
                  <option value="quality">جودة الخدمة غير مرضية</option>
                  <option value="delay">تأخير في التسليم</option>
                  <option value="no-delivery">عدم تسليم الخدمة</option>
                  <option value="different">الخدمة مختلفة عن المطلوب</option>
                  <option value="payment">مشكلة في الدفع</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">وصف المشكلة *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  placeholder="اشرح المشكلة بالتفصيل مع ذكر التواريخ والأوقات إن أمكن..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">معلومات إضافية</label>
                <textarea
                  rows={3}
                  value={formData.evidence}
                  onChange={(e) => setFormData({...formData, evidence: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  placeholder="أي معلومات أو أدلة إضافية تساعد في حل النزاع..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Send className="h-5 w-5" />
                تقديم النزاع
              </button>
            </form>
          </div>

            {/* Dispute Process */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-right" dir="rtl">عملية حل النزاع</h3>
                <div className="space-y-4" dir="rtl">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full p-2 mt-1 flex-shrink-0">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">1. تقديم النزاع</h4>
                      <p className="text-sm text-gray-600">املأ النموذج بجميع التفاصيل المطلوبة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 rounded-full p-2 mt-1 flex-shrink-0">
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">2. المراجعة والتحقيق</h4>
                      <p className="text-sm text-gray-600">فريقنا سيراجع النزاع خلال 24-48 ساعة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-2 mt-1 flex-shrink-0">
                      <Scale className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">3. القرار النهائي</h4>
                      <p className="text-sm text-gray-600">سنتواصل معك بالحل العادل لجميع الأطراف</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-orange-800 mb-2 text-right" dir="rtl">ملاحظة مهمة</h3>
                <p className="text-sm text-orange-700 text-right" dir="rtl">
                  يرجى التأكد من صحة جميع المعلومات. النزاعات الكاذبة قد تؤدي إلى تعليق الحساب.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-2 text-right" dir="rtl">تحتاج مساعدة؟</h3>
                <p className="text-sm text-blue-700 mb-3 text-right" dir="rtl">
                  يمكنك التواصل مع فريق الدعم قبل تقديم النزاع
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  تواصل معنا
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}