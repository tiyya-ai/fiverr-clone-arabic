'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockServices, Service } from '@/data/mockData'

interface ServicesContextType {
  services: Service[]
  addService: (service: Omit<Service, 'id'>) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
  getServiceById: (id: string) => Service | undefined
  getServicesByUserId: (userId: string) => Service[]
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined)

export function ServicesProvider({ children }: { children: React.ReactNode }) {
    const [services, setServices] = useState<Service[]>(mockServices)

  

  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString(), // Simple ID generation
      rating: 0,
      totalReviews: 0,
      totalSales: 0,
      createdAt: new Date().toISOString()
    }
    
    setServices(prev => [...prev, newService])
  }

  const updateService = (id: string, serviceData: Partial<Service>) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, ...serviceData } : service
      )
    )
  }

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id))
  }

  const getServiceById = (id: string) => {
    return services.find(service => service.id === id)
  }

  const getServicesByUserId = (userId: string) => {
    return services.filter(service => service.userId === userId)
  }

  return (
    <ServicesContext.Provider value={{
      services,
      addService,
      updateService,
      deleteService,
      getServiceById,
      getServicesByUserId
    }}>
      {children}
    </ServicesContext.Provider>
  )
}

export function useServices() {
  const context = useContext(ServicesContext)
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider')
  }
  return context
}