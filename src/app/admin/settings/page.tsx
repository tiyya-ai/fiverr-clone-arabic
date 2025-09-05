'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Settings, Globe, DollarSign, Shield, Bell, Mail, Database, Palette, Users } from 'lucide-react'

interface SiteSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  contactEmail: string
  supportEmail: string
  currency: string
  language: string
  timezone: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  emailVerificationRequired: boolean
  commissionRate: number
  premiumCommissionRate: number
  minWithdrawal: number
  maxFileSize: number
  allowedFileTypes: string[]
  primaryColor: string
  secondaryColor: string
  logoUrl: string
  faviconUrl: string
  socialLinks: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
  }
  seoSettings: {
    metaTitle: string
    metaDescription: string
    keywords: string
  }
  emailSettings: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  paymentSettings: {
    paypalEnabled: boolean
    stripeEnabled: boolean
    bankTransferEnabled: boolean
    paypalClientId: string
    stripePublishableKey: string
  }
}

export default function AdminSettings() {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'منصة الخدمات المنزلية',
    siteDescription: 'اعثر على أفضل الحرفيين لصيانة منزلك',
    siteUrl: 'https://wbl3.com',
    contactEmail: 'info@wbl3.com',
    supportEmail: 'support@wbl3.com',
    currency: 'SAR',
    language: 'ar',
    timezone: 'Asia/Riyadh',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    commissionRate: 20,
    premiumCommissionRate: 15,
    minWithdrawal: 100,
    maxFileSize: 10,
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    primaryColor: '#16a34a',
    secondaryColor: '#1dbf73',
    logoUrl: 'https://wbl3.com/wp-content/uploads/2022/09/1042165_6877-Converted-1-768x308-1.webp',
    faviconUrl: '/favicon.ico',
    socialLinks: {
      facebook: 'https://facebook.com/wbl3',
      twitter: 'https://twitter.com/wbl3',
      instagram: 'https://instagram.com/wbl3',
      linkedin: 'https://linkedin.com/company/wbl3'
    },
    seoSettings: {
      metaTitle: 'منصة الخدمات المنزلية - WBL3',
      metaDescription: 'اعثر على أفضل الحرفيين لصيانة منزلك - كهرباء، سباكة، تكييف، نجارة وجميع خدمات الصيانة المنزلية',
      keywords: 'صيانة منزلية، كهرباء، سباكة، تكييف، نجارة، حرفيين، خدمات منزلية'
    },
    emailSettings: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'noreply@wbl3.com',
      fromName: 'منصة الخدمات المنزلية'
    },
    paymentSettings: {
      paypalEnabled: true,
      stripeEnabled: true,
      bankTransferEnabled: true,
      paypalClientId: '',
      stripePublishableKey: ''
    }
  })

  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
      return
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('adminSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [router])

  const handleSave = async () => {
    setSaving(true)
    try {
      // Save to localStorage (in real app, this would be an API call)
      localStorage.setItem('adminSettings', JSON.stringify(settings))
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section as keyof SiteSettings] === 'object' 
        ? { ...prev[section as keyof SiteSettings] as any, [field]: value }
        : value
    }))
  }

  const tabs = [
    { id: 'general', name: 'عام', icon: Settings },
    { id: 'financial', name: 'مالي', icon: DollarSign },
    { id: 'appearance', name: 'المظهر', icon: Palette },
    { id: 'users', name: 'المستخدمين', icon: Users },
    { id: 'email', name: 'البريد الإلكتروني', icon: Mail },
    { id: 'payment', name: 'المدفوعات', icon: Shield },
    { id: 'seo', name: 'SEO', icon: Globe },
    { id: 'system', name: 'النظام', icon: Database }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الموقع</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                dir="rtl"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف الموقع</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                dir="rtl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رابط الموقع</label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">بريد التواصل</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                  <option value="EUR">يورو (EUR)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة الزمنية</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Asia/Riyadh">الرياض</option>
                  <option value="Asia/Dubai">دبي</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenance"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="maintenance" className="mr-2 block text-sm text-gray-900">
                  وضع الصيانة
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="registration"
                  checked={settings.registrationEnabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, registrationEnabled: e.target.checked }))}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="registration" className="mr-2 block text-sm text-gray-900">
                  السماح بالتسجيل الجديد
                </label>
              </div>
            </div>
          </div>
        )

      case 'financial':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نسبة العمولة الافتراضية (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.commissionRate}
                  onChange={(e) => setSettings(prev => ({ ...prev, commissionRate: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نسبة عمولة البائعين المميزين (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.premiumCommissionRate}
                  onChange={(e) => setSettings(prev => ({ ...prev, premiumCommissionRate: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للسحب ({settings.currency})</label>
              <input
                type="number"
                min="0"
                value={settings.minWithdrawal}
                onChange={(e) => setSettings(prev => ({ ...prev, minWithdrawal: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        )

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون الأساسي</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="h-10 w-20 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون الثانوي</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    className="h-10 w-20 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رابط الشعار</label>
              <input
                type="url"
                value={settings.logoUrl}
                onChange={(e) => setSettings(prev => ({ ...prev, logoUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              {settings.logoUrl && (
                <div className="mt-3">
                  <img src={settings.logoUrl} alt="Logo Preview" className="h-12 object-contain" />
                </div>
              )}
            </div>
          </div>
        )

      case 'seo':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الصفحة الرئيسية</label>
              <input
                type="text"
                value={settings.seoSettings.metaTitle}
                onChange={(e) => handleInputChange('seoSettings', 'metaTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                dir="rtl"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف الصفحة الرئيسية</label>
              <textarea
                value={settings.seoSettings.metaDescription}
                onChange={(e) => handleInputChange('seoSettings', 'metaDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الكلمات المفتاحية</label>
              <input
                type="text"
                value={settings.seoSettings.keywords}
                onChange={(e) => handleInputChange('seoSettings', 'keywords', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="كلمة1, كلمة2, كلمة3"
                dir="rtl"
              />
            </div>
          </div>
        )

      default:
        return <div>المحتوى قيد التطوير...</div>
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">إعدادات النظام</h1>
        <p className="text-gray-600" dir="rtl">إدارة جميع إعدادات الموقع والنظام</p>
      </div>

      <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" dir="rtl">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>

          {/* Save Button */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <div>
              {saved && (
                <span className="text-green-600 text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  تم حفظ الإعدادات بنجاح
                </span>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </button>
          </div>
        </div>
    </div>
  )
}