'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, Star, Mail, Phone, Calendar, MapPin, Package, DollarSign, TrendingUp } from 'lucide-react'
import { mockUsers } from '@/data/mockData'

export default function AdminUserDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
      return
    }

    // Find user by ID
    const foundUser = mockUsers?.find(u => u.id === userId)
    if (foundUser) {
      setUser({
        id: foundUser.id,
        name: foundUser.fullName,
        username: foundUser.username,
        email: `${foundUser.username}@example.com`,
        phone: '+966 50 123 4567', // Mock phone
        type: foundUser.totalSales > 0 ? 'بائع' : 'مشتري',
        status: 'نشط',
        joinDate: foundUser.memberSince,
        orders: foundUser.totalSales || 0,
        rating: foundUser.rating,
        avatar: foundUser.fullName.charAt(0),
        location: 'الرياض، السعودية', // Mock location
        totalEarnings: foundUser.totalSales * 50 || 0, // Mock earnings
        completedProjects: foundUser.totalSales || 0,
        bio: foundUser.bio || 'لا يوجد وصف متاح',
        skills: foundUser.skills || [],
        languages: ['العربية', 'الإنجليزية']
      })
    }
    setLoading(false)
  }, [router, userId])

  const handleEditUser = () => {
    router.push(`/admin/users/${userId}/edit`)
  }

  const handleDeleteUser = () => {
    if (confirm(`هل أنت متأكد من حذف المستخدم: ${user.name}؟`)) {
      alert(`تم حذف المستخدم: ${user.name}`)
      router.push('/admin/users')
    }
  }

  const handleToggleStatus = () => {
    const newStatus = user.status === 'نشط' ? 'معلق' : 'نشط'
    setUser((prev: any) => ({ ...prev, status: newStatus }))
    alert(`تم تغيير حالة المستخدم إلى: ${newStatus}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">المستخدم غير موجود</h2>
        <p className="text-gray-600 mb-6">لم يتم العثور على المستخدم المطلوب</p>
        <button
          onClick={() => router.push('/admin/users')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          العودة إلى قائمة المستخدمين
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/users')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">تفاصيل المستخدم</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleEditUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            تعديل
          </button>
          <button
            onClick={handleDeleteUser}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            حذف
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-3xl">{user.avatar}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">@{user.username}</p>
              <div className="mt-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === 'نشط' ? 'bg-green-100 text-green-800' :
                  user.status === 'معلق' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{user.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">انضم في {user.joinDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-gray-700">التقييم: {user.rating}/5</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button
                onClick={handleToggleStatus}
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  user.status === 'نشط' 
                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {user.status === 'نشط' ? 'تعليق المستخدم' : 'تفعيل المستخدم'}
              </button>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-blue-600">{user.orders}</p>
                </div>
                <Package className="h-10 w-10 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">المشاريع المكتملة</p>
                  <p className="text-2xl font-bold text-green-600">{user.completedProjects}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">إجمالي الأرباح</p>
                  <p className="text-2xl font-bold text-purple-600">${user.totalEarnings}</p>
                </div>
                <DollarSign className="h-10 w-10 text-purple-500" />
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات المستخدم</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع المستخدم</label>
                <p className="text-gray-900">{user.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانضمام</label>
                <p className="text-gray-900">{user.joinDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللغات</label>
                <div className="flex gap-2">
                  {user.languages.map((lang: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التقييم</label>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= user.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({user.rating}/5)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">نبذة عن المستخدم</h3>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>

          {/* Skills Section */}
          {user.skills && user.skills.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">المهارات</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Activity Log */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">سجل النشاط</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">تم تسجيل الدخول</p>
                  <p className="text-xs text-gray-500">منذ ساعتين</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">تم تحديث الملف الشخصي</p>
                  <p className="text-xs text-gray-500">منذ يوم واحد</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">تم إكمال طلب جديد</p>
                  <p className="text-xs text-gray-500">منذ 3 أيام</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}