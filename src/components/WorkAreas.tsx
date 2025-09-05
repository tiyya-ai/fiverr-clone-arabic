'use client'

import { MapPin, Clock, Car } from 'lucide-react'

interface WorkAreasProps {
  areas: string[]
  selectedArea?: string
  onSelectArea?: (area: string) => void
}

export default function WorkAreas({ areas, selectedArea, onSelectArea }: WorkAreasProps) {
  if (!areas || areas.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6" dir="rtl">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-gray-700" />
        <h3 className="text-xl font-bold text-gray-900">مناطق العمل المتاحة</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {areas.map((area, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedArea === area
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectArea && onSelectArea(area)}
          >
            <div className="flex items-center justify-between">
              <div className="text-right">
                <h4 className="font-bold text-gray-900 mb-1">{area}</h4>
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>متاح للخدمة</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 text-xs">خدمة توصيل</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
          <div className="text-right">
            <h4 className="font-medium text-gray-900 mb-1">ملاحظة مهمة</h4>
            <p className="text-gray-700 text-sm">
              يتم تحديد الرسوم الإضافية حسب المسافة من موقع مقدم الخدمة. 
              للمناطق البعيدة قد تطبق رسوم انتقال إضافية.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}