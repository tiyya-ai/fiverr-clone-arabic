'use client'

import { useState } from 'react'
import { getCategoryIcon, getIconUrl } from '@/config/icons'

interface CategoryIconProps {
  categoryKey: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  useExternal?: boolean
  showFallback?: boolean
  variant?: 'default' | 'card' | 'minimal'
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
  '2xl': 'w-24 h-24'
}

const fallbackSizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
  '2xl': 'text-5xl'
}

const containerClasses = {
  default: 'flex items-center justify-center',
  card: 'flex items-center justify-center bg-white rounded-2xl shadow-sm p-4 group-hover:shadow-md transition-all duration-300',
  minimal: 'flex items-center justify-center'
}

export default function CategoryIcon({ 
  categoryKey, 
  size = 'lg', 
  className = '', 
  useExternal = true,
  showFallback = true,
  variant = 'card'
}: CategoryIconProps) {
  const [imageError, setImageError] = useState(false)
  const category = getCategoryIcon(categoryKey)
  const iconUrl = getIconUrl(categoryKey, useExternal)

  const handleImageError = () => {
    setImageError(true)
  }

  const IconContent = () => {
    if (imageError && showFallback) {
      return (
        <div className={`${containerClasses[variant]} ${sizeClasses[size]}`}>
          <span className={`${fallbackSizeClasses[size]} filter grayscale-0 group-hover:scale-110 transition-transform duration-300`}>
            {category.fallbackIcon}
          </span>
        </div>
      )
    }

    return (
      <div className={`${containerClasses[variant]} ${sizeClasses[size]}`}>
        <img
          src={iconUrl}
          alt={category.name}
          className={`w-full h-full object-contain filter brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-300 ${className}`}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
    )
  }

  return <IconContent />
}