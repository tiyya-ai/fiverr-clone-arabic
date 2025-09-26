'use client'

import Link from 'next/link'
import { Star, Heart, MapPin } from 'lucide-react'
import Image from 'next/image';

interface UnifiedCardProps {
  type?: 'service' | 'category' | 'project'
  data: any
  linkTo: string
  className?: string
  onClick?: () => void
}

const UnifiedCard = ({ 
  type = 'service', 
  data, 
  linkTo, 
  className = '',
  onClick 
}: UnifiedCardProps) => {
  const CardContent = () => {
    switch (type) {
      case 'service':
        return (
          <div className="service-card flex flex-col h-full">
            <div className="card-image relative overflow-hidden">
              <Image 
                src={data.cover || data.images?.[0] || data.img} 
                alt={data.title} 
                width={300}
                height={170}
                className="w-full h-44 object-cover"
              />
              <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <div className="card-content p-4 flex flex-col flex-grow">
              <div className="seller-info flex items-center gap-2 mb-2 text-right" dir="rtl">
                <Image 
                  src={data.sellerPp || "/img/noavatar.jpg"} 
                  alt={data.sellerName || ""} 
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-gray-700">
                  {data.sellerName || data.fullName || "أحمد محمد الحرفي"}
                </span>
              </div>
              <h4 className="card-title text-right font-medium text-gray-800 line-clamp-2 mb-3 flex-grow" dir="rtl">
                {data.title || data.desc}
              </h4>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 text-gray-500 ml-1" />
                  <span className="text-sm text-gray-500">السعودية</span>
                </div>
                <div className="rating flex items-center gap-1" dir="rtl">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-gray-800">
                    {data.rating || "4.9"}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({data.reviews || data.totalReviews || "123"})
                  </span>
                </div>
              </div>
              <div className="text-right mb-3">
                <span className="text-sm text-gray-500">{data.category || "تصميم وبرمجة"}</span>
              </div>
              <div className="price flex items-center justify-between border-t pt-3" dir="rtl">
                <strong className="text-xl font-bold text-gray-900">
                  {data.price || data.packages?.[0]?.price} ريال سعودي
                </strong>
                <span className="text-sm text-gray-500">ابتداءً من</span>
              </div>
            </div>
          </div>
        )
      
      case 'category':
        return (
          <div className="category-card p-6 text-center">
            <div className="category-icon mb-4 flex justify-center">
              <div className="w-16 h-16 flex items-center justify-center">
                {data.icon ? (
                  <Image src={data.icon} alt={data.title} width={48} height={48} className="w-12 h-12 object-contain" />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {data.title?.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <h4 className="font-bold text-gray-800 mb-2" dir="rtl">{data.title}</h4>
            <p className="text-sm text-gray-600" dir="rtl">{data.description}</p>
          </div>
        )
      
      case 'project':
        return (
          <div className="project-card">
            <div className="card-image relative overflow-hidden">
              <Image 
                src={data.img} 
                alt={data.cat} 
                width={300}
                height={200}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="card-content p-4">
              <div className="project-info flex items-center gap-3" dir="rtl">
                <Image 
                  src={data.pp} 
                  alt="Creator" 
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="project-details text-right">
                  <h5 className="font-semibold text-gray-800 text-sm">{data.cat}</h5>
                  <span className="text-xs text-gray-500">بواسطة {data.username}</span>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return <div>نوع بطاقة غير معروف</div>
    }
  }

  const cardClasses = `
    group card border border-gray-200 rounded-xl overflow-hidden cursor-pointer 
    transition-all duration-300 hover:shadow-xl hover:border-[#1ab7ea] 
    hover:-translate-y-1 bg-white ${className}
  `.trim()

  if (onClick) {
    return (
      <div className={cardClasses} onClick={onClick}>
        <CardContent />
      </div>
    )
  }

  return (
    <Link href={linkTo} className="block">
      <div className={cardClasses}>
        <CardContent />
      </div>
    </Link>
  )
}

export default UnifiedCard