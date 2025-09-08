// Seed script to populate database with real Saudi service data
import { prisma } from './database'
import bcrypt from 'bcryptjs'

export async function seedDatabase() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@wbl3.org' },
    update: {},
    create: {
      email: 'admin@wbl3.org',
      password: adminPassword,
      fullName: 'مدير النظام',
      username: 'admin',
      location: 'الرياض، السعودية',
      bio: 'مدير منصة WBL3 للخدمات المنزلية',
      skills: ['إدارة', 'تطوير الأعمال'],
      languages: ['العربية', 'الإنجليزية'],
      memberSince: '2024',
      userType: 'ADMIN',
      isVerified: true
    }
  })

  // Create real Saudi service categories
  const categories = [
    {
      name: 'صيانة الكهرباء',
      nameEn: 'Electrical Maintenance',
      description: 'جميع خدمات الصيانة الكهربائية المنزلية والتجارية',
      descriptionEn: 'All residential and commercial electrical maintenance services',
      icon: '⚡',
      color: '#f59e0b',
      order: 1
    },
    {
      name: 'صيانة السباكة',
      nameEn: 'Plumbing Services',
      description: 'خدمات السباكة وإصلاح الأنابيب والتسريبات',
      descriptionEn: 'Plumbing services and pipe repair',
      icon: '🔧',
      color: '#3b82f6',
      order: 2
    },
    {
      name: 'صيانة التكييف',
      nameEn: 'AC Maintenance',
      description: 'صيانة وإصلاح أجهزة التكييف والتبريد',
      descriptionEn: 'Air conditioning and cooling system maintenance',
      icon: '❄️',
      color: '#06b6d4',
      order: 3
    },
    {
      name: 'أعمال النجارة',
      nameEn: 'Carpentry',
      description: 'صناعة وإصلاح الأثاث والأعمال الخشبية',
      descriptionEn: 'Furniture making and woodwork',
      icon: '🪚',
      color: '#92400e',
      order: 4
    },
    {
      name: 'كاميرات المراقبة',
      nameEn: 'Security Cameras',
      description: 'تركيب وصيانة أنظمة المراقبة والأمان',
      descriptionEn: 'Installation and maintenance of security systems',
      icon: '📹',
      color: '#7c3aed',
      order: 5
    },
    {
      name: 'البناء والمقاولات',
      nameEn: 'Construction',
      description: 'أعمال البناء والتشييد والمقاولات العامة',
      descriptionEn: 'Construction and general contracting',
      icon: '🏗️',
      color: '#dc2626',
      order: 6
    },
    {
      name: 'تنسيق الحدائق',
      nameEn: 'Landscaping',
      description: 'تصميم وتنسيق الحدائق والمساحات الخضراء',
      descriptionEn: 'Garden design and landscaping',
      icon: '🌿',
      color: '#16a34a',
      order: 7
    },
    {
      name: 'صيانة المصاعد',
      nameEn: 'Elevator Maintenance',
      description: 'صيانة وإصلاح المصاعد والسلالم المتحركة',
      descriptionEn: 'Elevator and escalator maintenance',
      icon: '🛗',
      color: '#6b7280',
      order: 8
    },
    {
      name: 'الدهان والتشطيبات',
      nameEn: 'Painting & Finishing',
      description: 'أعمال الدهان والتشطيبات النهائية',
      descriptionEn: 'Painting and finishing work',
      icon: '🎨',
      color: '#8b5cf6',
      order: 9
    },
    {
      name: 'تنظيف المنازل',
      nameEn: 'House Cleaning',
      description: 'خدمات التنظيف الشامل للمنازل والمكاتب',
      descriptionEn: 'Comprehensive cleaning services for homes and offices',
      icon: '🧽',
      color: '#06b6d4',
      order: 10
    }
  ]

  // Insert categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  }

  // Create sample service providers
  const providers = [
    {
      email: 'ahmed.electrician@wbl3.org',
      fullName: 'أحمد محمد الكهربائي',
      username: 'ahmed_electrician',
      location: 'الرياض، السعودية',
      bio: 'كهربائي محترف مع خبرة 10 سنوات في الصيانة الكهربائية المنزلية والتجارية',
      skills: ['كهرباء منزلية', 'كهرباء تجارية', 'إضاءة LED', 'لوحات كهربائية'],
      languages: ['العربية'],
      rating: 4.8,
      totalReviews: 156,
      totalSales: 234,
      responseTime: '30 دقيقة',
      memberSince: '2022',
      userType: 'SELLER' as const,
      isVerified: true
    },
    {
      email: 'sara.cleaner@wbl3.org',
      fullName: 'سارة أحمد للتنظيف',
      username: 'sara_cleaner',
      location: 'جدة، السعودية',
      bio: 'خدمات تنظيف احترافية للمنازل والمكاتب مع فريق مدرب ومعدات حديثة',
      skills: ['تنظيف منازل', 'تنظيف مكاتب', 'تنظيف بعد الدهان', 'تنظيف السجاد'],
      languages: ['العربية', 'الإنجليزية'],
      rating: 4.9,
      totalReviews: 203,
      totalSales: 445,
      responseTime: '1 ساعة',
      memberSince: '2021',
      userType: 'SELLER' as const,
      isVerified: true
    }
  ]

  // Insert providers
  for (const provider of providers) {
    const hashedPassword = await bcrypt.hash('provider123', 12)
    await prisma.user.upsert({
      where: { email: provider.email },
      update: {},
      create: {
        ...provider,
        password: hashedPassword
      }
    })
  }

  console.log('✅ Database seeded successfully!')
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}