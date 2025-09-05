'use client'

import { Check, Star } from 'lucide-react'

interface Package {
  type: 'BASIC' | 'STANDARD' | 'PREMIUM'
  title: string
  price: number
  deliveryTime: number
  revisions: number
  features: string[]
}

interface ServicePackagesProps {
  packages: Package[]
  selectedPackage: number
  onSelectPackage: (index: number) => void
  onOrder: () => void
}

const packageTypeNames = {
  BASIC: 'الباقة الأساسية',
  STANDARD: 'الباقة المتوسطة', 
  PREMIUM: 'الباقة المتقدمة'
}

export default function ServicePackages({ packages, selectedPackage, onSelectPackage, onOrder }: ServicePackagesProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden" dir="rtl">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 text-right flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-green-600" />
          </div>
          اختر الباقة المناسبة
        </h3>
        <p className="text-gray-600 text-right mt-2">قارن بين الباقات واختر ما يناسب احتياجاتك</p>
      </div>
      
      <div className="p-6">
        {/* Package Tabs */}
        <div className="flex border border-gray-200 rounded-xl mb-6 overflow-hidden">
          {packages.map((pkg, index) => (
            <button
              key={index}
              onClick={() => onSelectPackage(index)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                selectedPackage === index
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-sm font-bold">{packageTypeNames[pkg.type]}</div>
              <div className="text-lg font-bold mt-1">{pkg.price} ر.س</div>
            </button>
          ))}
        </div>

        {/* Selected Package Details */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-gray-900">{packageTypeNames[packages[selectedPackage].type]}</h4>
            {packages[selectedPackage].type === 'PREMIUM' && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                الأكثر شمولية
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{packages[selectedPackage].price} ر.س</div>
              <div className="text-sm text-gray-600">السعر الإجمالي</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{packages[selectedPackage].deliveryTime} أيام</div>
              <div className="text-sm text-gray-600">مدة التسليم</div>
            </div>
          </div>

          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">ما ستحصل عليه:</h5>
            <ul className="space-y-2">
              {packages[selectedPackage].features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-right">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg">
            <span className="text-gray-700">
              {packages[selectedPackage].revisions === -1 
                ? 'تعديلات غير محدودة' 
                : `${packages[selectedPackage].revisions} تعديلات مجانية`}
            </span>
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">مضمون</span>
            </div>
          </div>

          <button
            onClick={onOrder}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            اطلب الآن - {packages[selectedPackage].price} ر.س
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>💡 يمكنك التواصل مع البائع لتخصيص الخدمة حسب احتياجاتك</p>
        </div>
      </div>
    </div>
  )
}