# Next Steps - Quick Guide

Since you've completed image compression and .env setup, here's what to do next:

## ✅ Completed
- [x] Image compression
- [x] Environment variables configured

## 🚀 Next Steps (In Order)

### 1. Test Production Build (5 minutes)

**Windows PowerShell:**
```powershell
cd frontend
.\test-build.ps1
```

**Or manually:**
```bash
cd frontend
yarn install  # or npm install
yarn build    # or npm run build
```

**Expected:** Build completes without errors

**If errors occur:**
- Check `.env.local` has all required variables
- Verify Sanity project ID and token are correct
- Run `cd backend && yarn build:types` if schema changed

---

### 2. Test Locally (15 minutes)

**Terminal 1 - Backend (Sanity Studio):**
```bash
cd backend
yarn dev
# Opens at http://localhost:3333
```

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn dev
# Opens at http://localhost:3000
```

**Test Checklist:**
- [ ] Site loads at http://localhost:3000
- [ ] About section shows your info
- [ ] Navigation works (Intro → Mission → Testimonials → Skills → Experience)
- [ ] Testimonials show real photos
- [ ] Experience timeline displays
- [ ] Skills painting interaction works
- [ ] Projects section loads (even if empty)
- [ ] No console errors

---

### 3. Add Projects to Sanity (30-60 minutes)

**Open Sanity Studio:**
- Local: http://localhost:3333 (if backend is running)
- Or: https://your-project.sanity.studio

**Add Projects:**
1. Click **"Project"** → **"Create new document"**
2. Fill in:
   - Title: "End-to-End Encrypted Chat System"
   - Short Title: "SecureChat"
   - Slug: Auto-generated
   - Subtitle: "Newcastle University Master's Project"
   - Client: "Academic Research"
   - Body: Detailed description
   - Highlight Color: Choose a color
   - Links: GitHub repo (if available)
3. Click **"Publish"**
4. Repeat for 3-5 more projects

**Suggested Projects:**
- End-to-End Encrypted Chat System
- Data Pipeline & ETL Systems
- REST API Development with Docker
- Machine Learning Data Labeling System
- Web Development & Speed Optimization

**See:** `backend/PROJECTS_GUIDE.md` for detailed instructions

---

### 4. Deploy to Vercel (20 minutes)

**Prerequisites:**
- Code pushed to GitHub
- Build test passed
- Sanity projects added (optional, can add later)

**Steps:**

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Portfolio ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Sign up/login
   - Click **"New Project"**
   - Import your GitHub repository
   - Select the repository

3. **Configure Project:**
   - **Root Directory:** `frontend` ⚠️ **IMPORTANT!**
   - **Framework:** Next.js (auto-detected)
   - **Build Command:** `yarn build` (or `npm run build`)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `yarn install` (or `npm install`)

4. **Add Environment Variables:**
   Click **"Environment Variables"** and add:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = [your project ID]
   NEXT_PUBLIC_SANITY_DATASET = production
   NEXT_PUBLIC_SANITY_API_VERSION = 2023-05-03
   SANITY_API_TOKEN = [your API token]
   ```
   ⚠️ Check **all three** environment types (Production, Preview, Development)

5. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-5 minutes
   - Get your URL: `https://your-project.vercel.app`

---

### 5. Configure Custom Domain (30-60 minutes)

**In Vercel:**
1. Go to project → **Settings** → **Domains**
2. Add `tusharlaad.com`
3. Add `www.tusharlaad.com` (optional)

**Update DNS:**
- Vercel will show DNS records to add
- Add **A record** for apex domain: `76.76.21.21`
- Add **CNAME** for www: `cname.vercel-dns.com`
- Or use Vercel nameservers (easier)

**Update Sanity CORS:**
1. Go to https://sanity.io/manage → Your Project
2. **API** → **CORS Origins**
3. Add: `https://tusharlaad.com`
4. Add: `https://www.tusharlaad.com`

**Wait:** DNS propagation (10-60 minutes)

---

### 6. Verify & Finalize (10 minutes)

- [ ] Visit https://tusharlaad.com
- [ ] Test all features
- [ ] Test on mobile
- [ ] Check all links work
- [ ] Verify images load quickly
- [ ] Update LinkedIn profile with portfolio link

---

## 🆘 Troubleshooting

**Build fails:**
- Check `.env.local` has all variables
- Verify Sanity credentials are correct
- Run `cd backend && yarn build:types`

**Projects not loading:**
- Check Sanity CORS origins include your domain
- Verify API token has read permissions
- Check projects are published in Sanity

**Site not deploying:**
- Verify root directory is `frontend`
- Check environment variables are set
- Review Vercel build logs

---

## 📊 Current Status

**Completed:** 2/6 steps (33%)
**Next:** Test build → Test locally → Add projects → Deploy

**Estimated Time Remaining:** 1.5-2 hours

---

**Ready? Start with step 1: Test Production Build!** 🚀
