'use client'

import { useState } from 'react'
import { Search, Menu, X, Bell, User, ShoppingCart, Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import LoginModal from './LoginModal'
import CartModal from './CartModal'
import { useCart } from '@/context/CartContext'

export default function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login')
  const [showCartModal, setShowCartModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { getTotalItems } = useCart()
  const cartItemsCount = getTotalItems()

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Right side for RTL */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="WBL3" 
                  width={100} 
                  height={40} 
                  className="h-8"
                />
              </a>
            </div>

            {/* Navigation - Center */}
            <nav className="hidden md:flex items-center space-x-12 space-x-reverse flex-1 justify-center">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">الرئيسية</a>
              <a href="/services" className="text-gray-700 hover:text-blue-600 font-medium">الخدمات</a>
              <a href="/freelancers" className="text-gray-700 hover:text-blue-600 font-medium">المستقلين</a>
              <a href="/services/create" className="text-gray-700 hover:text-blue-600 font-medium">أصبح بائعاً</a>
            </nav>

            {/* User Actions - Left side for RTL */}
            <div className="flex items-center space-x-6 space-x-reverse">
              {/* Cart Icon - Always visible */}
              <button onClick={() => setShowCartModal(true)} className="p-2 text-gray-600 hover:text-blue-600 relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItemsCount}</span>
                )}
              </button>
              
              {!isLoggedIn ? (
                <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                  <button 
                    onClick={() => {
                      setLoginMode('login')
                      setShowLoginModal(true)
                    }}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    دخول
                  </button>
                  <button 
                    onClick={() => {
                      setLoginMode('register')
                      setShowLoginModal(true)
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    حساب جديد
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3 space-x-reverse">
                  <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                    <MessageCircle className="h-5 w-5" />
                    <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <Heart className="h-5 w-5" />
                  </button>
                  <div className="relative group">
                    <button className="flex items-center space-x-2 space-x-reverse p-1">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">لوحة التحكم</a>
                        <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">الملف الشخصي</a>
                        <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">طلباتي</a>
                        <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">الإعدادات</a>
                        <hr className="my-2" />
                        <button className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                          تسجيل الخروج
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="space-y-4">
                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  <a href="/" className="block py-2 text-gray-700 font-medium text-right">الرئيسية</a>
                  <a href="/services" className="block py-2 text-gray-700 font-medium text-right">الخدمات</a>
                  <a href="/freelancers" className="block py-2 text-gray-700 font-medium text-right">المستقلين</a>
                  <a href="/services/create" className="block py-2 text-gray-700 font-medium text-right">أصبح بائعاً</a>
                </nav>

                {/* Mobile Cart Icon */}
                <div className="pt-4 border-t">
                  <button onClick={() => setShowCartModal(true)} className="flex items-center justify-center p-3 text-gray-600 hover:text-blue-600 relative bg-gray-50 rounded-lg w-full">
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    <span className="text-sm font-medium">سلة التسوق</span>
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItemsCount}</span>
                    )}
                  </button>
                </div>

                {/* Mobile Auth Buttons */}
                {!isLoggedIn && (
                  <div className="space-y-2 pt-4 border-t">
                    <button 
                      onClick={() => {
                        setLoginMode('login')
                        setShowLoginModal(true)
                      }}
                      className="block w-full text-center py-2 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      دخول
                    </button>
                    <button 
                      onClick={() => {
                        setLoginMode('register')
                        setShowLoginModal(true)
                      }}
                      className="block w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                    >
                      حساب جديد
                    </button>
                  </div>
                )}

                {/* Mobile User Actions for logged in users */}
                {isLoggedIn && (
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-around py-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                        <MessageCircle className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded text-right">لوحة التحكم</a>
                      <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded text-right">الملف الشخصي</a>
                      <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded text-right">طلباتي</a>
                      <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded text-right">الإعدادات</a>
                      <hr className="my-2" />
                      <button className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded">
                        تسجيل الخروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        initialMode={loginMode}
      />
      <CartModal 
        isOpen={showCartModal} 
        onClose={() => setShowCartModal(false)}
      />
    </>
  )
}