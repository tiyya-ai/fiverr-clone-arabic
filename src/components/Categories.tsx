'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const Categories = () => {
  const categories = [
    {
      id: 'graphics-design',
      name: 'Graphics & Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      description: 'Logo design, brand identity, and more'
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      description: 'SEO, social media, and advertising'
    },
    {
      id: 'writing-translation',
      name: 'Writing & Translation',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop',
      description: 'Content writing, copywriting, translation'
    },
    {
      id: 'video-animation',
      name: 'Video & Animation',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop',
      description: 'Video editing, animation, motion graphics'
    },
    {
      id: 'music-audio',
      name: 'Music & Audio',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      description: 'Voice over, music production, audio editing'
    },
    {
      id: 'programming-tech',
      name: 'Programming & Tech',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
      description: 'Web development, mobile apps, software'
    },
    {
      id: 'business',
      name: 'Business',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      description: 'Business consulting, market research'
    },
    {
      id: 'ai-services',
      name: 'AI Services',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop',
      description: 'AI development, machine learning, chatbots'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most in-demand categories and find the perfect service for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-white/90">{category.description}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Categories