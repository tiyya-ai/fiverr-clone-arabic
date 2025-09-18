'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ServicesProvider } from '@/context/ServicesContext'
import { AuthProvider } from '@/contexts/AuthContext'

interface ProvidersProps {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ServicesProvider>
          {children}
        </ServicesProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

export { Providers }
export default Providers