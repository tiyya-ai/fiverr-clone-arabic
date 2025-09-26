'use client'

import { useState, useEffect } from 'react'
import { Heart, Star, Trash2, MapPin } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import { generateServiceSlug } from '@/utils/slug'
import Image from 'next/image'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(savedFavorites)
  }, [])

  const removeFavorite = (serviceId: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== serviceId)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8" dir="rtl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">المفضلة</h1>
          <p className="text-gray-600">الخدمات التي أضفتها للمفضلة ({favorites.length})</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">لا توجد خدمات مفضلة</h3>
            <p className="text-gray-600 mb-6">ابدأ بإضافة خدمات لمفضلتك لتظهر هنا</p>
            <a
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              تصفح الخدمات
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <Image
                    src={service.image || 'https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={service.title}
                    width={300}
                    height={170}
                    className="w-full h-[170px] object-cover"
                  />
                  <button
                    onClick={() => removeFavorite(service.id)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                
                <div className="p-4">
                  <a 
                    href={`/services/${generateServiceSlug(service.title, service.id)}`}
                    className="text-gray-900 hover:text-blue-600 transition-colors text-right font-semibold leading-snug block mb-3"
                    dir="rtl"
                  >
                    {service.title}
                  </a>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 text-gray-500 ml-1" />
                      <span className="text-sm text-gray-500">السعودية</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold">4.8</span>
                      <span className="text-xs text-gray-500">(124)</span>
                    </div>
                  </div>
                  
                  <div className="text-right mb-3">
                    <span className="text-sm text-gray-500">{service.category || "تصميم وبرمجة"}</span>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <div className="text-right" dir="rtl">
                      <span className="text-xs text-gray-500 block">ابتداءً من</span>
                      <div className="font-bold text-gray-900">{service.price || 150} ريال سعودي</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}