# WBL3 - Saudi Home Services Platform

A comprehensive home services marketplace platform built for the Saudi market, connecting customers with verified service providers.

## 🚀 Live Deployment Setup

### 1. Database Setup

**PostgreSQL (Recommended for production):**
```bash
# Install PostgreSQL
# Create database
createdb wbl3_db

# Set DATABASE_URL in .env
DATABASE_URL="postgresql://username:password@localhost:5432/wbl3_db"
```

**MySQL Alternative:**
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE wbl3_db;

# Set DATABASE_URL in .env
DATABASE_URL="mysql://username:password@localhost:3306/wbl3_db"
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your production values
nano .env.local
```

**Required Environment Variables:**
- `DATABASE_URL` - Your database connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `UPLOADTHING_SECRET` - For file uploads
- `ADMIN_PASSWORD` - Secure admin password

### 3. Database Migration & Seeding

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed with real Saudi service data
npm run db:seed
```

### 4. Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Production Architecture

### Database Schema
- **Users**: Service providers, customers, admins
- **Categories**: Saudi-specific service categories
- **Services**: Service listings with packages
- **Orders**: Order management and tracking
- **Reviews**: Customer feedback system

### Key Features for Saudi Market
- **Arabic-first interface** with RTL support
- **Saudi service categories** (electrical, plumbing, AC, etc.)
- **Location-based services** for major Saudi cities
- **Mobile-responsive design** for smartphone users
- **Secure payment integration** with Stripe
- **WhatsApp integration** for customer communication

### Real Data Structure

**Categories (10 main Saudi services):**
1. صيانة الكهرباء (Electrical Maintenance)
2. صيانة السباكة (Plumbing Services)
3. صيانة التكييف (AC Maintenance)
4. أعمال النجارة (Carpentry)
5. كاميرات المراقبة (Security Cameras)
6. البناء والمقاولات (Construction)
7. تنسيق الحدائق (Landscaping)
8. صيانة المصاعد (Elevator Maintenance)
9. الدهان والتشطيبات (Painting & Finishing)
10. تنظيف المنازل (House Cleaning)

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Database operations
npm run db:studio      # Open Prisma Studio
npm run db:migrate     # Create new migration
npm run db:reset       # Reset database

# Type checking
npm run type-check
```

## 📱 Mobile Optimization

The platform is optimized for Saudi mobile users:
- **Responsive design** for all screen sizes
- **Touch-friendly interface** for mobile interactions
- **Fast loading** with optimized images
- **Offline capabilities** for basic browsing

## 🔒 Security Features

- **Input sanitization** to prevent XSS attacks
- **SQL injection protection** with Prisma ORM
- **Secure authentication** with NextAuth.js
- **Rate limiting** for API endpoints
- **HTTPS enforcement** in production
- **Environment variable protection**

## 🌍 Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker
```bash
# Build Docker image
docker build -t wbl3-platform .

# Run container
docker run -p 3000:3000 wbl3-platform
```

### Traditional Server
```bash
# Build application
npm run build

# Start with PM2
pm2 start npm --name "wbl3" -- start
```

## 📊 Analytics & Monitoring

- **Google Analytics** integration
- **Error tracking** with Sentry
- **Performance monitoring**
- **User behavior analytics**

## 🎯 Saudi Market Features

- **Riyal (SAR) currency** support
- **Saudi phone number** validation
- **Arabic content management**
- **Local service provider verification**
- **City-specific service availability**
- **Cultural considerations** in UX design

## 🚀 Go Live Checklist

- [ ] Database configured and migrated
- [ ] Environment variables set
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Payment gateway tested
- [ ] Email notifications working
- [ ] SMS verification active
- [ ] Admin panel accessible
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Analytics tracking enabled

## 📞 Support

For deployment support:
- Email: support@wbl3.org
- Phone: +966123456789
- Documentation: [docs.wbl3.org](https://docs.wbl3.org)

---

**Ready for Saudi market deployment! 🇸🇦**