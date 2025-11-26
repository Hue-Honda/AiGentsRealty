# How to Add Environment Variables in Vercel

## Method 1: During Deployment (CLI) - Recommended ✅

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
Follow the browser prompt to authenticate.

### Step 3: Deploy Backend with Environment Variables

```bash
cd backend
vercel
```

**When prompted:**
- "Set up and deploy?" → **Y**
- "Which scope?" → Select your account
- "Link to existing project?" → **N**
- "What's your project's name?" → **aigentsrealty-backend**
- "In which directory?" → **./** (just press Enter)
- "Modify settings?" → **Y** (Important!)

**Then it will ask about environment variables:**

Add these one by one when prompted:

```bash
# When asked "Add environment variable?"
1. OPENAI_API_KEY
   Value: [YOUR_OPENAI_API_KEY_HERE]
   Environment: Production, Preview, Development (select all)

2. DATABASE_URL
   Value: [Your Supabase URL - get this from Step 1 of QUICK_DEPLOYMENT_STEPS.md]
   Environment: Production, Preview, Development

3. NODE_ENV
   Value: production
   Environment: Production only

4. CORS_ORIGIN
   Value: https://aigentsrealty.vercel.app
   Environment: Production
   Note: Update this after deploying frontend!
```

---

## Method 2: Via Vercel Dashboard (After Deployment)

### For Projects Already Deployed:

#### Step 1: Go to Project Settings
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project (e.g., "aigentsrealty-backend")
3. Click **"Settings"** tab at the top

#### Step 2: Navigate to Environment Variables
1. In the left sidebar, click **"Environment Variables"**
2. You'll see a form to add new variables

#### Step 3: Add Each Variable

**Visual Guide:**
```
┌─────────────────────────────────────────────────────┐
│  Add Environment Variable                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Name                                               │
│  ┌─────────────────────────────────────────────┐   │
│  │ OPENAI_API_KEY                              │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Value                                              │
│  ┌─────────────────────────────────────────────┐   │
│  │ [YOUR_OPENAI_API_KEY_HERE]                 │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Environments                                       │
│  ☑ Production   ☑ Preview   ☑ Development         │
│                                                     │
│  [Save]  [Cancel]                                  │
└─────────────────────────────────────────────────────┘
```

**For Backend Project, add these:**

1. **Variable 1:**
   - Name: `OPENAI_API_KEY`
   - Value: `[YOUR_OPENAI_API_KEY_HERE]`
   - Environments: ☑ All three boxes

2. **Variable 2:**
   - Name: `DATABASE_URL`
   - Value: Your Supabase connection string
   - Environments: ☑ All three boxes

3. **Variable 3:**
   - Name: `NODE_ENV`
   - Value: `production`
   - Environments: ☑ Production only

4. **Variable 4:**
   - Name: `CORS_ORIGIN`
   - Value: `https://aigentsrealty.vercel.app` (your frontend URL)
   - Environments: ☑ Production only

**For Frontend Project, add:**

1. **Variable:**
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://aigentsrealty-backend.vercel.app` (your backend URL)
   - Environments: ☑ All three boxes

#### Step 4: Redeploy After Adding Variables
**Important:** Environment variables only take effect after redeployment!

1. Go to **"Deployments"** tab
2. Click on the latest deployment
3. Click **"⋯"** (three dots) menu
4. Select **"Redeploy"**
5. Confirm the redeploy

---

## Quick Copy-Paste Values

### Backend Environment Variables:

```
Name: OPENAI_API_KEY
Value: [YOUR_OPENAI_API_KEY_HERE]

Name: DATABASE_URL
Value: [GET FROM SUPABASE - see below]

Name: NODE_ENV
Value: production

Name: CORS_ORIGIN
Value: [YOUR FRONTEND URL - add after deploying frontend]
```

### Frontend Environment Variables:

```
Name: NEXT_PUBLIC_API_URL
Value: [YOUR BACKEND URL - add after deploying backend]
```

---

## Getting Your Supabase DATABASE_URL

### Step 1: Go to Supabase
1. Visit [supabase.com](https://supabase.com)
2. Log in to your project

### Step 2: Get Connection String
1. Click **Settings** (gear icon)
2. Click **Database** in sidebar
3. Scroll to **"Connection string"**
4. Select **"URI"** tab
5. Copy the connection string

**It looks like this:**
```
postgresql://postgres.abcdefgh:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Important:** Replace `[YOUR-PASSWORD]` with your actual database password!

---

## Verification Steps

### After Adding Variables to Backend:

Test your backend API:
```bash
curl https://your-backend-url.vercel.app/api/projects
```

You should get JSON response with projects ✅

### After Adding Variables to Frontend:

1. Visit your frontend URL
2. Open browser console (F12)
3. Check for any errors
4. Navigate to Projects page - should load data ✅

---

## Common Mistakes to Avoid ❌

1. **Forgetting to redeploy** after adding variables
   - Variables don't take effect until you redeploy!

2. **Not selecting all environments**
   - Most variables need Production + Preview + Development

3. **Typos in variable names**
   - Must match exactly: `OPENAI_API_KEY` not `OPENAI_API_KEY_`

4. **Forgetting to replace passwords**
   - In Supabase URL, replace `[YOUR-PASSWORD]` with actual password

5. **Wrong CORS origin**
   - Must match frontend URL exactly (including https://)

---

## Troubleshooting

### Error: "OPENAI_API_KEY is not defined"
**Solution:**
- Check variable is added in Vercel dashboard
- Verify spelling: `OPENAI_API_KEY`
- Redeploy after adding

### Error: "Cannot connect to database"
**Solution:**
- Check DATABASE_URL is correct
- Verify you replaced [YOUR-PASSWORD]
- Test connection in Supabase SQL editor first

### Error: "CORS policy blocked"
**Solution:**
- Check CORS_ORIGIN matches frontend URL
- Include https:// in the URL
- Redeploy backend after changing

---

## Next Steps After Adding Variables

1. ✅ Verify backend is running: `https://your-backend.vercel.app/api/projects`
2. ✅ Verify frontend loads: `https://your-frontend.vercel.app`
3. ✅ Test AI chat functionality
4. ✅ Check browser console for errors
5. ✅ Monitor Vercel deployment logs

🎉 **Done! Your app should now be fully functional in production!**
