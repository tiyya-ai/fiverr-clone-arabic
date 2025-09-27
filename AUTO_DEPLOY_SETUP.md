# Automatic Deployment Setup Guide

This guide will help you set up automatic deployment to Vercel on every push to the main branch.

## 🔧 GitHub Secrets Configuration

You need to add the following secrets to your GitHub repository:

### 1. Go to GitHub Repository Settings
- Navigate to: `https://github.com/tiyya-ai/fiverr-clone-arabic/settings/secrets/actions`
- Click "New repository secret" for each of the following:

### 2. Required Secrets

#### Vercel Configuration
```
VERCEL_TOKEN=your_vercel_token_here
ORG_ID=team_Pb443kbs7aAHqCfAOPnUNROq
PROJECT_ID=prj_Tps5lVnoEe5gj11lwh5RyVuCvKew
```

#### Database & Authentication
```
DATABASE_URL=postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secure-secret-key-32-chars-minimum
ADMIN_EMAIL=admin@wbl3.org
ADMIN_PASSWORD=your-secure-admin-password
```

#### Stripe Configuration
```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

#### Public Configuration
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_ADMIN_USERNAME=admin
```

## 🔑 How to Get Vercel Token

1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name like "GitHub Actions"
4. Select appropriate scope (recommended: Full Account)
5. Copy the token and add it as `VERCEL_TOKEN` secret

## 🗄️ Database Setup (Supabase)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account

2. **Create New Project**
   - Click "New Project"
   - Choose organization
   - Enter project name: "5damat-production"
   - Enter database password (save this!)
   - Select region closest to your users

3. **Get Connection String**
   - Go to Project Settings → Database
   - Copy the "Direct connection" string
   - Replace `[YOUR-PASSWORD]` with your actual password
   - Add this as `DATABASE_URL` secret

## 🚀 Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

1. **Trigger on:**
   - Push to `main` branch
   - Pull requests to `main` branch

2. **Steps:**
   - Checkout code
   - Setup Node.js 18
   - Install dependencies
   - Run build with environment variables
   - Deploy to Vercel production

## 🧪 Testing the Setup

1. **Commit and Push Changes:**
   ```bash
   git add .
   git commit -m "Add automatic deployment workflow"
   git push origin main
   ```

2. **Check GitHub Actions:**
   - Go to your repository on GitHub
   - Click "Actions" tab
   - You should see the workflow running

3. **Monitor Deployment:**
   - Check the workflow logs for any errors
   - Verify deployment on Vercel dashboard

## 🔍 Troubleshooting

### Common Issues:

1. **Missing Secrets:**
   - Ensure all required secrets are added to GitHub
   - Check secret names match exactly (case-sensitive)

2. **Build Failures:**
   - Check if all environment variables are set
   - Verify database connection string format
   - Ensure Stripe keys are valid (use test keys for development)

3. **Vercel Token Issues:**
   - Make sure token has correct permissions
   - Regenerate token if needed
   - Verify ORG_ID and PROJECT_ID are correct

### Debugging Steps:

1. **Check GitHub Actions Logs:**
   - Go to Actions tab in your repository
   - Click on the failed workflow
   - Review each step's output

2. **Verify Environment Variables:**
   - Ensure all secrets are properly set
   - Check for typos in secret names

3. **Test Local Build:**
   ```bash
   npm run build
   ```

## 📋 Next Steps After Setup

1. **Set up Database:**
   - Update `DATABASE_URL` with real Supabase connection
   - Run migrations: `npx prisma migrate deploy`

2. **Configure Production Settings:**
   - Update `NEXTAUTH_URL` with your actual domain
   - Set up proper Stripe keys for production

3. **Test the Application:**
   - Verify login functionality
   - Test all features work correctly

## 🔄 Workflow Features

- **Automatic Deployment:** Every push to main triggers deployment
- **Environment Variables:** Securely managed through GitHub Secrets
- **Build Verification:** Ensures code builds successfully before deployment
- **Production Ready:** Deploys directly to Vercel production environment

---

**Note:** Make sure to keep your secrets secure and never commit them to the repository. The workflow will handle all deployments automatically once configured properly.