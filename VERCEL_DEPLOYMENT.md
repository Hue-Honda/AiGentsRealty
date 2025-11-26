# Vercel Deployment Guide - AiGentsRealty

## 🔧 Critical Fix for Backend Database Connection

### The Problem
Your backend at `https://aigentsrealty-backend.vercel.app` is failing to connect to Supabase because:
1. **Vercel uses serverless functions** that create new database connections on each request
2. Direct PostgreSQL connections (port 5432) don't work well in serverless environments
3. You need to use **Supabase's Connection Pooler** instead

### Error Found
```json
{
  "success": false,
  "database_connected": false,
  "error": "getaddrinfo ENOTFOUND db.hieedqfvofdeskixcywu.supabase.co",
  "has_database_url": true
}
```

## ✅ The Solution

### Step 1: Get Your Supabase Connection Pooler URL

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `hieedqfvofdeskixcywu`
3. Go to **Settings** → **Database**
4. Find **Connection Pooling** section
5. Copy the **Connection String** that uses **Transaction Mode** (port 6543)

It should look like:
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

The key differences:
- ❌ OLD (Direct): `db.[PROJECT-REF].supabase.co:5432`
- ✅ NEW (Pooler): `aws-0-[REGION].pooler.supabase.com:6543`

### Step 2: Update Vercel Backend Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **backend project**: `aigentsrealty-backend`
3. Go to **Settings** → **Environment Variables**
4. Find `DATABASE_URL` and **Edit** it
5. Replace with the **Connection Pooler URL** from Step 1 (paste the full URL you copied from Supabase)
6. Make sure it's set for **Production**, **Preview**, and **Development** environments
7. Click **Save**

### Step 3: Redeploy

Vercel should automatically redeploy after you save the environment variable. If not:
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**

## 🧪 Testing

After redeployment (wait 30-60 seconds), test these endpoints:

### 1. Health Check (should already work)
```bash
curl https://aigentsrealty-backend.vercel.app/health
```
Expected:
```json
{"status":"OK","timestamp":"...","uptime":123,"environment":"production"}
```

### 2. Database Connection Test (NEW)
```bash
curl https://aigentsrealty-backend.vercel.app/db-test
```
Expected after fix:
```json
{
  "success": true,
  "database_connected": true,
  "current_time": "2025-11-26T...",
  "db_version": "PostgreSQL 15.x...",
  "has_database_url": true,
  "database_url_prefix": "postgresql://postgres.hieedqfv..."
}
```

### 3. Projects Suggestions (Main API)
```bash
curl https://aigentsrealty-backend.vercel.app/api/projects/suggestions
```
Expected after fix:
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "Business Central Towers",
      "location": "Business Bay",
      "price_from": "AED 850K",
      ...
    },
    ...
  ]
}
```

## 🎯 What This Fixes

Once the DATABASE_URL is updated:
- ✅ Backend can connect to Supabase from Vercel serverless functions
- ✅ `/api/projects/suggestions` will return 6 projects
- ✅ `/api/chat` will work with AI Genie
- ✅ Frontend will display property suggestions
- ✅ Genie chat will respond to user queries

## 📝 Current Environment Variables Needed

### Backend (aigentsrealty-backend.vercel.app)
```env
DATABASE_URL=postgresql://postgres.hieedqfvofdeskixcywu:[YOUR_PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
OPENAI_API_KEY=[YOUR_OPENAI_API_KEY]
NODE_ENV=production
CORS_ORIGIN=https://ai-gents-realty.vercel.app
```

**Note:** Get the actual DATABASE_URL with password from your Supabase Dashboard → Settings → Database → Connection Pooling

### Frontend (ai-gents-realty.vercel.app)
```env
NEXT_PUBLIC_API_URL=https://aigentsrealty-backend.vercel.app
```

## 🔍 Why This Happens

**Serverless Functions vs Traditional Servers:**
- Traditional servers maintain persistent database connections
- Vercel serverless functions spin up fresh instances for each request
- Each function instance tries to create a new database connection
- PostgreSQL has a limited connection pool (typically 20-100 connections)
- Without connection pooling, you quickly exhaust available connections

**Supabase Connection Pooler:**
- Acts as a middleware between your app and the database
- Manages a pool of persistent connections to PostgreSQL
- Routes serverless function requests through this pool
- Supports thousands of concurrent connections
- Uses PgBouncer in Transaction mode

## 📚 Reference

- [Supabase Connection Pooling Guide](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [PgBouncer Documentation](https://www.pgbouncer.org/)

---

**Last Updated:** 2025-11-26
**Status:** Awaiting user to update DATABASE_URL in Vercel
