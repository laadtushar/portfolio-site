# Remaining Steps Checklist

## ✅ Completed Steps

- [x] Site branding and metadata updated
- [x] About content personalized (bio, mission, skills)
- [x] Experience section created and integrated
- [x] Testimonial photos integrated (4 real photos)
- [x] Contact links updated (email, LinkedIn, GitHub, Twitter)
- [x] Code documentation created
- [x] Image optimization tools created

---

## 🚨 Critical Steps Remaining (Do These First!)

### 1. Optimize Your Images ⚠️ **URGENT**

**Current Status:** Your headshot images are 5.7MB each (way too large!)

**Action Required:**
```bash
# Option A: Use TinyPNG (Easiest - 2 minutes)
1. Go to https://tinypng.com/
2. Upload headshot.png and headshot-collared.png
3. Download optimized versions
4. Replace original files

# Option B: Use automated script
cd frontend/public/images
npm install sharp
node optimize-images.js
```

**Target:** Reduce each image from 5.7MB to < 200KB

**Why:** Your site will load 95% faster after optimization!

---

### 2. Setup Sanity CMS Backend 🔧

**Action Required:**
```bash
cd backend

# Install dependencies (if not done)
yarn install

# Login to Sanity (first time only)
npx sanity login

# Initialize or link your project
# Follow prompts to create new project or link existing one

# Deploy Sanity Studio
yarn deploy
# This gives you a URL like: https://your-project.sanity.studio

# Generate TypeScript types for frontend
yarn build:types
```

