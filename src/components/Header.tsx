'use client'

import { useState } from 'react'
import { Search, Menu, X, Bell, User, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image 
              src="https://wbl3.com/wp-content/uploads/2022/09/1042165_6877-Converted-1-768x308-1.webp" 
              alt="WBL3" 
              width={120} 
              height={48} 
              className="h-10"
            />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ابحث عن الخدمات..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/services" className="text-gray-700 hover:text-blue-600">الخدمات</a>
            <a href="/freelancers" className="text-gray-700 hover:text-blue-600">المستقلين</a>
            <a href="/projects" className="text-gray-700 hover:text-blue-600">المشاريع</a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <User className="h-4 w-4" />
              <span>دخول</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن الخدمات..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <nav className="space-y-2">
                <a href="/services" className="block py-2 text-gray-700">الخدمات</a>
                <a href="/freelancers" className="block py-2 text-gray-700">المستقلين</a>
                <a href="/projects" className="block py-2 text-gray-700">المشاريع</a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}