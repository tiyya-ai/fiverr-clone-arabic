'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import { User, Star, MapPin, Calendar, Edit } from 'lucide-react'
import { getUserById, User as UserType } from '@/data/mockData'
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/api/auth/signin')
      return
    }
    
    const userId = session?.user?.id || '1'
    const userData = getUserById(userId)
    if (userData) {
      setUser(userData)
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session || !user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-start gap-6 mb-8">
            <Image 
              src={user.avatar} 
              alt={user.fullName}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full border-4 border-gray-200"
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Edit className="h-4 w-4" />
                  تعديل الملف الشخصي
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>عضو منذ {user.memberSince}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-bold">{user.rating}</span>
                <span className="text-gray-500">({user.totalReviews} تقييم)</span>
              </div>
              
              <p className="text-gray-700 leading-relaxed" dir="rtl">{user.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{user.totalSales}</div>
              <div className="text-sm text-gray-600">طلب مكتمل</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{user.rating}</div>
              <div className="text-sm text-gray-600">متوسط التقييم</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{user.responseTime}</div>
              <div className="text-sm text-gray-600">وقت الاستجابة</div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4" dir="rtl">المهارات</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}