**Get Your Credentials:**
1. Go to https://sanity.io/manage
2. Select your project
3. Note your **Project ID** (visible in URL)
4. Go to **API** → **Tokens** → **Add New Token**
5. Create token with **Read** permissions
6. Copy the token (save it - you won't see it again!)

**Expected Time:** 10-15 minutes

---

### 3. Configure Environment Variables 🔑

**Action Required:**

Create `frontend/.env.local` file:
```bash
cd frontend
cp env.example.txt .env.local
```

Edit `.env.local` and add your Sanity credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_API_TOKEN=your_api_token_here
```

**Important:** 
- `.env.local` is gitignored (safe for secrets)
- Never commit this file to Git
- You'll need these same values for Vercel deployment

**Expected Time:** 2 minutes

---

### 4. Add Projects to Sanity CMS 📊

**Action Required:**

1. Open your Sanity Studio (from step 2)
   - Local: http://localhost:3333 (if running `yarn dev` in backend)
   - Or: https://your-project.sanity.studio

2. Click **"Project"** in the sidebar → **"Create new document"**

3. Add at least 3-6 projects (see `backend/PROJECTS_GUIDE.md` for suggestions):
   - End-to-End Encrypted Chat System
   - Data Pipeline & ETL Systems
   - REST API Development with Docker
   - Machine Learning Data Labeling System
   - Web Development & Speed Optimization
   - Data Analytics & Visualization

4. Fill in required fields:
   - Title, Short Title, Slug (auto-generated)
   - Subtitle, Client
   - Body (detailed description)
   - Highlight Color
   - Links (GitHub, live site, etc.)

5. Click **"Publish"** for each project

**Expected Time:** 30-60 minutes (depending on how many projects)

---

## 🧪 Testing Steps (Before Deployment)

### 5. Test Locally 🖥️

**Action Required:**

**Terminal 1 - Backend:**
```bash
cd backend
yarn dev
# Opens Sanity Studio at http://localhost:3333
```

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn install  # If not done already
yarn dev
# Opens site at http://localhost:3000
```

**Test Checklist:**
- [ ] Site loads without errors
- [ ] About section shows your information correctly
- [ ] Intro → Mission → Testimonials → Skills → Experience flow works
- [ ] Testimonials display with real photos
- [ ] Experience timeline shows your work history
- [ ] Skills painting interaction works
- [ ] Projects appear (if you added them to Sanity)
- [ ] All navigation buttons work
- [ ] Mobile responsive (test on phone or resize browser)

**Expected Time:** 15-20 minutes

---

### 6. Test Production Build 🏗️

**Action Required:**
```bash
cd frontend
yarn build
```

**Check:**
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No missing dependencies
- [ ] Build output shows successful compilation

**If errors occur:**
- Fix any TypeScript errors
- Install missing dependencies
- Check environment variables are set
- Run `cd backend && yarn build:types` if schema changed

**Expected Time:** 5 minutes

---

## 🚀 Deployment Steps

### 7. Deploy to Vercel 🌐

**Action Required:**

1. **Push code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Portfolio customization complete"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click **"New Project"**
   - Import your GitHub repository
   - Select the repository

3. **Configure Project Settings:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `frontend` ⚠️ **IMPORTANT!**
   - **Build Command:** `yarn build`
   - **Output Directory:** `.next` (default)
   - **Install Command:** `yarn install`

4. **Add Environment Variables:**
   In Vercel project settings → **Environment Variables**, add:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
   NEXT_PUBLIC_SANITY_DATASET = production
   NEXT_PUBLIC_SANITY_API_VERSION = 2023-05-03
   SANITY_API_TOKEN = your_api_token
   ```
   ⚠️ Check **all three** environment types (Production, Preview, Development)

5. **Deploy:**
   - Click **"Deploy"**
   - Wait for build to complete (~2-5 minutes)
   - Get your URL: `https://your-project.vercel.app`

**Expected Time:** 15-20 minutes

---

### 8. Configure Custom Domain 🌍

**Action Required:**

1. **In Vercel:**
   - Go to project → **Settings** → **Domains**
   - Add `tusharlaad.com`
   - Add `www.tusharlaad.com` (optional)

2. **Update DNS Records:**
   Vercel will show you DNS records to add:
   - **Apex domain:** `A` record → `76.76.21.21`
   - **www subdomain:** `CNAME` → `cname.vercel-dns.com`
   - Or use Vercel nameservers (easier)

3. **Update Sanity CORS:**
   - Go to https://sanity.io/manage → Your Project → **API** → **CORS Origins**
   - Add: `https://tusharlaad.com`
   - Add: `https://www.tusharlaad.com`

4. **Wait for DNS Propagation:**
   - Usually 10-60 minutes
   - Check with: https://dnschecker.org

**Expected Time:** 30-60 minutes (mostly waiting)

---

### 9. Setup Auto-Rebuilds (Optional but Recommended) 🔄

**Action Required:**

When you update content in Sanity, trigger automatic rebuilds:

1. **In Vercel:**
   - Go to **Settings** → **Git** → **Deploy Hooks**
   - Create deploy hook
   - Copy the webhook URL

2. **In Sanity:**
   - Go to **API** → **Webhooks**
   - Add webhook with Vercel URL
   - Trigger on: **Document created/updated**

Now content updates automatically rebuild your site!

**Expected Time:** 5 minutes

---

## ✨ Post-Deployment Tasks

### 10. Final Verification ✅

**Action Required:**

- [ ] Visit https://tusharlaad.com
- [ ] Test all pages and interactions
- [ ] Test on mobile device
- [ ] Check all links work
- [ ] Verify images load quickly
- [ ] Test testimonials rotation
- [ ] Verify projects display correctly

**Expected Time:** 10 minutes

---

### 11. SEO & Performance 🎯

**Action Required:**

- [ ] **Update social.png** with your branded image (2333x1313px)
- [ ] **Update favicon.png** with your logo
- [ ] Test OpenGraph preview: https://www.opengraph.xyz/
- [ ] Run PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Submit sitemap to Google Search Console
- [ ] Update LinkedIn profile with portfolio link

**Expected Time:** 30 minutes

---

### 12. Optional Enhancements 🎨

**Nice to Have:**

- [ ] Set up Google Analytics (add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to env vars)
- [ ] Add more projects to Sanity CMS
- [ ] Customize colors/branding further
- [ ] Add blog section (if desired)
- [ ] Set up email notifications for form submissions

---

## 📊 Progress Summary

**Completed:** 7/19 steps (37%)
**Remaining:** 12 steps

**Critical Path:**
1. Optimize images (5 min)
2. Setup Sanity (15 min)
3. Configure env vars (2 min)
4. Add projects (30-60 min)
5. Test locally (15 min)
6. Test build (5 min)
7. Deploy to Vercel (20 min)
8. Configure domain (30-60 min)

**Total Estimated Time:** 2-3 hours

---

## 🆘 Need Help?

- **Deployment issues:** See `DEPLOYMENT_GUIDE.md`
- **Project setup:** See `backend/PROJECTS_GUIDE.md`
- **Image optimization:** See `frontend/public/images/OPTIMIZE_IMAGES.md`
- **General setup:** See `README.md`

---

## 🎯 Quick Start (Next 30 Minutes)

If you want to get the site live quickly:

1. **Optimize images** (5 min) - Use TinyPNG
2. **Setup Sanity** (15 min) - Follow step 2 above
3. **Configure env vars** (2 min) - Create .env.local
4. **Test locally** (10 min) - Make sure everything works
5. **Deploy to Vercel** (20 min) - Get it live!

Then add projects and configure domain later.

---

**You're almost there! 🚀**
