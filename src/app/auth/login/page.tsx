'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await login(formData)
    if (result.success) {
      router.push('/dashboard/services')
    } else {
      setError(result.error || 'فشل في تسجيل الدخول')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900" dir="rtl">تسجيل الدخول</h1>
            <p className="text-gray-600 mt-2" dir="rtl">ادخل إلى حسابك</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" dir="rtl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div dir="rtl">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                placeholder="example@email.com"
                required
              />
            </div>

            <div dir="rtl">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600" dir="rtl">
              ليس لديك حساب؟{' '}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-700">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}