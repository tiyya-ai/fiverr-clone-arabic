'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    userType: 'BUYER'
  })
  const [error, setError] = useState('')
  const { register, loading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await register(formData)
    if (result.success) {
      router.push('/dashboard/services')
    } else {
      setError(result.error || 'فشل في إنشاء الحساب')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900" dir="rtl">إنشاء حساب جديد</h1>
            <p className="text-gray-600 mt-2" dir="rtl">انضم إلى منصة WBL3</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" dir="rtl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div dir="rtl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                  required
                />
              </div>
              <div dir="rtl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأخير
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                  required
                />
              </div>
            </div>

            <div dir="rtl">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                required
              />
            </div>

            <div dir="rtl">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                placeholder="+966xxxxxxxxx"
              />
            </div>

            <div dir="rtl">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                required
              />
            </div>

            <div dir="rtl">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع الحساب
              </label>
              <select
                value={formData.userType}
                onChange={(e) => setFormData({...formData, userType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
              >
                <option value="BUYER">عميل</option>
                <option value="SELLER">مقدم خدمة</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600" dir="rtl">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}