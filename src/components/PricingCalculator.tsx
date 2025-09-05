'use client'

import { useState } from 'react'
import { Calculator, Info, MapPin, Clock } from 'lucide-react'

interface PricingCalculatorProps {
  basePrice: number
  workArea?: string
  additionalFees?: {
    travel?: number
    urgency?: number
    materials?: number
  }
}

export default function PricingCalculator({ 
  basePrice, 
  workArea, 
  additionalFees = {} 
}: PricingCalculatorProps) {
  const [isUrgent, setIsUrgent] = useState(false)
  const [includeMaterials, setIncludeMaterials] = useState(false)

  const calculateTotal = () => {
    let total = basePrice
    
    if (additionalFees.travel) total += additionalFees.travel
    if (isUrgent && additionalFees.urgency) total += additionalFees.urgency
    if (includeMaterials && additionalFees.materials) total += additionalFees.materials
    
    return total
  }

  const total = calculateTotal()
  const savings = basePrice * 0.15 // 15% discount simulation

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4" dir="rtl">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-5 w-5 text-gray-700" />
        <h3 className="text-xl font-bold text-gray-900">حاسبة التكلفة</h3>
      </div>

      <div className="space-y-4 mb-6">
        {/* Base Price */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">سعر الخدمة الأساسي</span>
          <span className="font-medium">{basePrice} ر.س</span>
        </div>

        {/* Travel Fee */}
        {additionalFees.travel && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">رسوم الانتقال</span>
            </div>
            <span className="font-medium text-gray-700">+{additionalFees.travel} ر.س</span>
          </div>
        )}

        {/* Urgency Option */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">خدمة عاجلة (خلال 24 ساعة)</span>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {additionalFees.urgency ? `+${additionalFees.urgency} ر.س` : '+50 ر.س'}
            </span>
          </label>
        </div>

        {/* Materials Option */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">شامل المواد والأدوات</span>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeMaterials}
              onChange={(e) => setIncludeMaterials(e.target.checked)}
              className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {additionalFees.materials ? `+${additionalFees.materials} ر.س` : '+100 ر.س'}
            </span>
          </label>
        </div>
      </div>

      {/* Total */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-gray-900">المجموع الكلي</span>
          <span className="text-2xl font-bold text-[#1ab7ea]">{total} ر.س</span>
        </div>
        
        {savings > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-600">توفر معنا</span>
            <span className="text-green-600 font-medium">{savings.toFixed(0)} ر.س</span>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-right">
            <p className="text-blue-800 text-sm">
              السعر شامل الضريبة المضافة. يمكن تعديل السعر النهائي حسب طبيعة العمل المطلوب.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-[#1ab7ea] hover:bg-[#0ea5d9] text-white font-medium py-3 rounded-lg transition-colors">
        احجز الآن - {total} ر.س
      </button>

      {/* Payment Methods */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-xs mb-2">طرق الدفع المتاحة</p>
        <div className="flex justify-center gap-2">
          <div className="h-6 w-10 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
          <div className="h-6 w-10 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
          <div className="h-6 w-10 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">مدى</div>
          <div className="h-6 w-10 bg-gray-800 rounded text-white text-xs flex items-center justify-center font-bold">PAY</div>
        </div>
      </div>
    </div>
  )
}