# Quick Neon Database Setup Guide

## Step 1: Create Neon Account (2 minutes)

1. **Go to Neon signup**: https://console.neon.tech/signup
2. **Sign up** with GitHub, Google, or email (recommended: use GitHub for faster setup)
3. **Create your first project** during onboarding:
   - Project name: `fiverr-clone-db` (or any name you prefer)
   - Database name: `neondb` (default is fine)
   - Region: Choose closest to your location
   - Click **Create project**

## Step 2: Get Your Connection String (30 seconds)

After creating the project, you'll see a connection string that looks like:
```
postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Copy this entire connection string** - you'll need it in the next step.

## Step 3: Update Your Environment Files

### Update Local .env file:
Replace the current `DATABASE_URL` line with your actual Neon connection string:
```
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### Update vercel.json file:
Replace the `DATABASE_URL` value with the same connection string.

## Step 4: Test the Connection

Run this command to test if the database connection works:
```bash
npx prisma db push
```

If successful, your database connection is working!

## Free Tier Limits (More than enough for development)

- **20 projects** (you only need 1)
- **100 CU-hours per project** (compute time)
- **0.5 GB storage per branch**
- **10 branches per project**
- **Scale to zero** after 5 minutes of inactivity

## Next Steps After Setup

1. Run database migrations: `npx prisma db push`
2. Test login functionality
3. Deploy to production

---

**Need help?** The connection string is shown immediately after creating your project. If you miss it, go to your project dashboard → Settings → Connection Details.