'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">تواصل معنا</h1>
          <p className="text-xl text-gray-600">نحن هنا لمساعدتك في أي وقت</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">أرسل لنا رسالة</h2>
            <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الاسم</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  placeholder="اسمك الكامل"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  placeholder="example@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الموضوع</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  placeholder="موضوع الرسالة"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الرسالة</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                إرسال الرسالة
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">معلومات التواصل</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4" dir="rtl">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">الهاتف</h3>
                    <p className="text-gray-600">+966 12 345 6789</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4" dir="rtl">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">البريد الإلكتروني</h3>
                    <p className="text-gray-600">info@wbl3.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4" dir="rtl">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">العنوان</h3>
                    <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4" dir="rtl">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ساعات العمل</h3>
                    <p className="text-gray-600">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                  </div>
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