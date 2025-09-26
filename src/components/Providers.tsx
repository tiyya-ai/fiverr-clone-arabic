'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ServicesProvider } from '@/context/ServicesContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/context/CartContext'

interface ProvidersProps {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          <ServicesProvider>
            {children}
          </ServicesProvider>
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

export default Providers