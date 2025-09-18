const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupRealAuth() {
  try {
    console.log('🔄 Setting up real authentication...')
    
    // Create a test user for real login
    const hashedPassword = await bcrypt.hash('test123456', 12)
    
    const testUser = await prisma.user.upsert({
      where: { email: 'test@5admat.com' },
      update: {},
      create: {
        email: 'test@5admat.com',
        password: hashedPassword,
        fullName: 'مستخدم تجريبي',
        username: 'testuser',
        userType: 'BUYER',
        location: 'السعودية',
        memberSince: new Date().getFullYear().toString(),
        skills: JSON.stringify(['تطوير المواقع', 'التصميم']),
        languages: JSON.stringify(['العربية', 'English']),
        isOnline: true,
        lastSeen: new Date(),
        level: 'مبتدئ',
        emailVerified: true
      }
    })
    
    // Create an admin user
    const adminPassword = await bcrypt.hash('admin123456', 12)
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@5admat.com' },
      update: {},
      create: {
        email: 'admin@5admat.com',
        password: adminPassword,
        fullName: 'مدير النظام',
        username: 'admin',
        userType: 'BOTH',
        location: 'السعودية',
        memberSince: new Date().getFullYear().toString(),
        skills: JSON.stringify(['إدارة النظام', 'التطوير']),
        languages: JSON.stringify(['العربية', 'English']),
        isOnline: true,
        lastSeen: new Date(),
        level: 'خبير',
        emailVerified: true,
        isVerified: true
      }
    })
    
    // Create a seller user
    const sellerPassword = await bcrypt.hash('seller123456', 12)
    
    const sellerUser = await prisma.user.upsert({
      where: { email: 'seller@5admat.com' },
      update: {},
      create: {
        email: 'seller@5admat.com',
        password: sellerPassword,
        fullName: 'بائع تجريبي',
        username: 'testseller',
        userType: 'SELLER',
        location: 'السعودية',
        memberSince: new Date().getFullYear().toString(),
        skills: JSON.stringify(['التصميم الجرافيكي', 'البرمجة']),
        languages: JSON.stringify(['العربية', 'English']),
        isOnline: true,
        lastSeen: new Date(),
        level: 'متوسط',
        emailVerified: true,
        rating: 4.8,
        totalReviews: 25,
        totalSales: 150
      }
    })
    
    console.log('✅ Real authentication setup completed!')
    console.log('\n📋 Test Accounts Created:')
    console.log('\n👤 Regular User:')
    console.log('   Email: test@5admat.com')
    console.log('   Password: test123456')
    console.log('\n👨‍💼 Admin User:')
    console.log('   Email: admin@5admat.com')
    console.log('   Password: admin123456')
    console.log('\n🛍️ Seller User:')
    console.log('   Email: seller@5admat.com')
    console.log('   Password: seller123456')
    console.log('\n🎉 You can now use real login with these accounts!')
    
  } catch (error) {
    console.error('❌ Error setting up authentication:', error)
    
    if (error.code === 'P1001') {
      console.log('\n💡 Database connection failed. Please:')
      console.log('1. Install PostgreSQL or use SQLite')
      console.log('2. Update DATABASE_URL in .env file')
      console.log('3. Run: npx prisma migrate dev')
    }
  } finally {
    await prisma.$disconnect()
  }
}

setupRealAuth()