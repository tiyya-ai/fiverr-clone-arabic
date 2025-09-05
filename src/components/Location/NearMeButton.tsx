'use client'

import { useState, useEffect } from 'react'
import { MapPin, Loader2, Navigation, X } from 'lucide-react'

interface NearMeButtonProps {
  onLocationUpdate?: (location: { lat: number; lng: number; address?: string }) => void
  className?: string
}

interface LocationData {
  lat: number
  lng: number
  address?: string
  accuracy?: number
}

export default function NearMeButton({ onLocationUpdate, className = '' }: NearMeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [watchId, setWatchId] = useState<number | null>(null)

  // تنظيف المراقبة عند إلغاء المكون
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [watchId])

  // الحصول على الموقع مرة واحدة
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('الجهاز لا يدعم تحديد الموقع')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000 // استخدام موقع محفوظ لمدة دقيقة
          }
        )
      })

      const locationData: LocationData = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
      }

      // الحصول على العنوان من الإحداثيات
      try {
        const address = await reverseGeocode(locationData.lat, locationData.lng)
        locationData.address = address
      } catch (e) {
        console.warn('فشل في الحصول على العنوان:', e)
      }

      setCurrentLocation(locationData)
      onLocationUpdate?.(locationData)

    } catch (error: any) {
      let errorMessage = 'فشل في تحديد الموقع'
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'تم رفض الإذن لتحديد الموقع'
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'الموقع غير متاح'
          break
        case error.TIMEOUT:
          errorMessage = 'انتهت مهلة تحديد الموقع'
          break
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // بدء التتبع المباشر
  const startLiveTracking = () => {
    if (!navigator.geolocation) {
      setError('الجهاز لا يدعم تحديد الموقع')
      return
    }

    setIsTracking(true)
    setError(null)

    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const locationData: LocationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        }

        // الحصول على العنوان
        try {
          const address = await reverseGeocode(locationData.lat, locationData.lng)
          locationData.address = address
        } catch (e) {
          console.warn('فشل في الحصول على العنوان:', e)
        }

        setCurrentLocation(locationData)
        onLocationUpdate?.(locationData)
      },
      (error) => {
        console.error('خطأ في التتبع المباشر:', error)
        setError('فشل في التتبع المباشر')
        stopLiveTracking()
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000 // تحديث كل 30 ثانية
      }
    )

    setWatchId(id)
  }

  // إيقاف التتبع المباشر
  const stopLiveTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }
    setIsTracking(false)
  }

  // تحويل الإحداثيات إلى عنوان
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // استخدام OpenStreetMap Nominatim API (مجاني)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
      )
      
      if (!response.ok) throw new Error('فشل في الحصول على العنوان')
      
      const data = await response.json()
      return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
    } catch (error) {
      console.warn('فشل في تحويل الإحداثيات:', error)
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
    }
  }

  return (
    <>
      {/* الزر العائم */}
      <div className={`fixed bottom-20 right-4 z-50 ${className}`}>
        <div className="flex flex-col gap-2">
          {/* زر بالقرب مني */}
          <button
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="bg-[#1ab7ea] hover:bg-[#0ea5d9] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            title="بالقرب مني"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <MapPin className="h-6 w-6" />
            )}
          </button>

          {/* زر التتبع المباشر */}
          {currentLocation && (
            <button
              onClick={isTracking ? stopLiveTracking : startLiveTracking}
              className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                isTracking 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              title={isTracking ? 'إيقاف التتبع المباشر' : 'بدء التتبع المباشر'}
            >
              {isTracking ? (
                <X className="h-5 w-5" />
              ) : (
                <Navigation className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {/* عرض الموقع الحالي */}
        {currentLocation && (
          <div className="mt-2 bg-white rounded-lg shadow-lg p-3 max-w-xs">
            <div className="text-xs text-gray-600 mb-1">موقعك الحالي:</div>
            <div className="text-sm font-medium text-gray-900 truncate">
              {currentLocation.address || `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`}
            </div>
            {currentLocation.accuracy && (
              <div className="text-xs text-gray-500 mt-1">
                دقة: {Math.round(currentLocation.accuracy)} متر
              </div>
            )}
            {isTracking && (
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                تتبع مباشر
              </div>
            )}
          </div>
        )}

        {/* عرض الأخطاء */}
        {error && (
          <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3 max-w-xs">
            <div className="text-sm text-red-800">{error}</div>
            <button
              onClick={() => setError(null)}
              className="text-xs text-red-600 hover:text-red-800 mt-1"
            >
              إغلاق
            </button>
          </div>
        )}
      </div>
    </>
  )
}