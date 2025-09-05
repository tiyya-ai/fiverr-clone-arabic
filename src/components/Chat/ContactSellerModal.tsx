'use client'

import { useState } from 'react'
import { X, Send, MessageCircle, Clock, Star } from 'lucide-react'

interface ContactSellerModalProps {
  isOpen: boolean
  onClose: () => void
  seller: any
  service: any
}

export default function ContactSellerModal({ isOpen, onClose, seller, service }: ContactSellerModalProps) {
  const [message, setMessage] = useState('')
  const [step, setStep] = useState(1) // 1: كتابة الرسالة, 2: تأكيد الإرسال

  if (!isOpen) return null

  const handleSendMessage = () => {
    if (!message.trim()) return

    try {
      // Get current user ID
      const currentUserId = localStorage.getItem('currentUserId') || '1'
      
      // Create message object
      const newMessage = {
        id: Date.now().toString(),
        fromUserId: currentUserId, // Current user
        toUserId: seller.id || '2', // Seller ID
        content: message,
        isRead: false,
        createdAt: new Date().toISOString()
      }

      // Get existing messages from localStorage
      const existingMessages = JSON.parse(localStorage.getItem('allMessages') || '[]')
      const updatedMessages = [...existingMessages, newMessage]
      
      // Save to localStorage
      localStorage.setItem('allMessages', JSON.stringify(updatedMessages))
      
      console.log(`Message sent from ${currentUserId} to ${seller.id || '2'}:`, message)
      
      // Show success step
      setStep(2)
      
      // Auto-reply simulation
      setTimeout(() => {
        const autoReply = {
          id: (Date.now() + 1).toString(),
          fromUserId: seller.id || '2',
          toUserId: currentUserId,
          content: 'شكراً لتواصلك معي! سأراجع طلبك وأرد عليك قريباً.',
          isRead: false,
          createdAt: new Date().toISOString()
        }
        
        const currentMessages = JSON.parse(localStorage.getItem('allMessages') || '[]')
        localStorage.setItem('allMessages', JSON.stringify([...currentMessages, autoReply]))
        
        console.log(`Auto-reply sent from ${seller.id || '2'} to ${currentUserId}`)
        
        // Close modal and redirect
        onClose()
        setStep(1)
        setMessage('')
        window.location.href = '/messages'
      }, 2000)
      
    } catch (error) {
      console.error('Error sending message:', error)
      alert('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.')
    }
  }

  const quickMessages = [
    'مرحباً، أريد الاستفسار عن هذه الخدمة',
    'هل يمكنك تخصيص الخدمة حسب احتياجاتي؟',
    'كم من الوقت تحتاج لإنجاز العمل؟',
    'هل يمكنك إرسال عينات من أعمالك السابقة؟',
    'ما هي المتطلبات التي تحتاجها مني؟'
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900" dir="rtl">
            {step === 1 ? 'تواصل مع البائع' : 'تم إرسال الرسالة'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 1 && (
          <div className="p-6">
            {/* Seller Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={seller.avatar}
                  alt={seller.fullName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1" dir="rtl">
                    {seller.fullName}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{seller.rating} ({seller.totalReviews} تقييم)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>يرد خلال {seller.responseTime}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${seller.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${seller.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span>{seller.isOnline ? 'متصل الآن' : 'غير متصل'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Context */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2" dir="rtl">بخصوص الخدمة:</h4>
              <div className="flex gap-3">
                <img
                  src={service.images[0]}
                  alt={service.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-blue-900" dir="rtl">
                    {service.title}
                  </p>
                  <p className="text-sm text-blue-700">
                    ابتداءً من ${service.packages[0]?.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Messages */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3" dir="rtl">رسائل سريعة:</h4>
              <div className="space-y-2">
                {quickMessages.map((quickMsg, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(quickMsg)}
                    className="w-full text-right p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                    dir="rtl"
                  >
                    {quickMsg}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
                رسالتك:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
                dir="rtl"
              />
              <p className="text-xs text-gray-500 mt-1" dir="rtl">
                {message.length}/500 حرف
              </p>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-900 mb-2" dir="rtl">نصائح للحصول على رد سريع:</h4>
              <ul className="text-sm text-yellow-800 space-y-1" dir="rtl">
                <li>• كن واضحاً ومحدداً في طلبك</li>
                <li>• اذكر الميزانية والجدول الزمني المتوقع</li>
                <li>• أرفق أي ملفات أو مراجع مفيدة</li>
                <li>• كن مهذباً ومحترماً في التواصل</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                إرسال الرسالة
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">تم إرسال رسالتك!</h3>
            <p className="text-gray-600 mb-6" dir="rtl">
              سيتم إشعار {seller.fullName} برسالتك وسيرد عليك قريباً.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-500">جاري إعادة التوجيه إلى المحادثات...</p>
          </div>
        )}
      </div>
    </div>
  )
}