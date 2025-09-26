'use client'

import { useState } from 'react'
import { Search, Play } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/services?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const popularSearches = [
    'Website Design',
    'Logo Design',
    'WordPress',
    'Voice Over',
    'Video Editing',
    'AI Services',
    'Social Media',
    'SEO'
  ]

  const trustedCompanies = [
    { name: 'Meta', logo: '/logos/meta.svg' },
    { name: 'Google', logo: '/logos/google.svg' },
    { name: 'Netflix', logo: '/logos/netflix.svg' },
    { name: 'P&G', logo: '/logos/pg.svg' },
    { name: 'PayPal', logo: '/logos/paypal.svg' }
  ]

  return (
    <section className="bg-blue-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px] py-20">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find the perfect{' '}
              <span className="italic">freelance</span>
              <br />
              services for your business
            </h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="flex bg-white rounded-md overflow-hidden shadow-lg">
                <input
                  type="text"
                  placeholder="Search for any service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-6 py-4 text-gray-900 text-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 transition-colors"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-white/80 font-medium">Popular:</span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = `/services?search=${encodeURIComponent(search)}`}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Freelancer working"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              
              {/* Video Card Overlay */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                      alt="Developer"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <button className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg hover:bg-black/30 transition-colors">
                      <Play className="h-6 w-6 text-white" fill="white" />
                    </button>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Alex</div>
                    <div className="text-sm text-gray-600">Full-Stack Developer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="bg-white/10 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <span className="text-white/80 font-semibold text-lg">Trusted by:</span>
            <div className="flex items-center space-x-8 opacity-80">
              {trustedCompanies.map((company, index) => (
                <div key={index} className="text-white font-bold text-lg">
                  {company.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero