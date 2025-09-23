'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Bell, User, MessageCircle, Heart, Plus, LogIn, UserPlus, ShoppingCart } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import MainNavigation from './Navigation/MainNavigation'
import MobileNavigation from './Navigation/MobileNavigation'
import NotificationSystem from './Notifications/NotificationSystem'
import LoginModal from './LoginModal'
import { sanitizeForLog } from '@/utils/sanitize'
import Image from 'next/image';

export default function MainHeader() {
  const { data: session, status } = useSession()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [pendingItem, setPendingItem] = useState<any>(null)

  // Get user info from session instead of localStorage
  const isLoggedIn = !!session
  const userType = session?.user?.userType || ''

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItems(cart)
      setCartCount(cart.length)
    }
  }, [])

  // Listen for cart updates
  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItems(cart)
      setCartCount(cart.length)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cartUpdated', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleStorageChange)
    }
  }, [])

  const handleLogout = async () => {
    await signOut({ redirect: false })
    if (typeof window !== 'undefined') {
      localStorage.clear()
      window.location.href = '/'
    }
  }

  const addToCart = useCallback((item: any) => {
    console.log('addToCart called with:', sanitizeForLog(item))
    console.log('isLoggedIn:', isLoggedIn)
    
    if (!isLoggedIn) {
      // For non-logged-in users, show login prompt
      console.log('Showing login prompt')
      setPendingItem(item)
      setShowLoginPrompt(true)
    } else {
      // For logged-in users, add directly to cart
      console.log('Adding to cart directly')
      const newItems = [...cartItems, item]
      setCartItems(newItems)
      setCartCount(newItems.length)
      setShowCartModal(true)
    }
  }, [cartItems, isLoggedIn])

  const handleLoginFromPrompt = () => {
    // Add the pending item to cart after login
    if (pendingItem) {
      const newItems = [...cartItems, pendingItem]
      setCartItems(newItems)
      setCartCount(newItems.length)
      localStorage.setItem('cart', JSON.stringify(newItems))
    }
    
    // Show login modal
    setShowLoginModal(true)
    setShowLoginPrompt(false)
    setPendingItem(null)
  }

  // Make addToCart available globally for other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).addToCart = addToCart
      console.log('addToCart function attached to window')
    }
  }, [cartItems, isLoggedIn, showLoginPrompt, addToCart])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white text-gray-700 py-2 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex gap-6">
              <a href="#" className="text-black hover:text-[#1ab7ea]">فايفر برو</a>
              <a href="/services" className="text-black hover:text-[#1ab7ea]">استكشف</a>
              <a href="#" className="text-black hover:text-[#1ab7ea]">العربية</a>
              <a href="/services/create" className="text-black hover:text-[#1ab7ea]">أصبح بائعاً</a>
            </div>
            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <button onClick={() => setShowLoginModal(true)} className="hover:text-[#00C7B7]">
                    دخول
                  </button>
                  <button onClick={() => setShowLoginModal(true)} className="hover:bg-[#00B5A5] text-white px-4 py-1 rounded bg-[#00C7B7]">
                    حساب جديد
                  </button>
                </>
              ) : (
                <button onClick={handleLogout} className="hover:text-[#00C7B7]">
                  تسجيل الخروج
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 shadow-sm bg-[#3E429A]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Left */}
            <a href="/" className="flex items-center">
              <Image src="https://wbl3.com/wp-content/uploads/2022/09/1042165_6877-Converted-1-768x308-1.webp" alt="WBL3" width={100} height={48} className="h-12" />
            </a>

            {/* Navigation - Center */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
              <MainNavigation />
            </div>

            {/* User Actions - Right */}
            {isLoggedIn && (
              <div className="flex items-center gap-4">
                <NotificationSystem />
                <a href="/messages" className="relative p-2 text-white hover:text-[#fdc201]">
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-[#fdc201] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </a>
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 text-white hover:text-[#fdc201]">
                    <div className="w-8 h-8 bg-[#fdc201] rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-black" />
                    </div>
                    <span className="font-medium">
                      {userType === 'admin' ? 'المدير' : userType === 'seller' ? 'مقدم الخدمة' : 'العميل'}
                    </span>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <a href={userType === 'user' ? '/client-dashboard' : '/dashboard'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        لوحة التحكم
                      </a>
                      {(userType === 'seller' || userType === 'both') && (
                        <a href="/dashboard/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          إدارة الخدمات
                        </a>
                      )}
                      {userType === 'admin' && (
                        <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          لوحة المدير
                        </a>
                      )}
                      <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        الملف الشخصي
                      </a>
                      <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        طلباتي
                      </a>
                      <a href="/messages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        الرسائل
                      </a>
                      <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        الإعدادات
                      </a>
                      <hr className="my-2" />
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Icon - Always Show */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCartModal(true)}
                className="relative p-2 text-white hover:text-[#1ab7ea] flex items-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1ab7ea] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="hidden sm:inline">السلة</span>
              </button>
            </div>

            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>


        </div>
      </header>

      {/* Real Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
      />

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-right">سلة التسوق</h2>
              <button onClick={() => setShowCartModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">سلة التسوق فارغة</p>
                <p className="text-sm text-gray-400">أضف خدمات لتظهر هنا</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1 text-right">
                      <h3 className="font-medium text-sm leading-tight">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      <p className="text-[#1ab7ea] font-bold text-sm mt-1">{item.price} ريال</p>
                    </div>
                    <button 
                      onClick={() => {
                        const newItems = cartItems.filter((_, i) => i !== index)
                        setCartItems(newItems)
                        setCartCount(newItems.length)
                        localStorage.setItem('cart', JSON.stringify(newItems))
                        window.dispatchEvent(new Event('cartUpdated'))
                      }}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg">المجموع:</span>
                    <span className="font-bold text-lg text-[#1ab7ea]">
                      {cartItems.reduce((total, item) => total + item.price, 0)} ريال
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setShowCartModal(false)
                      setShowLoginModal(true)
                    }}
                    className="w-full bg-[#1ab7ea] text-white py-3 rounded-lg hover:bg-[#0ea5d9] font-bold"
                  >
                    اطلب الآن
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    يجب تسجيل الدخول لإتمام الطلب
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#1ab7ea]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-[#1ab7ea]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">تم إضافة الخدمة!</h2>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                تم إضافة &quot;{pendingItem?.title}&quot; إلى سلة التسوق
              </p>
              <p className="text-sm text-gray-500">
                يجب تسجيل الدخول لإتمام عملية الطلب
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleLoginFromPrompt}
                className="w-full bg-[#1ab7ea] text-white py-3 rounded-lg hover:bg-[#0ea5d9] font-bold"
              >
                تسجيل الدخول والمتابعة
              </button>
              
              <button
                onClick={() => {
                  // Just add to cart without login
                  if (pendingItem) {
                    const newItems = [...cartItems, pendingItem]
                    setCartItems(newItems)
                    setCartCount(newItems.length)
                  }
                  setShowLoginPrompt(false)
                  setPendingItem(null)
                  setShowCartModal(true)
                }}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium"
              >
                إضافة للسلة فقط
              </button>
              
              <button
                onClick={() => {
                  setShowLoginPrompt(false)
                  setPendingItem(null)
                }}
                className="w-full text-gray-500 py-2 hover:text-gray-700"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}