'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, Shield, Clock, Heart, CheckCircle } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import { useServices } from '@/context/ServicesContext'
import { getUserById } from '@/data/mockData'

export default function GigPage() {
  const { id } = useParams()
  const { getServiceById } = useServices()
  const [service, setService] = useState<any>(null)
  const [provider, setProvider] = useState<any>(null)

  useEffect(() => {
    if (id) {
      const serviceData = getServiceById(id as string)
      setService(serviceData)
      if (serviceData) {
        const userData = getUserById(serviceData.userId)
        setProvider(userData)
      }
    }
  }, [id, getServiceById])

  if (!service) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <MainHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h1>
              <div className="flex items-center mb-4">
                <img src={provider?.avatar} alt={provider?.fullName} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-semibold text-gray-800">{provider?.fullName}</p>
                  <p className="text-sm text-gray-500">{provider?.level}</p>
                </div>
                <div className="flex items-center ml-auto">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 mr-1 font-bold">{service.rating}</span>
                  <span className="text-xs text-gray-400">({service.totalReviews} reviews)</span>
                </div>
              </div>
              <img src={service.images[0]} alt={service.title} className="w-full h-auto rounded-lg mb-4" />
              <div className="prose max-w-none">
                <p>{service.description}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-bold mb-4">Packages</h2>
              {service.packages.map((pkg: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{pkg.name}</h3>
                    <p className="font-bold text-lg text-green-600">${pkg.price}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                  <ul className="text-sm space-y-2">
                    {pkg.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                    Continue (${pkg.price})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
