'use client'

import { useState } from 'react'
import { Star, MapPin, Clock, Shield, ArrowRight } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import ServicePackages from '@/components/ServicePackages'
import WorkAreas from '@/components/WorkAreas'
import PricingCalculator from '@/components/PricingCalculator'
import Image from 'next/image';

export default function ServicePage({ params }: { params: { id: string } }) {
  const [selectedPackage, setSelectedPackage] = useState<number>(0)
  const [selectedArea, setSelectedArea] = useState<string>('')

  const service = {
    id: params.id,
    title: 'خدمات الكهرباء المنزلية - تركيب وصيانة',
    provider: {
      name: 'أحمد محمد الكهربائي',
      rating: 4.9,
      reviews: 127,
      avatar: '/provider-avatar.jpg',
      verified: true
    },
    images: ['/service-1.jpg', '/service-2.jpg', '/service-3.jpg'],
    description: 'خدمات كهربائية شاملة للمنازل والمكاتب. تركيب وصيانة الأسلاك، المفاتيح، الإضاءة، وحل جميع المشاكل الكهربائية.',
    basePrice: 150
  }

  const packages = [
    {
      type: 'BASIC' as const,
      title: 'الباقة الأساسية',
      price: 150,
      features: [
        'فحص المشكلة وتشخيصها',
        'إصلاح بسيط للأعطال',
        'ضمان 30 يوم على العمل'
      ],
      deliveryTime: 2,
      revisions: 1
    },
    {
      type: 'STANDARD' as const,
      title: 'الباقة المتقدمة',
      price: 280,
      features: [
        'فحص شامل للنظام الكهربائي',
        'إصلاح متوسط التعقيد',
        'تركيب مفاتيح ومقابس جديدة',
        'ضمان 60 يوم على العمل'
      ],
      deliveryTime: 4,
      revisions: 2
    },
    {
      type: 'PREMIUM' as const,
      title: 'الباقة الشاملة',
      price: 450,
      features: [
        'فحص وصيانة شاملة',
        'تركيب نظام إضاءة كامل',
        'تحديث اللوحة الكهربائية',
        'خدمة طوارئ 24/7',
        'ضمان 90 يوم على العمل'
      ],
      deliveryTime: 6,
      revisions: -1
    }
  ]

  const workAreas = [
    {
      id: 'north',
      name: 'شمال الرياض',
      districts: ['الملقا', 'الياسمين', 'النرجس', 'الربوة', 'الصحافة'],
      travelTime: '15-30 دقيقة',
      isAvailable: true
    },
    {
      id: 'center',
      name: 'وسط الرياض',
      districts: ['الملز', 'البطحاء', 'الديرة', 'المربع'],
      travelTime: '10-20 دقيقة',
      isAvailable: true
    },
    {
      id: 'south',
      name: 'جنوب الرياض',
      districts: ['الدمام', 'الفيصلية', 'الشفا'],
      travelTime: '25-40 دقيقة',
      additionalFee: 25,
      isAvailable: true
    },
    {
      id: 'east',
      name: 'شرق الرياض',
      districts: ['الرحمانية', 'الروضة', 'المونسية'],
      travelTime: '30-45 دقيقة',
      additionalFee: 35,
      isAvailable: false
    }
  ]

  const selectedAreaData = workAreas.find(area => area.id === selectedArea)

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6" dir="rtl">
          <a href="/" className="hover:text-[#1ab7ea]">الرئيسية</a>
          <ArrowRight className="h-4 w-4 rotate-180" />
          <a href="/services" className="hover:text-[#1ab7ea]">الخدمات</a>
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span className="text-gray-900">خدمات الكهرباء</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6" dir="rtl">
              <div className="flex items-start gap-4 mb-6">
                <Image
                  src={service.provider.avatar}
                  alt={service.provider.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 text-right">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h1>
                  <div className="flex items-center gap-4 justify-end">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.provider.rating}</span>
                      <span className="text-gray-500">({service.provider.reviews} تقييم)</span>
                    </div>
                    {service.provider.verified && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm">موثق</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{service.provider.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {service.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`صورة الخدمة ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed text-right">{service.description}</p>
            </div>

            <ServicePackages
              packages={packages}
              selectedPackage={selectedPackage}
              onSelectPackage={setSelectedPackage}
              onOrder={() => console.log('Order placed')}
            />

            <WorkAreas
              areas={workAreas}
              selectedArea={selectedArea}
              onSelectArea={setSelectedArea}
            />
          </div>

          <div className="space-y-6">
            <PricingCalculator
              basePrice={packages[selectedPackage]?.price || service.basePrice}
              workArea={selectedArea}
              additionalFees={{
                travel: selectedAreaData?.additionalFee,
                urgency: 50,
                materials: 100
              }}
            />

            <div className="bg-white rounded-xl shadow-lg p-6" dir="rtl">
              <h3 className="font-bold text-gray-900 mb-4 text-right">معلومات سريعة</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">وقت الاستجابة</span>
                  <span className="font-medium">خلال ساعة</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">متوسط وقت الإنجاز</span>
                  <span className="font-medium">2-6 ساعات</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الضمان</span>
                  <span className="font-medium">30-90 يوم</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">طريقة الدفع</span>
                  <span className="font-medium">نقداً أو بطاقة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}