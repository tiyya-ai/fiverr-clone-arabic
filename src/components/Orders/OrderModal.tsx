'use client'

import { useState } from 'react'
import { X, CreditCard, Shield, Clock, Check } from 'lucide-react'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  service: any
  selectedPackage: any
  seller: any
}

export default function OrderModal({ isOpen, onClose, service, selectedPackage, seller }: OrderModalProps) {
  const [step, setStep] = useState(1) // 1: تأكيد الطلب, 2: الدفع, 3: تأكيد الطلب
  const [orderDetails, setOrderDetails] = useState({
    requirements: '',
    deadline: '',
    additionalInfo: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')

  if (!isOpen) return null

  const handleOrderSubmit = () => {
    // محاكاة معالجة الطلب
    setStep(3)
    setTimeout(() => {
      onClose()
      setStep(1)
      // إضافة إشعار نجاح
      alert('تم إرسال طلبك بنجاح! سيتواصل معك البائع قريباً.')
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900" dir="rtl">
            {step === 1 && 'تأكيد الطلب'}
            {step === 2 && 'الدفع'}
            {step === 3 && 'تم الطلب بنجاح'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step 1: تأكيد الطلب */}
        {step === 1 && (
          <div className="p-6">
            {/* Service Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex gap-4">
                <img
                  src={service.images[0]}
                  alt={service.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2" dir="rtl">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={seller.avatar}
                      alt={seller.fullName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{seller.fullName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      الباقة: {selectedPackage.title}
                    </span>
                    <span className="font-bold text-green-600">
                      ${selectedPackage.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
                  متطلبات المشروع *
                </label>
                <textarea
                  value={orderDetails.requirements}
                  onChange={(e) => setOrderDetails({...orderDetails, requirements: e.target.value})}
                  placeholder="اشرح متطلباتك بالتفصيل..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                  dir="rtl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
                  الموعد النهائي المفضل
                </label>
                <input
                  type="date"
                  value={orderDetails.deadline}
                  onChange={(e) => setOrderDetails({...orderDetails, deadline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
                  معلومات إضافية
                </label>
                <textarea
                  value={orderDetails.additionalInfo}
                  onChange={(e) => setOrderDetails({...orderDetails, additionalInfo: e.target.value})}
                  placeholder="أي معلومات إضافية تريد مشاركتها..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Package Features */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3" dir="rtl">ما ستحصل عليه:</h4>
              <ul className="space-y-2">
                {selectedPackage.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-2" dir="rtl">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedPackage.deliveryTime} أيام تسليم</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>{selectedPackage.revisions} مراجعات</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!orderDetails.requirements.trim()}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                متابعة للدفع
              </button>
            </div>
          </div>
        )}

        {/* Step 2: الدفع */}
        {step === 2 && (
          <div className="p-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3" dir="rtl">ملخص الطلب</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>سعر الخدمة:</span>
                  <span>${selectedPackage.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم الخدمة (5%):</span>
                  <span>${(selectedPackage.price * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>المجموع:</span>
                  <span>${(selectedPackage.price * 1.05).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3" dir="rtl">طريقة الدفع</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-green-600"
                  />
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span>بطاقة ائتمانية</span>
                </label>
                
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-green-600"
                  />
                  <div className="w-5 h-5 bg-blue-600 rounded"></div>
                  <span>PayPal</span>
                </label>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900" dir="rtl">دفع آمن</span>
              </div>
              <p className="text-sm text-blue-800" dir="rtl">
                أموالك محمية. لن يتم تحرير الدفع للبائع حتى تؤكد استلام العمل المطلوب.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                رجوع
              </button>
              <button
                onClick={handleOrderSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                تأكيد الدفع
              </button>
            </div>
          </div>
        )}

        {/* Step 3: تأكيد النجاح */}
        {step === 3 && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">تم إرسال طلبك بنجاح!</h3>
            <p className="text-gray-600 mb-6" dir="rtl">
              سيتواصل معك {seller.fullName} قريباً لبدء العمل على مشروعك.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  )
}