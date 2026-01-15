# Vercel Deployment Fix

## The Problem

Your Vercel deployment failed because the Next.js app is in the `frontend/` subdirectory, but Vercel tried to build from the root.

## The Solution

You need to configure the **Root Directory** in your Vercel project settings.

### Option 1: Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **General**
4. Scroll to **Root Directory**
5. Click **Edit**
6. Enter: `frontend`
7. Click **Save**
8. Go to **Deployments** tab
9. Click **"..."** menu on latest deployment → **Redeploy**

### Option 2: Via Vercel CLI

If you have Vercel CLI installed with auth token:

```bash
# Link project (if not already linked)
vercel link

# Deploy with root directory specified
vercel --build-env NEXT_PUBLIC_SANITY_PROJECT_ID=$env:NEXT_PUBLIC_SANITY_PROJECT_ID --build-env NEXT_PUBLIC_SANITY_DATASET=$env:NEXT_PUBLIC_SANITY_DATASET --build-env NEXT_PUBLIC_SANITY_API_VERSION=$env:NEXT_PUBLIC_SANITY_API_VERSION --build-env SANITY_API_TOKEN=$env:SANITY_API_TOKEN --cwd=frontend
```

### Option 3: Create vercel.json in frontend/ subdirectory

Instead of a root `vercel.json`, create `frontend/vercel.json`:

```json
{
  "framework": "nextjs"
}
```

Then in Vercel project settings, set Root Directory to `frontend`.

## Environment Variables

Don't forget to add these in Vercel project settings → **Environment Variables**:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2023-05-03
SANITY_API_TOKEN = your_api_token
```

Check **all three** environments: Production, Preview, Development

## After Configuration

1. Set Root Directory to `frontend`
2. Add environment variables
3. Redeploy (either via dashboard or CLI)

Your site should build successfully!

## Quick Fix Steps

1. **Set Root Directory**: Vercel Dashboard → Your Project → Settings → General → Root Directory → `frontend`
2. **Add Env Vars**: Settings → Environment Variables → Add all 4 variables above
3. **Redeploy**: Deployments tab → Click "..." on latest → Redeploy

That's it! Your Next.js build will now work correctly.
