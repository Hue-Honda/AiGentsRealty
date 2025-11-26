# Quick Deployment Guide for AiGentsRealty

## Step 1: Set Up Supabase Database (5 minutes)

### 1.1 Create Supabase Account & Project
1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** (Sign up with GitHub)
3. Click **"New Project"**
4. Fill in:
   - **Name**: `aigentsrealty` (or any name)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to your users (e.g., `US East`)
5. Click **"Create new project"**
6. Wait ~2 minutes for project to provision ☕

### 1.2 Get Database Connection String
1. Once ready, go to **Settings** (gear icon) → **Database**
2. Scroll down to **"Connection string"** section
3. Select **"URI"** tab
4. Copy the connection string that looks like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the password you created in step 1.1
6. **SAVE THIS** - you'll need it for Vercel!

### 1.3 Import Database Schema
1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open your local file: `backend/database/init.sql`
4. Copy ALL the contents
5. Paste into Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: **"Success. No rows returned"**

### 1.4 Verify Data Import
Run this query in SQL Editor:
```sql
SELECT COUNT(*) as projects FROM projects;
SELECT COUNT(*) as developers FROM developers;
SELECT COUNT(*) as areas FROM areas;
```

You should see counts greater than 0 for each table ✅

---

## Step 2: Deploy Backend to Vercel

### 2.1 Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2.2 Login to Vercel
```bash
vercel login
```

### 2.3 Deploy Backend
```bash
cd backend
vercel --prod
```

**Follow the prompts:**
1. **Set up and deploy?** → `Y`
2. **Which scope?** → Select your account
3. **Link to existing project?** → `N` (first time)
4. **What's your project's name?** → `aigentsrealty-backend`
5. **In which directory is your code located?** → `./` (press Enter)
6. **Want to modify settings?** → `N`

### 2.4 Add Environment Variables to Backend
**Important:** After first deployment, add environment variables:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select **"aigentsrealty-backend"** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `OPENAI_API_KEY` | `[YOUR_OPENAI_API_KEY_HERE]` | Production, Preview, Development |
| `DATABASE_URL` | Your Supabase connection string from Step 1.2 | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `CORS_ORIGIN` | `https://aigentsrealty.vercel.app` (your frontend URL) | Production |

5. Click **"Redeploy"** → Select latest deployment → Click **"Redeploy"**

### 2.5 Save Your Backend URL
After deployment, copy your backend URL (looks like):
```
https://aigentsrealty-backend.vercel.app
```

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Deploy Frontend
```bash
cd ../frontend
vercel --prod
```

**Follow the prompts:**
1. **Set up and deploy?** → `Y`
2. **Which scope?** → Select your account
3. **Link to existing project?** → `N` (first time)
4. **What's your project's name?** → `aigentsrealty`
5. **In which directory is your code located?** → `./` (press Enter)
6. **Want to modify settings?** → `N`

### 3.2 Add Environment Variables to Frontend
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select **"aigentsrealty"** project
3. Go to **Settings** → **Environment Variables**
4. Add this variable:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | Your backend URL from Step 2.5 | Production, Preview, Development |

5. Click **"Redeploy"** → Select latest deployment → Click **"Redeploy"**

### 3.3 Update Backend CORS
Now that you have your frontend URL, update the backend CORS:

1. Go back to **aigentsrealty-backend** project
2. **Settings** → **Environment Variables**
3. Edit `CORS_ORIGIN` variable
4. Set value to your frontend URL (e.g., `https://aigentsrealty.vercel.app`)
5. Save and **Redeploy** backend

---

## Step 4: Test Your Deployment

### 4.1 Test Frontend
1. Visit your frontend URL: `https://aigentsrealty.vercel.app`
2. You should see the homepage ✅

### 4.2 Test API Connection
1. Navigate to **Projects** page
2. You should see project listings from database ✅

### 4.3 Test AI Chat
1. Scroll to the **Genie** chat section
2. Ask: "Show me properties in Dubai Marina"
3. You should get AI-powered responses ✅

---

## Environment Variables Summary

### Backend (.env or Vercel Environment Variables)
```env
OPENAI_API_KEY=[YOUR_OPENAI_API_KEY_HERE]
DATABASE_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
NODE_ENV=production
CORS_ORIGIN=https://aigentsrealty.vercel.app
```

### Frontend (.env.production or Vercel Environment Variables)
```env
NEXT_PUBLIC_API_URL=https://aigentsrealty-backend.vercel.app
```

---

## Troubleshooting

### Issue: "Address already in use" error
**Solution:** Some old process is running. Kill all Node processes:
```bash
taskkill /F /IM node.exe
```

### Issue: "Database connection failed"
**Solution:**
1. Check your DATABASE_URL is correct
2. Make sure you replaced `[YOUR-PASSWORD]` with actual password
3. Test connection in Supabase SQL Editor first

### Issue: "OpenAI API error"
**Solution:**
1. Check OPENAI_API_KEY is correctly set in Vercel
2. Verify API key is valid at [platform.openai.com](https://platform.openai.com)
3. Check you have billing enabled on OpenAI account

### Issue: "CORS error" in browser console
**Solution:**
1. Make sure CORS_ORIGIN in backend matches your frontend URL exactly
2. Redeploy backend after changing CORS_ORIGIN

### Issue: Frontend can't connect to backend
**Solution:**
1. Check NEXT_PUBLIC_API_URL is set correctly
2. Make sure backend is deployed and accessible
3. Test backend URL directly in browser: `https://your-backend.vercel.app/api/projects`

---

## Post-Deployment

### Custom Domain (Optional)
1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain (e.g., `aigentsrealty.com`)
3. Follow DNS configuration instructions
4. Update CORS_ORIGIN in backend to match new domain

### Monitoring
- **Vercel Dashboard**: Check deployment logs, analytics, and errors
- **Supabase Dashboard**: Monitor database queries and performance
- **OpenAI Dashboard**: Track API usage and costs

---

## Cost Breakdown

### Free Tier Includes:
- ✅ **Vercel**: Unlimited deployments, 100GB bandwidth
- ✅ **Supabase**: 500MB database, 50,000 monthly active users
- ✅ **OpenAI**: Pay-as-you-go (~$5-15/month for typical usage)

### Expected Monthly Cost: $5-15 💰

---

## Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **OpenAI Docs**: [platform.openai.com/docs](https://platform.openai.com/docs)

🎉 **Congratulations! Your app is live!**
