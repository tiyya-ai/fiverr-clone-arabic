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

    return await prisma.service.findMany({
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
  },

  async getById(id: string): Promise<Service | null> {
    return await prisma.service.findUnique({
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
  },

  async getByUserId(userId: string): Promise<Service[]> {
    return await prisma.service.findMany({
      where: { userId },
      include: {
        category: true,
        packages: true
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  async create(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    return await prisma.service.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async update(id: string, data: Partial<Service>): Promise<Service> {
    return await prisma.service.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
  }
}

// Users API
export const usersApi = {
  async getById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id }
    })
  },

  async getByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username }
    })
  },

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await prisma.user.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async update(id: string, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
  }
}

// Orders API
export const ordersApi = {
  async getByUserId(userId: string, type: 'buying' | 'selling'): Promise<Order[]> {
    const where = type === 'buying' ? { buyerId: userId } : { sellerId: userId }
    
    return await prisma.order.findMany({
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
  },

  async create(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    return await prisma.order.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    return await prisma.order.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
        ...(status === 'completed' && { completedAt: new Date() })
      }
    })
  }
}