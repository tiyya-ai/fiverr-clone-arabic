'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface MainNavigationProps {
  className?: string
}

const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'الرئيسية',
    href: '/'
  },
  {
    id: 'services',
    label: 'الخدمات',
    href: '/services'
  },
  {
    id: 'projects',
    label: 'المشاريع',
    href: '/projects'
  },
  {
    id: 'jobs',
    label: 'الوظائف',
    href: '/jobs'
  },
  {
    id: 'freelancers',
    label: 'المستقلون',
    href: '/freelancers'
  }
]

export default function MainNavigation({ className = '' }: MainNavigationProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      {navigationItems.map((item) => {
        const IconComponent = item.icon
        const active = isActive(item.href)
        
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 no-underline hover:no-underline ${
              active
                ? 'text-white'
                : 'text-white hover:text-[#1ab7ea]'
            }`}
          >

            <span className="text-sm">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export { navigationItems }
export type { NavigationItem }