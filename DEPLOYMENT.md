# WBL3 Platform Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Environment Variables**
   Set these in your Vercel dashboard:
   ```
   DATABASE_URL=your_production_database_url
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your_secure_secret_key_32_chars_min
   ADMIN_EMAIL=admin@wbl3.org
   ADMIN_PASSWORD=your_secure_admin_password
   ```

### Option 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Same as Vercel

### Option 3: Railway

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 🗄️ Database Setup

### Production Database (PostgreSQL)

1. **Create a PostgreSQL database** (recommended providers):
   - Supabase (Free tier available)
   - PlanetScale
   - Railway PostgreSQL
   - Neon

2. **Update DATABASE_URL** in your production environment:
   ```
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

3. **Run Prisma migrations**:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. **Seed the database** (optional):
   ```bash
   npx prisma db seed
   ```

## 🔧 Environment Configuration

### Required Environment Variables

```env
# Database
DATABASE_URL="your_production_database_url"

# NextAuth.js
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secure-secret-key-32-chars-minimum"

# Admin Configuration
ADMIN_EMAIL="admin@wbl3.org"
ADMIN_PASSWORD="your-secure-admin-password-min-12-chars"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Payment (Optional)
STRIPE_SECRET_KEY="sk_live_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_live_your_stripe_publishable_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_stripe_publishable_key"
```

## 📋 Pre-Deployment Checklist

- [ ] Database is set up and accessible
- [ ] All environment variables are configured
- [ ] Build passes locally (`npm run build`)
- [ ] Tests pass (if applicable)
- [ ] Admin credentials are secure
- [ ] SSL certificate is configured
- [ ] Domain is configured

## 🔒 Security Considerations

1. **Use strong passwords** for admin accounts
2. **Enable HTTPS** in production
3. **Set secure NEXTAUTH_SECRET**
4. **Configure CORS** if needed
5. **Use environment variables** for all secrets

## 🚦 Post-Deployment Steps

1. **Test the application** thoroughly
2. **Create admin account** using the seeded data
3. **Configure payment gateway** (if using Stripe)
4. **Set up monitoring** and error tracking
5. **Configure backups** for your database

## 🛠️ Troubleshooting

### Build Errors
- Ensure all TypeScript errors are resolved
- Check environment variables are set
- Verify database connection

### Runtime Errors
- Check server logs
- Verify environment variables
- Test database connectivity

### Performance Issues
- Enable Next.js caching
- Optimize images
- Use CDN for static assets

## 📞 Support

For deployment support, check:
- Next.js deployment documentation
- Vercel/Netlify documentation
- Database provider documentation

## 🔄 Updates and Maintenance

1. **Regular Updates**: Keep dependencies updated
2. **Database Backups**: Schedule regular backups
3. **Monitoring**: Set up uptime monitoring
4. **Security**: Regular security audits

---

**Note**: This platform is ready for production deployment. The application has been tested and all major issues have been resolved.