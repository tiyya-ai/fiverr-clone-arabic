'use client'

import Link from 'next/link'
import { Star, Heart } from 'lucide-react'
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
          <div className="service-card">
            <div className="card-image relative overflow-hidden">
              <Image 
                src={data.cover || data.images?.[0] || data.img} 
                alt={data.title} 
                width={300}
                height={200}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <div className="card-content p-4">
              <div className="seller-info mb-3 text-right" dir="rtl">
                <span className="text-sm font-bold text-gray-800">
                  {data.sellerName || data.fullName || "أحمد محمد الحرفي"}
                </span>
              </div>
              <h4 className="card-title text-right font-semibold text-gray-800 line-clamp-2 mb-3" dir="rtl">
                {data.title || data.desc}
              </h4>
              <div className="rating flex items-center gap-1 mb-3" dir="rtl">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-bold text-gray-700">
                  {data.rating || "4.9"}
                </span>
                <span className="text-xs text-gray-500">
                  ({data.reviews || data.totalReviews || "123"})
                </span>
              </div>
              <div className="price flex items-center justify-between" dir="rtl">
                <span className="text-sm text-gray-500">ابتداءً من</span>
                <strong className="text-lg font-bold text-gray-800">
                  {data.price || data.packages?.[0]?.price} ريال
                </strong>
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