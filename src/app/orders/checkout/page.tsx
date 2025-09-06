'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import { CreditCard, Shield, X } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<any>(null)
  const [processing, setProcessing] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('pendingOrder')
    const loggedIn = localStorage.getItem('isLoggedIn')
    
    if (data) {
      setOrderData(JSON.parse(data))
    } else {
      router.push('/services')
    }
    
    setIsLoggedIn(!!loggedIn)
  }, [])

  const handleLogin = (userType: string) => {
    localStorage.setItem('userType', userType)
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    setShowLoginModal(false)
  }

  const handlePayment = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }
    
    setProcessing(true)
    
    setTimeout(() => {
      // Store completed order for thank you page
      localStorage.setItem('completedOrder', JSON.stringify(orderData))
      localStorage.removeItem('pendingOrder')
      router.push('/thank-you')
    }, 2000)
  }

  if (!orderData) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">إتمام الطلب</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4" dir="rtl">تفاصيل الطلب</h2>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2" dir="rtl">{orderData.packageTitle}</h3>
                <p className="text-gray-600 mb-3" dir="rtl">{orderData.serviceTitle}</p>
                <p className="text-sm text-gray-500 mb-4" dir="rtl">البائع: {orderData.sellerName}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#1ab7ea]">{orderData.price} ر.س</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4" dir="rtl">طريقة الدفع</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span>بطاقة ائتمان</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم البطاقة</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div dir="rtl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">MM/YY</label>
                    <input
                      type="text"
                      placeholder="12/25"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                    />
                  </div>
                  <div dir="rtl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4" dir="rtl">ملخص الطلب</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>سعر الخدمة</span>
                  <span>{orderData.price} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم الخدمة</span>
                  <span>{Math.round(orderData.price * 0.05)} ر.س</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع</span>
                  <span>{orderData.price + Math.round(orderData.price * 0.05)} ر.س</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-[#1ab7ea] text-white py-3 rounded-lg hover:bg-[#0ea5d9] disabled:opacity-50 font-bold"
              >
                {processing ? 'جاري المعالجة...' : isLoggedIn ? 'إتمام الدفع' : 'تسجيل الدخول والدفع'}
              </button>
              
              {!isLoggedIn && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  يجب تسجيل الدخول لإتمام عملية الدفع
                </p>
              )}

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>دفع آمن ومحمي</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" dir="rtl">
            <h2 className="text-xl font-bold mb-4 text-right">تسجيل الدخول</h2>
            <p className="text-gray-600 mb-6 text-right">يرجى تسجيل الدخول لإتمام عملية الدفع</p>
            <div className="space-y-3">
              <button onClick={() => handleLogin('user')} className="w-full bg-[#1ab7ea] text-white py-3 rounded hover:bg-[#0ea5d9]">
                دخول كعميل
              </button>
              <button onClick={() => handleLogin('seller')} className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
                دخول كمقدم خدمة
              </button>
              <button onClick={() => setShowLoginModal(false)} className="w-full border border-gray-300 py-3 rounded hover:bg-gray-50">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}