'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { navigationItems, NavigationItem } from './MainNavigation'

interface MobileNavigationProps {
  className?: string
}

export default function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className={`md:hidden ${className}`}>
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-white hover:text-green-400 hover:bg-white/10 transition-colors"
        aria-label="فتح القائمة"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white" dir="rtl">القائمة الرئيسية</h2>
          <button
            onClick={closeMenu}
            className="p-2 rounded-md text-white hover:text-green-400 hover:bg-white/10 transition-colors"
            aria-label="إغلاق القائمة"
          >
            ✕
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              const active = isActive(item.href)
              
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      active
                        ? 'text-green-400 bg-green-900/20 border-r-2 border-green-400'
                        : 'text-white hover:text-green-400 hover:bg-white/10'
                    }`}
                    dir="rtl"
                  >
                    {IconComponent && (
                      <IconComponent className={`h-5 w-5 ${active ? 'text-green-400' : ''}`} />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center" dir="rtl">
            © 2024 منصة العمل الحر
          </p>
        </div>
      </div>
    </div>
  )
}