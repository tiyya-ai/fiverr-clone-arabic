'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const Categories = () => {
  const categories = [
    {
      id: 'electrical',
      name: 'الكهرباء',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop',
      description: 'إصلاح وصيانة الأعطال الكهربائية'
    },
    {
      id: 'plumbing',
      name: 'السباكة',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop',
      description: 'إصلاح التسريبات وصيانة الأنابيب'
    },
    {
      id: 'hvac',
      name: 'التكييف والتبريد',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop',
      description: 'تركيب وصيانة أجهزة التكييف'
    },
    {
      id: 'carpentry',
      name: 'النجارة',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop',
      description: 'أعمال الخشب والأثاث المخصص'
    },
    {
      id: 'security',
      name: 'كاميرات المراقبة',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      description: 'تركيب وصيانة أنظمة الأمان'
    },
    {
      id: 'construction',
      name: 'البناء والمقاولات',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop',
      description: 'أعمال البناء والتشييد'
    },
    {
      id: 'gardening',
      name: 'تنسيق الحدائق',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      description: 'تصميم وصيانة المساحات الخضراء'
    },
    {
      id: 'cleaning',
      name: 'تنظيف المنازل',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
      description: 'خدمات التنظيف الشاملة للمنازل'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" dir="rtl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            الخدمات الأكثر شيوعاً
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أكثر الفئات طلباً واعثر على الخدمة المثالية لاحتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/services?category=${encodeURIComponent(category.name)}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 right-4 text-white text-right" dir="rtl">
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-white/90">{category.description}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <span>عرض جميع الفئات</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Categories