'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Save, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CreateUserPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    userType: 'buyer',
    phone: '',
    country: '',
    bio: ''
  })

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      alert('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    // Here you would implement the actual user creation logic
    alert(`تم إنشاء المستخدم ${formData.fullName} بنجاح`)
    router.push('/admin/users')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <button
          onClick={() => router.push('/admin/users')}
          className="text-blue-600 hover:text-blue-800"
        >
          المستخدمين
        </button>
        <span className="text-gray-500">/</span>
        <span className="text-gray-900">إضافة مستخدم جديد</span>
      </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                المعلومات الأساسية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل الاسم الكامل"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">اسم المستخدم *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل اسم المستخدم"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل البريد الإلكتروني"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">كلمة المرور *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">نوع المستخدم</label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="buyer">مشتري</option>
                    <option value="seller">بائع</option>
                    <option value="admin">مدير</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">معلومات إضافية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">البلد</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">اختر البلد</option>
                    <option value="SA">السعودية</option>
                    <option value="AE">الإمارات</option>
                    <option value="EG">مصر</option>
                    <option value="JO">الأردن</option>
                    <option value="LB">لبنان</option>
                    <option value="SY">سوريا</option>
                    <option value="IQ">العراق</option>
                    <option value="KW">الكويت</option>
                    <option value="QA">قطر</option>
                    <option value="BH">البحرين</option>
                    <option value="OM">عمان</option>
                    <option value="YE">اليمن</option>
                    <option value="MA">المغرب</option>
                    <option value="TN">تونس</option>
                    <option value="DZ">الجزائر</option>
                    <option value="LY">ليبيا</option>
                    <option value="SD">السودان</option>
                  </select>
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2">نبذة شخصية</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل نبذة شخصية (اختياري)"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                إنشاء المستخدم
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/users')}
                className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}