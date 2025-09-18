'use client'

import React, { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin?: (userType: 'user' | 'admin' | 'seller') => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    username: '',
    phone: '',
    userType: 'BUYER',
    acceptTerms: false
  })
  const [errors, setErrors] = useState<string>('')

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })
        
        if (result?.error) {
          setErrors('بيانات الدخول غير صحيحة')
        } else if (result?.ok) {
          // Check if session is created
          const session = await getSession()
          if (session) {
            onClose()
            setFormData({ email: '', password: '', fullName: '', username: '', phone: '', userType: 'BUYER', acceptTerms: false })
            // Refresh the page to update the UI
            window.location.reload()
          }
        }
      } else {
        // Registration logic
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            username: formData.username,
            phone: formData.phone,
            userType: formData.userType,
            acceptTerms: formData.acceptTerms,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setErrors(data.error || 'فشل في إنشاء الحساب')
        } else {
          // Auto login after registration
          const loginResult = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
          })
          
          if (loginResult?.ok) {
            onClose()
            setFormData({ email: '', password: '', fullName: '', username: '', phone: '', userType: 'BUYER', acceptTerms: false })
            window.location.reload()
          }
        }
      }
    } catch (error) {
      setErrors('حدث خطأ غير متوقع')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      await signIn(provider, { 
        callbackUrl: window.location.href,
        redirect: true 
      })
      onClose()
    } catch (error) {
      setErrors('فشل تسجيل الدخول')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-4">
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            تسجيل الدخول بـ Google
          </button>
          
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            تسجيل الدخول بـ Facebook
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">أو</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Login/Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {errors}
            </div>
          )}

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="اسم المستخدم (أحرف وأرقام فقط)"
                  pattern="[a-zA-Z0-9_]+"
                  minLength={3}
                  maxLength={30}
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نوع الحساب
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="BUYER">مشتري</option>
                  <option value="SELLER">بائع</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label className="text-sm text-gray-700">
                  أوافق على <a href="/terms" className="text-blue-500 hover:underline">الشروط والأحكام</a>
                </label>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (mode === 'login' ? 'جاري تسجيل الدخول...' : 'جاري إنشاء الحساب...') : (mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
          </span>
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium mr-1"
          >
            {mode === 'login' ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal