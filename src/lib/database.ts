// Database connection and models for live data
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// Real data types
export interface User {
  id: string
  email: string
  fullName: string
  username: string
  avatar?: string
  phone?: string
  location: string
  bio?: string
  skills: string[]
  languages: string[]
  rating: number
  totalReviews: number
  totalSales: number
  responseTime: string
  memberSince: string
  isVerified: boolean
  userType: 'buyer' | 'seller' | 'admin'
  verificationBadges?: string[]
  verificationScore?: number
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  icon: string
  image?: string
  color: string
  isActive: boolean
  serviceCount: number
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  categoryId: string
  userId: string
  images: string[]
  tags: string[]
  rating: number
  totalReviews: number
  totalSales: number
  isActive: boolean
  isFeatured: boolean
  packages: ServicePackage[]
  createdAt: Date
  updatedAt: Date
}

export interface ServicePackage {
  id: string
  serviceId: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  price: number
  deliveryTime: number
  revisions: number
  features: string[]
  type: 'basic' | 'standard' | 'premium'
}

export interface Order {
  id: string
  serviceId: string
  packageId: string
  buyerId: string
  sellerId: string
  status: 'pending' | 'active' | 'delivered' | 'completed' | 'cancelled' | 'disputed'
  totalAmount: number
  requirements?: string
  deliveryDate: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}