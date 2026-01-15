# Sanity Studio Setup & Seeding Guide

## ✅ What I've Done

1. **Created Seed Data** - `backend/seed-data.json` with all 6 projects from your LinkedIn
2. **Created Import Script** - `backend/import-projects.js` to automatically import projects
3. **Added Seed Command** - `npm run seed` in package.json
4. **Started Sanity Studio** - Running in background terminal

## 🚀 Quick Start

### Step 1: Access Sanity Studio

Sanity Studio is now starting up! Once it's ready, you can access it at:

```
http://localhost:3333
```

It should automatically open in your browser.

### Step 2: Login to Sanity

You'll need to:
1. Sign in with your Google/GitHub/Email account
2. Create a new Sanity project (or use existing)
3. Note your **Project ID** and **Dataset name** (usually "production")

### Step 3: Set Environment Variables

Create `.env.local` in the `backend/` folder:

```bash
SANITY_STUDIO_API_PROJECT_ID=your-project-id-here
SANITY_STUDIO_API_DATASET=production
SANITY_AUTH_TOKEN=your-auth-token-here
```

Also create `.env.local` in the `frontend/` folder:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
```

### Step 4: Get Your Auth Token

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token with **Editor** permissions
5. Copy the token and add to your `.env.local`

### Step 5: Seed the Projects

Once environment variables are set, run:

```bash
cd backend
npm run seed
```

This will automatically import:

**Author Profile:**
- Tushar Laad (your author profile)

**6 Projects:**
- NLP and LLM Job Matching Platform
- End-to-End Encrypted Chat Application
- Real-Time Collaborative Whiteboard
- XpenseLab
- Parivartan NGO Website
- Vail Perfumes E-commerce

**4 Blog Posts:**
- "Choosing Innovation Over Safety" (Nov 2025)
- "The Corporate Robot Paradox" (Jan 2026)
- "Did You Try Reading the Documentation?" (Mar 2023)
- "POV: You Work 16 Hours a Day" (Sep 2022)

### Step 6: Deploy to Vercel

Update environment variables in Vercel:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2023-05-03`

Then redeploy from the **Deployments** tab.

---

## 📦 What's in the Seed Data

All projects are formatted to match the Sanity schema with:
- Title & Short Title
- Slug (URL-friendly)
- Subtitle
- Client/Associated Organization
- Links (GitHub, Live Demo, Videos)
- Body content (formatted as Sanity blocks)
- Color themes for each project

---

## 🎨 Customizing Projects

After seeding, you can:

1. Edit any project in Sanity Studio
2. Add images/screenshots
3. Add more detailed content
4. Rearrange order
5. Mark projects as featured
6. Add project videos

---

## 🔧 Troubleshooting

### "Configuration must contain projectId"
- Make sure `.env.local` files are created in both `frontend/` and `backend/`
- Restart the dev servers after adding env variables

### "Auth token required"
- Create a token in Sanity dashboard
- Add to `backend/.env.local` as `SANITY_AUTH_TOKEN`

### Import script fails
- Check that your Sanity project is created
- Verify your auth token has **Editor** permissions
- Make sure project ID and dataset name are correct

---

## 📝 Manual Alternative

If you prefer to add projects manually:

1. Open Sanity Studio (http://localhost:3333)
2. Click **Project** in the sidebar
3. Click **Create** button
4. Copy information from `LINKEDIN_PROJECTS_GUIDE.md`
5. Fill in the form and **Publish**

---

## 🎉 Next Steps

Once projects are seeded:
1. Your frontend will automatically fetch and display them
2. The 3D project showcase will populate with your work
3. Visit your deployed site to see the changes!
