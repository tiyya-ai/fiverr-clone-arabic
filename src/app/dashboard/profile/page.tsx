'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import VerificationBadge, { VerificationBadges, VerificationScore } from '@/components/VerificationBadge'
import { Camera, Save, Eye, Edit, MapPin, Phone, Mail, Globe, Award, Plus, X } from 'lucide-react'
import { getUserById, User as UserType } from '@/data/mockData'
import Image from 'next/image';

export default function ProfileManagementPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    location: '',
    skills: [] as string[],
    languages: [] as string[],
    phone: '',
    email: '',
    website: ''
  })
  const [newSkill, setNewSkill] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/api/auth/signin')
      return
    }
    
    const userId = session?.user?.id || '1'
    const userData = getUserById(userId)
    setUser(userData)
    if (userData) {
      setFormData({
        fullName: userData.fullName,
        bio: userData.bio,
        location: userData.location,
        skills: userData.skills || [],
        languages: userData.languages || [],
        phone: '0501234567',
        email: session?.user?.email || 'user@example.com',
        website: 'www.example.com'
      })
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

  const handleSave = () => {
    // Save profile data
    setIsEditing(false)
    alert('تم حفظ التغييرات بنجاح!')
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      })
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    })
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()]
      })
      setNewLanguage('')
    }
  }

  const removeLanguage = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(l => l !== language)
    })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">إدارة الملف الشخصي</h1>
            <p className="text-gray-600" dir="rtl">قم بتحديث معلوماتك الشخصية لجذب المزيد من العملاء</p>
          </div>
          <div className="flex gap-3">
            <a
              href={`/profile/${user.username || user.fullName.replace(/\s+/g, '-').toLowerCase()}`}
              target="_blank"
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              معاينة الملف العام
            </a>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-[#1ab7ea] text-white px-4 py-2 rounded-lg hover:bg-[#0ea5d9]"
              >
                <Edit className="w-4 h-4" />
                تعديل
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  حفظ
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Image 
                    src={user.avatar} 
                    alt={user.fullName}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full border-4 border-gray-200 mx-auto"
                  />
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 bg-[#1ab7ea] text-white p-2 rounded-full hover:bg-[#0ea5d9]">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-gray-900">{user.fullName}</h2>
                  <p className="text-gray-600">@{user.username || user.fullName.replace(/\s+/g, '-').toLowerCase()}</p>
                </div>
              </div>

              {/* Verification Status */}
              {user.verificationBadges && user.verificationBadges.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3" dir="rtl">حالة التحقق</h3>
                  <div className="space-y-2">
                    <VerificationScore score={user.verificationScore} size="md" />
                    <VerificationBadges badges={user.verificationBadges} maxShow={5} size="sm" />
                  </div>
                  <a
                    href="/verification"
                    className="inline-flex items-center gap-2 text-[#1ab7ea] hover:text-[#0ea5d9] text-sm mt-2"
                  >
                    <Award className="w-4 h-4" />
                    تحسين التحقق
                  </a>
                </div>
              )}

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">الطلبات المكتملة</span>
                  <span className="font-semibold">{user.totalSales}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">متوسط التقييم</span>
                  <span className="font-semibold">{user.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">وقت الاستجابة</span>
                  <span className="font-semibold">{user.responseTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold mb-6" dir="rtl">المعلومات الشخصية</h3>
              
              <div className="space-y-6">
                {/* Full Name */}
                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.fullName}</p>
                  )}
                </div>

                {/* Bio */}
                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">نبذة عني</label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right"
                      placeholder="اكتب نبذة مختصرة عن خبرتك ومهاراتك..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div dir="rtl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                    {isEditing ? (
                      <div className="relative">
                        <MapPin className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-right"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-700">{formData.location}</p>
                    )}
                  </div>

                  <div dir="rtl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                    {isEditing ? (
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-right"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-700">{formData.phone}</p>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">المهارات</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="أضف مهارة جديدة"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-right text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <button
                        onClick={addSkill}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Languages */}
                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللغات</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.languages.map((language, index) => (
                      <span key={index} className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {language}
                        {isEditing && (
                          <button
                            onClick={() => removeLanguage(language)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        placeholder="أضف لغة جديدة"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-right text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                      />
                      <button
                        onClick={addLanguage}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}