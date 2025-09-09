'use client'

import React from 'react'
import { ServicesProvider } from '@/context/ServicesContext'

interface ProvidersProps {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <ServicesProvider>
      {children}
    </ServicesProvider>
  )
}

export { Providers }
export default Providers