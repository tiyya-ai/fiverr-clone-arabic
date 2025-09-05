'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, Clock } from 'lucide-react'

const FeaturedServices = () => {
  const services = [
    {
      id: 1,
      title: 'I will design a modern logo for your business',
      seller: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        level: 'Level 2 Seller',
        rating: 4.9
      },
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      price: 25,
      rating: 4.9,
      reviews: 1247,
      category: 'Graphics & Design',
      delivery: '2 days',
      isFavorite: false
    },
    {
      id: 2,
      title: 'I will develop a responsive WordPress website',
      seller: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        level: 'Top Rated Seller',
        rating: 5.0
      },
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop',
      price: 150,
      rating: 5.0,
      reviews: 892,
      category: 'Programming & Tech',
      delivery: '5 days',
      isFavorite: true
    },
    {
      id: 3,
      title: 'I will create an engaging promotional video',
      seller: {
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        level: 'Level 2 Seller',
        rating: 4.8
      },
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop',
      price: 75,
      rating: 4.8,
      reviews: 634,
      category: 'Video & Animation',
      delivery: '3 days',
      isFavorite: false
    },
    {
      id: 4,
      title: 'I will write compelling copy for your website',
      seller: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        level: 'Level 1 Seller',
        rating: 4.7
      },
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop',
      price: 50,
      rating: 4.7,
      reviews: 423,
      category: 'Writing & Translation',
      delivery: '2 days',
      isFavorite: false
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our top-rated services from talented freelancers around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className={`h-4 w-4 ${service.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-4">
                {/* Seller Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <Image
                    src={service.seller.avatar}
                    alt={service.seller.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{service.seller.name}</span>
                  <span className="text-xs text-gray-500">{service.seller.level}</span>
                </div>

                {/* Service Title */}
                <Link href={`/services/${service.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(service.rating)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{service.rating}</span>
                  <span className="text-sm text-gray-500">({service.reviews})</span>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center space-x-1 mb-4">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{service.delivery} delivery</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    From ${service.price}
                  </span>
                  <Link
                    href={`/services/${service.id}`}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <span>Browse All Services</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedServices