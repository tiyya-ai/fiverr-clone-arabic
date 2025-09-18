'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Globe, User, Heart, MessageCircle } from 'lucide-react'

const AuthNavigation = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link href="/gigs" className="text-gray-600 hover:text-green-500 font-medium">
        Browse Services
      </Link>
      <Link href="/gigs/create" className="text-gray-600 hover:text-green-500 font-medium">
        Become a Seller
      </Link>
      <Link href="/api/auth/signin" className="text-gray-600 hover:text-green-500 font-medium">
        Sign In
      </Link>
      <Link href="/auth/signup" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium">
        Join Now
      </Link>
    </nav>
  )
}

const MobileAuthNavigation = () => {
  return (
    <>
      <Link href="/api/auth/signin" className="block text-gray-600 hover:text-green-500 font-medium">
        Sign In
      </Link>
      <Link href="/auth/signup" className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium">
        Join Now
      </Link>
    </>
  )
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-6">
              <span className="hover:text-primary-400 cursor-pointer">Fiverr Pro</span>
              <span className="hover:text-primary-400 cursor-pointer">Explore</span>
              <span className="hover:text-primary-400 cursor-pointer">English</span>
              <span className="hover:text-primary-400 cursor-pointer">Become a Seller</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/api/auth/signin" className="hover:text-green-400">Sign in</Link>
              <Link href="/auth/signup" className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white font-medium">
                Join
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                fiverr<span className="text-primary-500">.</span>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What service are you looking for today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white p-2 rounded"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Navigation - Desktop */}
            <AuthNavigation />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white p-2 rounded"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
            
            {/* Mobile Navigation */}
            <div className="space-y-3">
              <Link href="/gigs" className="block text-gray-600 hover:text-green-500 font-medium">
                Browse Services
              </Link>
              <Link href="/gigs/create" className="block text-gray-600 hover:text-green-500 font-medium">
                Become a Seller
              </Link>
              <MobileAuthNavigation />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header