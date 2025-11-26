# AiGentsRealty - Deployment Guide

## Prerequisites
- Vercel account
- Supabase account (free tier works)
- OpenAI API key (or alternative AI provider)

## Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and region (closest to your users)
4. Set database password (save this!)
5. Wait for project to provision (~2 minutes)

### 1.2 Get Connection Details
Once created, go to **Settings** → **Database**:
- **Connection Pooling** (Recommended for serverless):
  ```
  postgres://postgres.[PROJECT_ID]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
  ```
- Copy your connection string

### 1.3 Import Your Database Schema
Two options:

**Option A: Using Supabase SQL Editor**
1. Go to SQL Editor in Supabase dashboard
2. Copy your entire `backend/database/init.sql` file
3. Paste and run

**Option B: Using Local Tool**
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Push your schema
psql "YOUR_SUPABASE_CONNECTION_STRING" < backend/database/init.sql
```

### 1.4 Verify Data Import
Run this in SQL Editor to check:
```sql
SELECT COUNT(*) FROM projects;
SELECT COUNT(*) FROM developers;
SELECT COUNT(*) FROM areas;
```

## Step 2: Update Backend for Supabase

### 2.1 Install Supabase Client (Optional - if using their SDK)
```bash
cd backend
npm install @supabase/supabase-js
```

### 2.2 Update Database Config
Update `backend/src/config/database.js`:

```javascript
// For production use Supabase connection string
const connectionString = process.env.DATABASE_URL ||
  process.env.SUPABASE_DB_URL ||
  'postgresql://postgres:postgres@localhost:5432/aigents_realty';

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
```

## Step 3: OpenAI Integration (✅ Already Configured!)

### 3.1 Get OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / Login
3. Go to API Keys
4. Create new secret key
5. Copy it (you won't see it again!)

### 3.2 AI Service Already Set Up! ✅
The OpenAI service is already configured in `backend/src/services/openai.js`:

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateChatResponse(messages, options = {}) {
  const {
    model = 'gpt-4o-mini', // Using GPT-4o-mini for best cost/performance
    temperature = 0.7,
    max_tokens = 1000
  } = options;

  const response = await openai.chat.completions.create({
    model,
      messages: [
        {
          role: 'system',
          content: 'You are a Dubai real estate expert helping users find their perfect off-plan property.'
        },
        {
          role: 'user',
          content: `Based on these preferences: ${JSON.stringify(userPreferences)}, recommend suitable properties.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

module.exports = { generatePropertyRecommendations };
```

### 3.3 Install OpenAI SDK
```bash
cd backend
npm install openai
```

## Step 4: Environment Variables

### 4.1 Create `.env.production` in backend folder
```env
# Database (Supabase)
DATABASE_URL=your_supabase_connection_string_here
SUPABASE_DB_URL=your_supabase_connection_string_here

# AI Service
OPENAI_API_KEY=your_openai_api_key_here

# Server
PORT=3005
NODE_ENV=production
CORS_ORIGIN=https://your-app-name.vercel.app
```

### 4.2 Frontend Environment
Create `frontend/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

## Step 5: Deploy Backend to Vercel

### 5.1 Create `vercel.json` in backend folder
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 5.2 Deploy Backend
```bash
cd backend
vercel --prod

# Follow prompts:
# Set project name: aigentsrealty-backend
# Set environment variables when prompted
```

### 5.3 Add Environment Variables in Vercel Dashboard
1. Go to Vercel dashboard
2. Select your backend project
3. Settings → Environment Variables
4. Add:
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
   - `CORS_ORIGIN`

## Step 6: Deploy Frontend to Vercel

### 6.1 Update `frontend/next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'
  }
}

module.exports = nextConfig
```

### 6.2 Deploy Frontend
```bash
cd frontend
vercel --prod

# Follow prompts:
# Set project name: aigentsrealty
```

### 6.3 Add Environment Variables
1. Vercel dashboard → Frontend project
2. Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_API_URL` = your backend URL from step 5.2

## Step 7: Update CORS

In your backend `server.js`, update CORS to allow Vercel frontend:

```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

## Step 8: Test Production Deployment

1. Visit your frontend URL: `https://aigentsrealty.vercel.app`
2. Test key features:
   - Browse projects (API connection working)
   - Search/filter (database queries working)
   - AI features (OpenAI integration working)

## Cost Estimates (Monthly)

### Supabase (Free Tier)
- ✅ 500MB database
- ✅ 50,000 monthly active users
- ✅ 2GB bandwidth
- **Cost: $0** (upgrade to $25/month Pro when needed)

### OpenAI
- GPT-4 Turbo: ~$0.01 per 1K input tokens
- GPT-3.5 Turbo: ~$0.0005 per 1K input tokens (90% cheaper)
- Estimated: **$10-50/month** depending on usage
- **Tip:** Start with GPT-3.5-turbo, upgrade to GPT-4 later

### Vercel
- Free tier: Hobby plan
- ✅ Unlimited bandwidth
- ✅ 100GB-hours serverless function execution
- **Cost: $0** (upgrade to $20/month Pro when needed)

**Total MVP Cost: $10-50/month** (just OpenAI)

## Alternative: Cost-Free MVP

If you want $0 cost for testing:

1. **Use Free LLM APIs:**
   - Hugging Face Inference API (free tier)
   - Cohere (trial credits)
   - Anthropic Claude (trial credits)

2. **Or Mock AI Responses:**
   ```javascript
   // Temporary mock for testing
   async function generatePropertyRecommendations(prefs) {
     return "Based on your budget and preferences, I recommend checking out Dubai Hills Estate for family-friendly communities with good ROI potential.";
   }
   ```

## Troubleshooting

### Database Connection Issues
```bash
# Test connection locally first
psql "your_supabase_connection_string"

# Check if SSL is required
# Add ?sslmode=require to connection string
```

### API Not Responding
- Check Vercel function logs
- Verify environment variables are set
- Check CORS configuration

### Build Failures
- Check Node version matches (use Node 18+)
- Clear `.next` cache: `rm -rf .next`
- Check `package.json` dependencies

## Next Steps After Deployment

1. **Custom Domain:**
   - Vercel → Settings → Domains
   - Add `aigentsrealty.com`

2. **Analytics:**
   - Vercel Analytics (built-in)
   - Google Analytics
   - Hotjar for user behavior

3. **Monitoring:**
   - Vercel → Analytics
   - Sentry for error tracking
   - Supabase dashboard for DB monitoring

4. **SEO:**
   - Submit sitemap to Google Search Console
   - Set up robots.txt (already done!)
   - Add meta tags for social sharing

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- OpenAI Docs: https://platform.openai.com/docs
