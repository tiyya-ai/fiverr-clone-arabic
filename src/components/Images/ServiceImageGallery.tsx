'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface ServiceImageGalleryProps {
  images: string[]
  title: string
  className?: string
}

export default function ServiceImageGallery({ images, title, className = '' }: ServiceImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setShowLightbox(true)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center h-64 ${className}`}>
        <span className="text-gray-500">لا توجد صور متاحة</span>
      </div>
    )
  }

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main Image */}
        <div className="relative group">
          <img
            src={images[currentIndex]}
            alt={`${title} - صورة ${currentIndex + 1}`}
            className="w-full h-64 md:h-80 object-cover rounded-lg cursor-pointer"
            onClick={() => openLightbox(currentIndex)}
          />
          
          {/* Zoom Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
            <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-green-500 opacity-100'
                    : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`${title} - مصغرة ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="h-12 w-12" />
              </button>
              <button
                onClick={nextLightboxImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="h-12 w-12" />
              </button>
            </>
          )}

          {/* Main Lightbox Image */}
          <div className="max-w-4xl max-h-full flex items-center justify-center">
            <img
              src={images[lightboxIndex]}
              alt={`${title} - صورة ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-lg font-medium mb-1">{title}</p>
            <p className="text-sm opacity-75">
              {lightboxIndex + 1} من {images.length}
            </p>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-xs overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                    index === lightboxIndex
                      ? 'border-white opacity-100'
                      : 'border-gray-400 opacity-50 hover:opacity-75'
                  }`}
                >
                  <img
                    src={image}
                    alt={`مصغرة ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}