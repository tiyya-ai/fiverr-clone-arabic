'use client'

import { useState } from 'react'
import { ArrowRight, CreditCard, Lock } from 'lucide-react'
import Image from 'next/image'
import MainHeader from '@/components/MainHeader'

export default function CheckoutPage() {
  const [cartItems] = useState([
    {
      id: 1,
      title: 'تصميم موقع إلكتروني احترافي',
      seller: 'أحمد محمد',
      package: 'الباقة المتقدمة',
      price: 1500,
      quantity: 1,
      image: '/api/placeholder/60/60'
    }
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const serviceFee = subtotal * 0.05
  const total = subtotal + serviceFee

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button className="flex items-center text-gray-600 hover:text-gray-900 text-sm">
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للخدمة
          </button>
        </div>

        <div className="flex gap-8">
          {/* Left Column - Payment Form (70%) */}
          <div className="flex-1" style={{flexBasis: '70%'}}>
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <h1 className="text-2xl font-semibold mb-8 text-gray-900" dir="rtl">الدفع</h1>
              
              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4 text-gray-900" dir="rtl">معلومات الاتصال</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">رقم الهاتف</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="+966 50 123 4567"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4 text-gray-900" dir="rtl">طريقة الدفع</h2>
                
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="flex items-center px-4 py-4 border-b border-gray-300">
                    <input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      className="flex-1 outline-none text-base"
                    />
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-blue-600 rounded-sm"></div>
                      <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                      <div className="w-8 h-5 bg-yellow-500 rounded-sm"></div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="flex-1 px-4 py-4 outline-none border-l border-gray-300 text-base"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="flex-1 px-4 py-4 outline-none text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4 text-gray-900" dir="rtl">معلومات الفوترة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">الاسم الأول</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="أحمد"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">اسم العائلة</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="محمد"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">البلد</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base">
                    <option>السعودية</option>
                    <option>الإمارات</option>
                    <option>الكويت</option>
                    <option>قطر</option>
                    <option>البحرين</option>
                    <option>عمان</option>
                  </select>
                </div>
              </div>

              {/* Pay Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center shadow-sm">
                <Lock className="h-5 w-5 ml-2" />
                إتمام الدفع • {total.toFixed(2)} ريال سعودي
              </button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Lock className="h-3 w-3 ml-1" />
                    <span>SSL آمن</span>
                  </div>
                  <span>•</span>
                  <span>ضمان استرداد المال</span>
                  <span>•</span>
                  <span>دعم 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary (30%) */}
          <div className="w-80" style={{flexBasis: '30%'}}>
            <div className="bg-gray-50 rounded-lg p-6 border sticky top-8">
              <h2 className="text-lg font-semibold mb-6 text-gray-900" dir="rtl">ملخص الطلب</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 mr-4">
                      <h3 className="font-medium text-sm text-gray-900" dir="rtl">{item.title}</h3>
                      <p className="text-xs text-gray-600" dir="rtl">{item.package}</p>
                      <p className="text-xs text-gray-600" dir="rtl">البائع: {item.seller}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-gray-900">{item.price} ريال سعودي</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm" dir="rtl">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="text-gray-900">{subtotal} ريال سعودي</span>
                </div>
                <div className="flex justify-between text-sm" dir="rtl">
                  <span className="text-gray-600">رسوم الخدمة</span>
                  <span className="text-gray-900">{serviceFee.toFixed(2)} ريال سعودي</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200" dir="rtl">
                  <span className="text-gray-900">المجموع</span>
                  <span className="text-gray-900">{total.toFixed(2)} ريال سعودي</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <Lock className="h-5 w-5 text-blue-600 mt-0.5 ml-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900" dir="rtl">دفع آمن</h3>
                  <p className="text-xs text-blue-700 mt-1" dir="rtl">
                    جميع المعاملات محمية بتشفير SSL وضمان استرداد المال
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}