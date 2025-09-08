'use client'

import { MapPin, Clock, Car } from 'lucide-react'

interface Area {
  id: string
  name: string
  districts: string[]
  travelTime: string
  additionalFee?: number
  isAvailable: boolean
}

interface WorkAreasProps {
  areas: Area[]
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {areas.map((area) => (
          <div
            key={area.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedArea === area.id
                ? 'border-blue-500 bg-blue-50'
                : area.isAvailable 
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
            }`}
            onClick={() => area.isAvailable && onSelectArea && onSelectArea(area.id)}
          >
            <div className="text-right">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-900">{area.name}</h4>
                {area.additionalFee && (
                  <span className="text-sm text-orange-600 font-medium">+{area.additionalFee} ر.س</span>
                )}
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                {area.districts.join(' • ')}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{area.travelTime}</span>
                </div>
                
                <div className={`text-xs px-2 py-1 rounded-full ${
                  area.isAvailable 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {area.isAvailable ? 'متاح' : 'غير متاح'}
                </div>
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