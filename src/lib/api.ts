// API functions for real data operations
import { prisma } from './database'
import type { User, Category, Service, Order } from './database'

// Categories API
export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    return await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { services: true }
        }
      }
    })
  },

  async getById(id: string): Promise<Category | null> {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { services: true }
        }
      }
    })
  },

  async create(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    return await prisma.category.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async update(id: string, data: Partial<Category>): Promise<Category> {
    return await prisma.category.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
  },

  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id }
    })
  }
}

// Services API
export const servicesApi = {
  async getAll(filters?: {
    categoryId?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    rating?: number
  }): Promise<Service[]> {
    const where: any = { isActive: true }
    
    if (filters?.categoryId) where.categoryId = filters.categoryId
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { tags: { hasSome: [filters.search] } }
      ]
    }
    if (filters?.rating) where.rating = { gte: filters.rating }

    const services = await prisma.service.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true,
            rating: true,
            totalReviews: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true
          }
        },
        packages: true
      },
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
        { totalSales: 'desc' }
      ]
    })

    // Transform images, tags, and package features from JSON string to array
    return services.map(service => ({
      ...service,
      images: typeof service.images === 'string' ? JSON.parse(service.images) : service.images,
      tags: typeof service.tags === 'string' ? JSON.parse(service.tags) : service.tags,
      packages: service.packages.map(pkg => ({
        ...pkg,
        type: pkg.type as 'basic' | 'standard' | 'premium',
        features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features
      }))
    })) as any
  },

  async getById(id: string): Promise<Service | null> {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        user: true,
        category: true,
        packages: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!service) return null

    // Transform images, tags, and package features from JSON string to array
    return {
      ...service,
      images: typeof service.images === 'string' ? JSON.parse(service.images) : service.images,
      tags: typeof service.tags === 'string' ? JSON.parse(service.tags) : service.tags,
      packages: service.packages.map(pkg => ({
        ...pkg,
        type: pkg.type as 'basic' | 'standard' | 'premium',
        features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features
      }))
    } as any
  },

  async getByUserId(userId: string): Promise<Service[]> {
    const services = await prisma.service.findMany({
      where: { userId },
      include: {
        category: true,
        packages: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Transform images, tags, and package features from JSON string to array
    return services.map(service => ({
      ...service,
      images: typeof service.images === 'string' ? JSON.parse(service.images) : service.images,
      tags: typeof service.tags === 'string' ? JSON.parse(service.tags) : service.tags,
      packages: service.packages.map(pkg => ({
        ...pkg,
        type: pkg.type as 'basic' | 'standard' | 'premium',
        features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features
      }))
    })) as any
  },

  async create(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    const { packages, ...serviceData } = data as any
    const service = await prisma.service.create({
      data: {
        ...serviceData,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: {
        packages: true,
        user: true,
        category: true
      }
    })

    // Transform images, tags, and package features from JSON string to array
    return {
      ...service,
      images: typeof service.images === 'string' ? JSON.parse(service.images) : service.images,
      tags: typeof service.tags === 'string' ? JSON.parse(service.tags) : service.tags,
      packages: service.packages.map(pkg => ({
        ...pkg,
        type: pkg.type as 'basic' | 'standard' | 'premium',
        features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features
      }))
    } as any
  },

  async update(id: string, data: Partial<Service>): Promise<Service> {
    const { packages, ...serviceData } = data as any
    const service = await prisma.service.update({
      where: { id },
      data: {
        ...serviceData,
        updatedAt: new Date()
      },
      include: {
        packages: true,
        user: true,
        category: true
      }
    })

    // Transform images, tags, and package features from JSON string to array
    return {
      ...service,
      images: typeof service.images === 'string' ? JSON.parse(service.images) : service.images,
      tags: typeof service.tags === 'string' ? JSON.parse(service.tags) : service.tags,
      packages: service.packages.map(pkg => ({
        ...pkg,
        type: pkg.type as 'basic' | 'standard' | 'premium',
        features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features
      }))
    } as any
  }
}

// Users API
export const usersApi = {
  async getById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id }
    }) as unknown as User | null
  },

  async getByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username }
    }) as unknown as User | null
  },

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await prisma.user.create({
      data: {
        ...data as any,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }) as unknown as User
  },

  async update(id: string, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: {
        ...data as any,
        updatedAt: new Date()
      }
    }) as unknown as User
  }
}

// Orders API
export const ordersApi = {
  async getByUserId(userId: string, type: 'buying' | 'selling'): Promise<Order[]> {
    const where = type === 'buying' ? { buyerId: userId } : { sellerId: userId }
    
    const orders = await prisma.order.findMany({
      where,
      include: {
        service: {
          select: {
            id: true,
            title: true,
            images: true
          }
        },
        package: {
          select: {
            id: true,
            name: true,
            type: true
          }
        },
        buyer: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true
          }
        },
        seller: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Transform status and package type to match Order type
    return orders.map(order => ({
      ...order,
      status: order.status as 'COMPLETED' | 'PENDING' | 'DELIVERED' | 'CANCELLED' | 'DISPUTED' | 'ACTIVE',
      package: {
        ...order.package,
        type: order.package.type as 'basic' | 'standard' | 'premium'
      }
    })) as any
  },

  async create(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Transform status to match Order type
    return {
      ...order,
      status: order.status as 'COMPLETED' | 'PENDING' | 'DELIVERED' | 'CANCELLED' | 'DISPUTED' | 'ACTIVE'
    } as any
  },

  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
        ...(status === 'COMPLETED' && { completedAt: new Date() })
      }
    })

    // Transform status to match Order type
    return {
      ...order,
      status: order.status as 'COMPLETED' | 'PENDING' | 'DELIVERED' | 'CANCELLED' | 'DISPUTED' | 'ACTIVE'
    } as any
  }
}