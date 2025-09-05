'use client'

import { ReactNode } from 'react'

interface UnifiedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  href?: string
}

const UnifiedButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  href,
  ...props
}: UnifiedButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 border font-semibold
    transition-all duration-200 focus:outline-none focus:ring-2 
    focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variantClasses = {
    primary: `
      bg-[#1ab7ea] hover:bg-[#0ea5d9] text-white border-[#1ab7ea] 
      hover:border-[#0ea5d9] focus:ring-[#1ab7ea]/20
    `,
    secondary: `
      bg-transparent hover:bg-[#1ab7ea] text-[#1ab7ea] hover:text-white 
      border-[#1ab7ea] focus:ring-[#1ab7ea]/20
    `,
    outline: `
      bg-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-900 
      border-gray-300 hover:border-gray-400 focus:ring-gray-500/20
    `,
    ghost: `
      bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800 
      border-transparent focus:ring-gray-500/20
    `,
    danger: `
      bg-red-600 hover:bg-red-700 text-white border-red-600 
      hover:border-red-700 focus:ring-red-500/20
    `
  }

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm rounded-md',
    medium: 'px-4 py-2 text-base rounded-lg',
    large: 'px-6 py-3 text-lg rounded-xl'
  }

  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${className}
  `.trim().replace(/\s+/g, ' ')

  const content = (
    <>
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}

export default UnifiedButton