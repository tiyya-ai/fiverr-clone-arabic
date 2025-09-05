'use client'

import { useState } from 'react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import { Star, Shield, Heart, Share2, ChevronDown, CheckCircle, Clock, MessageCircle, ThumbsUp, ThumbsDown, Award, Users, Zap, Camera, Building, Home, Warehouse } from 'lucide-react'

export default function ArchitecturalRenderingService() {
  const [selectedPackage, setSelectedPackage] = useState('STANDARD')
  const [selectedImage, setSelectedImage] = useState(0)

  const packages = [
    {
      type: 'BASIC',
      title: 'Basic Exterior Rendering',
      price: '299',
      deliveryTime: '3',
      revisions: '2',
      description: 'Professional 3D exterior rendering with basic lighting and materials',
      features: [
        '1 High-quality 3D exterior view',
        'Basic lighting setup',
        'Standard materials and textures',
        '2K resolution (1920x1080)',
        'Basic landscaping',
        '2 revisions included'
      ]
    },
    {
      type: 'STANDARD',
      title: 'Premium Exterior Rendering',
      price: '599',
      deliveryTime: '5',
      revisions: '3',
      description: 'Advanced 3D rendering with realistic lighting and premium materials',
      features: [
        '2 High-quality 3D exterior views',
        'Advanced lighting and shadows',
        'Premium materials and textures',
        '4K resolution (3840x2160)',
        'Detailed landscaping and environment',
        'Day and night versions',
        '3 revisions included',
        'Source files included'
      ]
    },
    {
      type: 'PREMIUM',
      title: 'Complete Rendering Package',
      price: '999',
      deliveryTime: '7',
      revisions: '5',
      description: 'Complete 3D architectural visualization with multiple views and animations',
      features: [
        '4 High-quality 3D exterior views',
        'Photorealistic lighting and materials',
        '8K resolution (7680x4320)',
        'Complete environment design',
        'Multiple time-of-day renderings',
        '360° panoramic view',
        'Short walkthrough animation (15 seconds)',
        '5 revisions included',
        'All source files and project files',
        'Commercial usage rights'
      ]
    }
  ]

  const portfolioImages = [
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600'
  ]

  const reviews = [
    {
      id: '1',
      userName: 'Ahmed Al-Rashid',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      comment: 'Outstanding work! The 3D rendering exceeded my expectations. Very professional and delivered on time.',
      date: '2 weeks ago'
    },
    {
      id: '2',
      userName: 'Sarah Johnson',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      comment: 'Amazing quality and attention to detail. The architect perfectly captured our vision for the commercial building.',
      date: '1 month ago'
    },
    {
      id: '3',
      userName: 'Mohammed Hassan',
      userAvatar: '/api/placeholder/40/40',
      rating: 4,
      comment: 'Great work and fast delivery. The rendering helped us visualize our warehouse project perfectly.',
      date: '3 weeks ago'
    }
  ]

  const currentPackage = packages.find(p => p.type === selectedPackage) || packages[1]

  return (
    <div className="bg-white min-h-screen">
      <MainHeader />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-4">
            <div className="space-y-10">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
                  I will design 3D architectural rendering exterior of house, warehouse, commercial
                </h1>
                <div className="flex items-center gap-4">
                  <img src="/api/placeholder/48/48" alt="AY Architect" className="w-12 h-12 rounded-full" />
                  <p className="font-semibold text-lg text-gray-700">AY Architect</p>
                  <div className="flex items-center border-l border-gray-300 pl-4 ml-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-bold text-gray-600">4.9</span>
                    <span className="text-gray-500 ml-1">(247 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                    <Share2 className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={portfolioImages[selectedImage]} 
                    alt="3D Architectural Rendering" 
                    className="w-full h-96 object-cover" 
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {portfolioImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`Portfolio ${index + 1}`} className="w-full h-16 object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* About this Gig */}
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Gig</h2>
                <div className="text-gray-600 text-lg space-y-4">
                  <p>
                    Transform your architectural vision into stunning photorealistic 3D renderings! 
                    I specialize in creating high-quality exterior visualizations for residential homes, 
                    commercial buildings, warehouses, and industrial facilities.
                  </p>
                  <p>
                    With over 8 years of experience in architectural visualization, I use industry-leading 
                    software including 3ds Max, V-Ray, Corona Renderer, and Photoshop to deliver 
                    exceptional results that bring your projects to life.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Home className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-800">Residential</h3>
                      <p className="text-sm text-gray-600">Houses, Villas, Apartments</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Building className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-800">Commercial</h3>
                      <p className="text-sm text-gray-600">Offices, Retail, Hotels</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Warehouse className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-800">Industrial</h3>
                      <p className="text-sm text-gray-600">Warehouses, Factories</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">What You'll Get:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Photorealistic 3D exterior renderings</li>
                    <li>Professional lighting and material setup</li>
                    <li>Detailed landscaping and environment</li>
                    <li>Multiple viewing angles and perspectives</li>
                    <li>High-resolution output files</li>
                    <li>Fast turnaround time</li>
                    <li>Unlimited revisions until satisfaction</li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Requirements:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Architectural plans (PDF, DWG, or SketchUp files)</li>
                    <li>Reference images or inspiration</li>
                    <li>Material preferences and color schemes</li>
                    <li>Site context or environment preferences</li>
                  </ul>
                </div>
              </div>

              {/* About the Seller */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">About The Seller</h2>
                <div className="flex items-start gap-6 p-6 border border-gray-200 rounded-lg">
                  <img src="/api/placeholder/96/96" alt="AY Architect" className="w-24 h-24 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-bold text-xl text-gray-800">AY Architect</p>
                      <div className="flex items-center gap-1">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-600">Top Rated Seller</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Professional Architect & 3D Visualization Expert with 8+ years of experience. 
                      Specialized in photorealistic architectural renderings for residential, commercial, 
                      and industrial projects worldwide.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-700">4.9</span>
                        </div>
                        <span className="text-xs text-gray-500">Rating</span>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-gray-700">247</div>
                        <span className="text-xs text-gray-500">Reviews</span>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-gray-700">500+</div>
                        <span className="text-xs text-gray-500">Orders</span>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-gray-700">24h</div>
                        <span className="text-xs text-gray-500">Response</span>
                      </div>
                    </div>
                    <button className="px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Contact Me
                    </button>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews ({reviews.length})</h2>
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center gap-4 mb-3">
                        <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-bold text-gray-800">{review.userName}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{review.comment}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Helpful?</span>
                        <button className="flex items-center gap-1 hover:text-green-600">
                          <ThumbsUp className="w-4 h-4"/> Yes
                        </button>
                        <button className="flex items-center gap-1 hover:text-red-600">
                          <ThumbsDown className="w-4 h-4"/> No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="border border-gray-200 rounded-lg">
                <div className="flex">
                  {packages.map(pkg => (
                    <button 
                      key={pkg.type}
                      onClick={() => setSelectedPackage(pkg.type)}
                      className={`flex-1 p-3 font-semibold text-center text-sm ${
                        selectedPackage === pkg.type 
                          ? 'bg-white border-b-2 border-green-500 text-green-600' 
                          : 'bg-gray-50 text-gray-500'
                      }`}
                    >
                      {pkg.type}
                    </button>
                  ))}
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">{currentPackage.title}</h3>
                    <p className="text-2xl font-bold text-gray-800">${currentPackage.price}</p>
                  </div>
                  <p className="text-gray-600">{currentPackage.description}</p>
                  <div className="flex items-center justify-around text-center text-gray-600">
                    <div className="flex items-center gap-2 font-semibold">
                      <Clock className="w-5 h-5 text-gray-500"/>
                      <span>{currentPackage.deliveryTime} Days</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                      <Shield className="w-5 h-5 text-gray-500"/>
                      <span>{currentPackage.revisions} Revisions</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {currentPackage.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"/>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg mt-4 hover:bg-green-700 transition-colors text-lg">
                    Continue (${currentPackage.price})
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-2">You won't be charged yet</p>
                  
                  <div className="border-t pt-4">
                    <button className="w-full border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Trust badges */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}