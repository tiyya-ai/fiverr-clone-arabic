'use client'

import { useState, useEffect } from 'react'
import { Bell, X, CheckCircle, AlertTriangle, Info, AlertCircle, Clock } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'طلب جديد',
      message: 'تم استلام طلب جديد من علي أحمد لخدمة تصميم الشعار',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'نزاع جديد',
      message: 'تم فتح نزاع جديد بين محمد حسن وسارة علي',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'خدمة جديدة',
      message: 'تم نشر خدمة جديدة في قسم البرمجة تحتاج للمراجعة',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'فشل في الدفع',
      message: 'فشل في معالجة دفعة بقيمة 250$ للبائع أحمد محمد',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: false
    }
  ])
  
  const [showDropdown, setShowDropdown] = useState(false)
  const [showToast, setShowToast] = useState<Notification | null>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'الآن'
    if (minutes < 60) return `منذ ${minutes} دقيقة`
    if (hours < 24) return `منذ ${hours} ساعة`
    return `منذ ${days} يوم`
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['success', 'warning', 'info', 'error'][Math.floor(Math.random() * 4)] as Notification['type'],
          title: 'إشعار جديد',
          message: 'تم إضافة إشعار تجريبي جديد',
          timestamp: new Date(),
          read: false
        }
        
        setNotifications(prev => [newNotification, ...prev])
        setShowToast(newNotification)
        
        // Hide toast after 5 seconds
        setTimeout(() => setShowToast(null), 5000)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="relative p-2 text-white hover:text-[#1ab7ea] transition-colors"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">الإشعارات</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      تحديد الكل كمقروء
                    </button>
                  )}
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>لا توجد إشعارات</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium text-gray-900 ${
                            !notification.read ? 'font-bold' : ''
                          }`}>
                            {notification.title}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 text-right">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {getTimeAgo(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        {notification.action && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              notification.action!.onClick()
                            }}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                  عرض جميع الإشعارات
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
            <div className="flex items-start gap-3">
              {getIcon(showToast.type)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">
                  {showToast.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 text-right">
                  {showToast.message}
                </p>
              </div>
              <button
                onClick={() => setShowToast(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  )
}