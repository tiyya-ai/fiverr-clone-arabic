# Fiverr Clone - Next.js Service Marketplace

A modern service marketplace platform built with Next.js, TypeScript, and Tailwind CSS, inspired by Fiverr.

## Features

- 🎨 Modern, responsive design
- 🔍 Service search and filtering
- 👤 User authentication (ready for implementation)
- 💳 Payment integration (Stripe ready)
- 📱 Mobile-first responsive design
- 🎯 Service categories and featured listings
- ⭐ Reviews and ratings system
- 📊 User dashboard (ready for implementation)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma (ready for setup)
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **File Upload**: UploadThing
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
└── components/
    ├── Header.tsx           # Navigation header
    ├── Hero.tsx             # Hero section
    ├── Categories.tsx       # Service categories
    ├── FeaturedServices.tsx # Featured service listings
    ├── HowItWorks.tsx       # Process explanation
    ├── Testimonials.tsx     # Customer reviews
    └── Footer.tsx           # Site footer
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Components Overview

### Header
- Modern navigation with search functionality
- User authentication states
- Mobile-responsive design

### Hero Section
- Eye-catching banner with search
- Trusted companies display
- Call-to-action buttons

### Categories
- Service category grid
- Visual category representations
- Easy navigation to services

### Featured Services
- Service card layout
- Seller information and ratings
- Price and delivery information

### How It Works
- Step-by-step process explanation
- Visual icons and descriptions
- Clear call-to-action

### Testimonials
- Customer review cards
- Star ratings
- Platform statistics

### Footer
- Comprehensive site links
- Social media integration
- Legal and support information

## Next Steps

1. **Security Setup**: Update environment variables with secure credentials
2. **Database Setup**: Configure Prisma with your preferred database
3. **Authentication**: Set up NextAuth.js providers
4. **Payment Integration**: Configure Stripe for transactions
5. **File Upload**: Set up UploadThing for service images
6. **API Routes**: Create backend endpoints for services
7. **User Dashboard**: Build seller and buyer dashboards
8. **Search & Filtering**: Implement advanced search functionality

## Security Best Practices

- Always use HTTPS in production
- Regularly update dependencies
- Use strong, unique passwords
- Enable rate limiting for API endpoints
- Implement proper error handling
- Use Content Security Policy (CSP) headers

## Security Features

- 🔒 **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- 🛡️ **Environment Variables**: Sensitive credentials stored securely
- 🔐 **NoSQL Injection Protection**: Search queries are sanitized
- ✅ **Secure Admin Authentication**: Environment-based credential management

## Environment Variables

Copy `.env.example` to `.env.local` and update with your values:

```bash
cp .env.example .env.local
```

**Required Environment Variables:**

```env
# Database
DATABASE_URL="your-database-url"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_PUBLISHABLE_KEY="your-stripe-public-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"

# UploadThing
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Admin Credentials (IMPORTANT: Change these in production!)
ADMIN_PASSWORD="your-secure-admin-password"
MOD_PASSWORD="your-secure-mod-password"
SUPPORT_PASSWORD="your-secure-support-password"

# Admin Usernames (Public)
NEXT_PUBLIC_ADMIN_USERNAME="admin"
NEXT_PUBLIC_MOD_USERNAME="moderator"
NEXT_PUBLIC_SUPPORT_USERNAME="support"
```

⚠️ **Security Note**: Never commit `.env.local` to version control. Always use strong, unique passwords in production.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and development.# fiverr-clone
