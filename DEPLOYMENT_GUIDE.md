# Deployment Guide - Tushar Laad Portfolio

This guide walks you through deploying your portfolio to Vercel.

## Prerequisites

1. **GitHub Account:** Your code should be in a GitHub repository
2. **Vercel Account:** Sign up at [vercel.com](https://vercel.com) (free)
3. **Sanity Account:** Your CMS should be set up at [sanity.io](https://sanity.io)

## Step 1: Prepare Sanity CMS

### 1.1 Deploy Sanity Studio

```bash
cd backend
yarn install
yarn deploy
```

This will:
- Deploy your Sanity Studio to the cloud
- Give you a URL like: `https://your-project.sanity.studio`
- Allow you to manage content from anywhere

### 1.2 Get Sanity Credentials

1. Go to https://sanity.io/manage
2. Select your project
3. Note your **Project ID** (visible in URL and settings)
4. Go to **API** tab
5. Click **Tokens** → **Add New Token**
6. Create a token with **Read** permissions
7. Copy the token (you won't see it again!)

### 1.3 Add CORS Origins

1. In Sanity Manage → **API** → **CORS Origins**
2. Add these origins:
   - `http://localhost:3000` (for local development)
   - `https://tusharlaad.com` (your production domain)
   - `https://*.vercel.app` (Vercel preview deployments)

### 1.4 Generate TypeScript Types

```bash
cd backend
yarn build:types
```

This creates `frontend/generatedSanitySchemaTypes.ts` for type safety.

### 1.5 Add Content

1. Open your Sanity Studio (locally or deployed URL)
2. Add your projects using the guide in `backend/PROJECTS_GUIDE.md`
3. Add work experience entries
4. Publish everything

## Step 2: Configure Environment Variables

### 2.1 Local Development

Create `frontend/.env.local`:

```bash
cd frontend
cp .env.local.example .env.local
```

Edit `.env.local` and add your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_API_TOKEN=sk...your_token...xyz
```

### 2.2 Test Locally

```bash
cd frontend
yarn install
yarn dev
```

Visit `http://localhost:3000` and verify:
- Site loads without errors
- About section shows your information
- Projects appear (if you added them to Sanity)
- All links work

### 2.3 Test Build

```bash
cd frontend
yarn build
```

This must succeed without errors before deploying.

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Select the repository: `portfolio-site`

### 3.2 Configure Project Settings

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** `frontend`

**Build Command:** `yarn build`

**Output Directory:** `.next` (default)

**Install Command:** `yarn install`

### 3.3 Add Environment Variables

In Vercel project settings → **Environment Variables**, add:

| Name | Value | Environments |
|------|-------|--------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your project ID | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2023-05-03` | Production, Preview, Development |
| `SANITY_API_TOKEN` | Your API token | Production, Preview, Development |

**Important:** Check all three environment types for each variable.

### 3.4 Deploy

Click **Deploy**

Vercel will:
1. Install dependencies
2. Run the build
3. Deploy your site
4. Give you a URL like: `https://your-project.vercel.app`

## Step 4: Configure Custom Domain

### 4.1 Add Domain in Vercel

1. Go to your project → **Settings** → **Domains**
2. Add `tusharlaad.com`
3. Add `www.tusharlaad.com` (optional)

### 4.2 Update DNS Records

Vercel will show you what DNS records to add. Typically:

**For apex domain (tusharlaad.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

**Or use Vercel Nameservers (easier):**
- Update your domain registrar to use Vercel's nameservers
- Vercel manages all DNS automatically

### 4.3 Update Sanity CORS

Add your custom domain to Sanity CORS origins:
- `https://tusharlaad.com`

### 4.4 Verify

Wait 10-60 minutes for DNS propagation, then visit:
- https://tusharlaad.com ✅

## Step 5: Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

### Manual Redeployment

1. Go to Vercel project → **Deployments**
2. Click **...** menu on any deployment
3. Click **Redeploy**

### Triggering Rebuild (When CMS Content Changes)

When you update content in Sanity:

**Option 1: Manual Rebuild**
- Go to Vercel → **Deployments** → **Redeploy**

**Option 2: Webhook (Recommended)**
1. In Vercel → **Settings** → **Git** → **Deploy Hooks**
2. Create a deploy hook
3. Copy the webhook URL
4. In Sanity → **API** → **Webhooks**
5. Add webhook with Vercel URL
6. Now content updates trigger automatic rebuilds!

## Step 6: Post-Deployment Checklist

### Verify Everything Works

- [ ] Site loads at your domain
- [ ] About section shows your info
- [ ] Projects load from Sanity
- [ ] Experience timeline displays
- [ ] All navigation works
- [ ] 3D scenes render properly
- [ ] Mobile responsive
- [ ] Links work (LinkedIn, GitHub, etc.)

### SEO & Performance

- [ ] Update OpenGraph image at `/images/social.png`
- [ ] Test site speed: [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags with [OpenGraph Debugger](https://www.opengraph.xyz/)

### Analytics (Optional)

1. Create Google Analytics 4 property
2. Add measurement ID to Vercel environment variables:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. Redeploy

## Troubleshooting

### Build Fails

**Error: "Cannot find module 'sanity'"**
- Solution: Run `cd backend && yarn build:types` to generate types

**Error: "SANITY_API_TOKEN is not defined"**
- Solution: Add token to Vercel environment variables

**Error: "Projects not loading"**
- Solution: Check Sanity CORS origins include your domain
- Verify API token has read permissions

### 3D Performance Issues

- Check device/browser compatibility
- Three.js works best on modern browsers
- Mobile performance may vary

### Content Not Updating

- Trigger manual redeployment in Vercel
- Or set up Sanity webhook for automatic rebuilds

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Sanity Docs:** https://sanity.io/docs

## Security Notes

- Never commit `.env.local` to Git (it's gitignored)
- Sanity tokens in Vercel are encrypted
- Use read-only tokens (not write tokens) in frontend
- Regularly rotate API tokens

## Maintenance

### Regular Updates

```bash
# Update dependencies
cd frontend && yarn upgrade
cd backend && yarn upgrade

# Test locally
yarn build

# Commit and push (triggers auto-deploy)
git add .
git commit -m "Update dependencies"
git push
```

### Monitoring

- Check Vercel dashboard for deployment status
- Monitor analytics for traffic patterns
- Review Sanity usage dashboard

---

**Congratulations!** 🎉 Your portfolio is now live at tusharlaad.com!
