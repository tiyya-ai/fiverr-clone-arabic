'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import VerificationBadge, { VerificationBadges, VerificationScore } from '@/components/VerificationBadge'
import { Star, MapPin, Calendar, MessageCircle, Heart, Share2, Award, Clock, Shield, Eye } from 'lucide-react'
import { getUserById, getServicesByUserId, getReviewsByServiceId } from '@/data/mockData'
import Image from 'next/image';

export default function PublicProfilePage() {
  const params = useParams()
  const username = params?.username as string
  const [user, setUser] = useState<any>(null)
  const [userServices, setUserServices] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('services')

  useEffect(() => {
    // In real app, fetch user by username
    const userData = getUserById('1') // Mock data
    setUser(userData)
    
    if (userData) {
      const services = getServicesByUserId(userData.id)
      setUserServices(services)
    }
  }, [username])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">المستخدم غير موجود</h2>
            <a href="/services" className="text-[#1ab7ea] hover:underline">تصفح جميع الخدمات</a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Info */}
            <div className="flex items-start gap-6">
              <Image 
                src={user.avatar} 
                alt={user.fullName}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full border-4 border-gray-200"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
                  {user.isVerified && (
                    <VerificationBadge type="verified" size="md" showLabel={false} />
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>عضو منذ {user.memberSince}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold">{user.rating}</span>
                    <span className="text-gray-500">({user.totalReviews} تقييم)</span>
                  </div>
                  <div className="text-gray-500">
                    {user.totalSales} طلب مكتمل
                  </div>
                </div>

                {/* Verification Info */}
                {user.verificationBadges && user.verificationBadges.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-3">
                      <VerificationBadges badges={user.verificationBadges} maxShow={5} size="sm" />
                      {user.verificationScore && (
                        <VerificationScore score={user.verificationScore} size="sm" />
                      )}
                    </div>
                  </div>
                )}
                
                <p className="text-gray-700 leading-relaxed mb-6" dir="rtl">{user.bio}</p>
                
                {/* Skills */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2" dir="rtl">المهارات</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:w-48">
              <button className="bg-[#1ab7ea] text-white px-6 py-3 rounded-lg hover:bg-[#0ea5d9] font-medium flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                تواصل معي
              </button>
              
              <div className="flex gap-2">
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex gap-8">
            {[
              { id: 'services', label: 'الخدمات', count: userServices.length },
              { id: 'reviews', label: 'التقييمات', count: user.totalReviews },
              { id: 'about', label: 'نبذة عني', count: null }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 font-medium text-sm border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#1ab7ea] text-[#1ab7ea]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label} {tab.count !== null && `(${tab.count})`}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userServices.map((service: any) => (
              <div key={service.id} className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <Image
                  src={service.images[0]}
                  alt={service.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2" dir="rtl">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{service.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({service.totalReviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {service.packages[0]?.price} ر.س
                    </span>
                    <a
                      href={`/services/${service.id}`}
                      className="text-[#1ab7ea] hover:text-[#0ea5d9] text-sm font-medium"
                    >
                      عرض التفاصيل
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {userServices.slice(0, 3).map(service => {
              const reviews = getReviewsByServiceId(service.id)
              return reviews.map(review => {
                const reviewUser = getUserById(review.userId)
                return (
                  <div key={review.id} className="bg-white rounded-lg border p-6">
                    <div className="flex items-start gap-4">
                      <Image 
                        src={reviewUser?.avatar || '/img/noavatar.jpg'} 
                        alt={reviewUser?.fullName || ''}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{reviewUser?.fullName}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">منذ أسبوعين</span>
                        </div>
                        <p className="text-gray-700 mb-2" dir="rtl">{review.comment}</p>
                        <p className="text-sm text-gray-500" dir="rtl">الخدمة: {service.title}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            })}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white rounded-lg border p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4" dir="rtl">معلومات عامة</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">وقت الاستجابة</span>
                    <span className="font-medium">{user.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">اللغات</span>
                    <span className="font-medium">{user.languages.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">عضو منذ</span>
                    <span className="font-medium">{user.memberSince}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4" dir="rtl">الإحصائيات</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الطلبات المكتملة</span>
                    <span className="font-medium">{user.totalSales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">متوسط التقييم</span>
                    <span className="font-medium">{user.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">إجمالي التقييمات</span>
                    <span className="font-medium">{user.totalReviews}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}