'use client'

import { useState, useEffect } from 'react'
import { Bell, ShoppingCart, MessageCircle, Star, X } from 'lucide-react'

interface Notification {
  id: string
  type: 'order' | 'message' | 'review' | 'system'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'طلب جديد',
    message: 'تم طلب خدمة "تصميم شعار احترافي" بقيمة $50',
    isRead: false,
    createdAt: '2024-02-21T10:30:00Z',
    actionUrl: '/orders/1'
  },
  {
    id: '2',
    type: 'message',
    title: 'رسالة جديدة',
    message: 'أحمد محمد أرسل لك رسالة جديدة',
    isRead: false,
    createdAt: '2024-02-21T09:15:00Z',
    actionUrl: '/messages'
  },
  {
    id: '3',
    type: 'review',
    title: 'تقييم جديد',
    message: 'حصلت على تقييم 5 نجوم من عميل سابق',
    isRead: true,
    createdAt: '2024-02-20T16:45:00Z',
    actionUrl: '/profile/reviews'
  }
]

interface NotificationSystemProps {
  className?: string
}

export default function NotificationSystem({ className = '' }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const count = notifications.filter(n => !n.isRead).length
    setUnreadCount(count)
  }, [notifications])

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4 text-green-600" />
      case 'message':
        return <MessageCircle className="h-4 w-4 text-blue-600" />
      case 'review':
        return <Star className="h-4 w-4 text-yellow-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`
    } else if (diffInMinutes < 1440) {
      return `منذ ${Math.floor(diffInMinutes / 60)} ساعة`
    } else {
      return `منذ ${Math.floor(diffInMinutes / 1440)} يوم`
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-green-400 transition-colors"
      >
        <Bell className="h-5 w-5 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center animate-pulse px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900" dir="rtl">الإشعارات</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  تحديد الكل كمقروء
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900 truncate" dir="rtl">
                            {notification.title}
                          </h4>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2" dir="rtl">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {formatTime(notification.createdAt)}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-green-600 hover:text-green-700"
                              >
                                تحديد كمقروء
                              </button>
                            )}
                            
                            {notification.actionUrl && (
                              <a
                                href={notification.actionUrl}
                                className="text-xs text-blue-600 hover:text-blue-700"
                                onClick={() => setIsOpen(false)}
                              >
                                عرض
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>لا توجد إشعارات جديدة</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 text-center">
                <a
                  href="/notifications"
                  className="text-sm text-green-600 hover:text-green-700"
                  onClick={() => setIsOpen(false)}
                >
                  عرض جميع الإشعارات
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}