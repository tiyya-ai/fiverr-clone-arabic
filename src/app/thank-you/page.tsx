'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import { CheckCircle, MessageCircle, Star, Clock, Shield, ArrowRight } from 'lucide-react'

export default function ThankYouPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState(null)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Get order data from localStorage or URL params
    const data = localStorage.getItem('completedOrder')
    if (data) {
      setOrderData(JSON.parse(data))
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/orders')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4" dir="rtl">
            تم الدفع بنجاح!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8" dir="rtl">
            سيتم التواصل معك قريباً
          </p>
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4" dir="rtl">تفاصيل الطلب</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div dir="rtl">
                <h3 className="font-medium text-gray-700 mb-2">الخدمة المطلوبة</h3>
                <p className="text-gray-900">{orderData.packageTitle}</p>
                <p className="text-sm text-gray-600">{orderData.serviceTitle}</p>
              </div>
              <div dir="rtl">
                <h3 className="font-medium text-gray-700 mb-2">مقدم الخدمة</h3>
                <p className="text-gray-900">{orderData.sellerName}</p>
              </div>
              <div dir="rtl">
                <h3 className="font-medium text-gray-700 mb-2">المبلغ المدفوع</h3>
                <p className="text-2xl font-bold text-green-600">{orderData.price} ر.س</p>
              </div>
              <div dir="rtl">
                <h3 className="font-medium text-gray-700 mb-2">رقم الطلب</h3>
                <p className="text-gray-900 font-mono">#ORD-{Date.now().toString().slice(-6)}</p>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6" dir="rtl">ما التالي؟</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4" dir="rtl">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">سيتم التواصل معك</h3>
                <p className="text-sm text-gray-600">سيقوم مقدم الخدمة بالتواصل معك خلال 24 ساعة لتحديد موعد العمل</p>
              </div>
            </div>

            <div className="flex items-start gap-4" dir="rtl">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">تنفيذ الخدمة</h3>
                <p className="text-sm text-gray-600">سيتم تنفيذ الخدمة في الموعد المحدد مع ضمان الجودة</p>
              </div>
            </div>

            <div className="flex items-start gap-4" dir="rtl">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">تقييم الخدمة</h3>
                <p className="text-sm text-gray-600">بعد اكتمال العمل، يمكنك تقييم الخدمة ومقدم الخدمة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => router.push('/orders')}
            className="flex items-center justify-center gap-2 bg-[#1ab7ea] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg hover:bg-[#0ea5d9] font-medium text-sm sm:text-base"
          >
            <span>عرض طلباتي</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          
          <button
            onClick={() => router.push('/services')}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 sm:px-6 py-3 sm:py-4 rounded-lg hover:bg-gray-50 font-medium text-sm sm:text-base"
          >
            <span>تصفح المزيد من الخدمات</span>
          </button>
        </div>

        {/* Auto Redirect Notice */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            سيتم توجيهك تلقائياً إلى صفحة الطلبات خلال {countdown} ثواني
          </p>
        </div>

        {/* Support */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8 text-center">
          <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2" dir="rtl">هل تحتاج مساعدة؟</h3>
          <p className="text-sm text-gray-600 mb-4" dir="rtl">
            فريق الدعم متاح 24/7 لمساعدتك في أي استفسار
          </p>
          <button
            onClick={() => router.push('/support')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
          >
            تواصل مع الدعم
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}