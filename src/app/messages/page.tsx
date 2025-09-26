'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Send, Paperclip, Search, User } from 'lucide-react'

function MessagesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')

  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setTimeout(() => {
      const mockMessages = [
        {
          id: 1,
          sender: 'أحمد محمد',
          message: 'مرحبا، أريد تصميم شعار لشركتي',
          time: '2024-02-20 10:30',
          isAdmin: false
        },
        {
          id: 2,
          sender: 'فاطمة علي',
          message: 'أهلا وسهلا، يمكنني مساعدتك في ذلك',
          time: '2024-02-20 10:35',
          isAdmin: false
        },
        {
          id: 3,
          sender: 'مدير النظام',
          message: 'تم إنشاء الطلب بنجاح',
          time: '2024-02-20 10:40',
          isAdmin: true
        }
      ]
      setMessages(mockMessages)
      setLoading(false)
    }, 500)
  }, [orderId])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: 'مدير النظام',
      message: newMessage,
      time: new Date().toLocaleString('ar-SA'),
      isAdmin: true
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المراسلات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">المراسلات</h1>
          <p className="text-gray-600 mt-2">
            {orderId ? `مراسلات الطلب #${orderId}` : 'جميع المراسلات'}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-lg shadow flex flex-col h-96">
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isAdmin
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{message.sender}</span>
                </div>
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${message.isAdmin ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              إرسال
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
        <div className="flex gap-4">
          <button
            onClick={() => alert('تم إرسال تذكير للطرفين')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            إرسال تذكير
          </button>
          <button
            onClick={() => alert('تم إغلاق المحادثة')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            إغلاق المحادثة
          </button>
          <button
            onClick={() => router.push('/admin/disputes')}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
          >
            إنشاء نزاع
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <MessagesContent />
    </Suspense>
  )
}