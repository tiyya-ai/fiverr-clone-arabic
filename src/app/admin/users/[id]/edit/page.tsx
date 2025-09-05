'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowRight, User, Mail, Phone, Calendar, Shield } from 'lucide-react'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    userType: 'buyer',
    status: 'active',
    memberSince: '',
    bio: ''
  })
  const [loading, setLoading] = useState(true)

  // Mock data - in real app, fetch from API
  useEffect(() => {
    setTimeout(() => {
      const mockUser = {
        fullName: 'أحمد محمد',
        username: 'ahmed_mohamed',
        email: 'ahmed@example.com',
        phone: '+966501234567',
        userType: 'seller',
        status: 'active',
        memberSince: '2024-01-15',
        bio: 'مطور مواقع ومصمم جرافيك محترف'
      }
      setFormData(mockUser)
      setLoading(false)
    }, 500)
  }, [userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert('يرجى ملء الحقول المطلوبة')
      return
    }

    // Here you would typically send the data to your API
    alert('تم تحديث بيانات المستخدم بنجاح!')
    router.push('/admin/users')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل بيانات المستخدم...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تعديل المستخدم</h1>
          <p className="text-gray-600 mt-2">تعديل بيانات المستخدم #{userId}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              الاسم الكامل *
            </label>
            <div className="relative">
              <User className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              اسم المستخدم *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني *
            </label>
            <div className="relative">
              <Mail className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              رقم الهاتف
            </label>
            <div className="relative">
              <Phone className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
              نوع المستخدم
            </label>
            <div className="relative">
              <Shield className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="buyer">مشتري</option>
                <option value="seller">بائع</option>
                <option value="admin">مدير</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              حالة الحساب
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">نشط</option>
              <option value="suspended">معلق</option>
              <option value="banned">محظور</option>
            </select>
          </div>
        </div>

        {/* Member Since */}
        <div>
          <label htmlFor="memberSince" className="block text-sm font-medium text-gray-700 mb-2">
            عضو منذ
          </label>
          <div className="relative">
            <Calendar className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              id="memberSince"
              name="memberSince"
              value={formData.memberSince}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            النبذة الشخصية
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="نبذة مختصرة عن المستخدم..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
          >
            حفظ التغييرات
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  )
}