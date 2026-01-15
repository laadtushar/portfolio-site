# Vercel Auto-Seed Configuration Guide

This guide explains how to automatically seed your Sanity CMS with data from `backend/seed-data.json` on every Vercel deployment **without creating duplicates**.

## ✅ Upsert Logic (Update or Insert)

The `backend/import-projects.js` script now uses **upsert logic**:
- **Checks if data exists** by unique identifier (slug for projects/posts, email for authors)
- **Updates** if exists (preserves existing `_id`)
- **Creates** if doesn't exist (new document)
- **Never creates duplicates** - safe to run multiple times

## 🚀 Option 1: Automatic Seed on Every Deployment (Recommended)

### Step 1: Add Sanity Token to Vercel Environment Variables

1. Go to [Sanity.io Manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token with **Editor** permissions
5. Copy the token

6. Go to your Vercel project dashboard
7. Navigate to **Settings** → **Environment Variables**
8. Add the following variables:

```
SANITY_AUTH_TOKEN=your-token-here
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 2: Add Build Hook to package.json

The seed script will run automatically after the Next.js build.

**Update `frontend/package.json`:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "npm run seed:safe",
    "seed:safe": "cd ../backend && npm install && npm run seed || true",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Explanation:**
- `postbuild` runs automatically after `npm run build`
- `seed:safe` runs the seed script from the backend
- `|| true` ensures deployment succeeds even if seeding fails (optional)

### Step 3: Deploy to Vercel

Every deployment will now:
1. Build your Next.js frontend
2. Automatically run the seed script
3. Upsert (update or insert) all data from `seed-data.json`
4. **No duplicates** - existing data is updated, new data is created

## 🎯 Option 2: Manual Seed (Alternative)

If you prefer to seed manually after deployment:

### Local Seeding:

```bash
cd backend
npm run seed
```

### Remote Seeding (via Vercel CLI):

```bash
vercel env pull .env.local
cd backend
npm run seed
```

## 📝 Updating Seed Data

To update your content:

1. Edit `backend/seed-data.json`
2. Commit and push changes
3. Vercel will automatically:
   - Deploy new code
   - Run seed script
   - Update Sanity content (no duplicates)

## 🔍 Verification

After deployment:

1. Check Vercel build logs for seed output:
   - Should see `✅ Updated` for existing content
   - Should see `✅ Created` for new content

2. Check Sanity Studio:
   - Visit `http://localhost:3333` (or your Sanity Studio URL)
   - Verify projects, posts, and author are present
   - No duplicate slugs should exist

## 🛡️ Safety Features

The seed script is **idempotent** (safe to run multiple times):

- ✅ **No duplicates** - checks by slug/email before creating
- ✅ **Updates existing** - preserves document IDs and relationships
- ✅ **Safe for production** - won't delete or overwrite unrelated data
- ✅ **Fast** - only updates changed fields
- ✅ **Logged** - shows what was created vs updated

## 🚨 Troubleshooting

### Build fails with "Sanity projectId is required"

**Solution:** Add `NEXT_PUBLIC_SANITY_PROJECT_ID` to Vercel environment variables.

### Build succeeds but no data in Sanity

**Solution:** Check Vercel build logs for seed errors. Ensure `SANITY_AUTH_TOKEN` is set with Editor permissions.

### Some data is not updating

**Solution:** Check that your seed data has valid `slug.current` values that match existing documents.

### Script creates duplicates

**Solution:** Verify you're using the latest `import-projects.js` with upsert logic. Re-run the seed script - it should detect and update existing documents.

## 📊 Example Vercel Build Log (Success)

```
▲ Next.js 14.2.12
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (4/4)
✓ Finalizing page optimization

Route (pages)                              Size     First Load JS
┌ ○ /                                      1.5 kB          200 kB
├ ○ /404                                   182 B           100 kB
└ ○ /[scene]                               1.2 kB          198 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)

🚀 Running postbuild hook...
📄 Loading backend/.env.local...
✅ Environment variables loaded

🔍 Environment check:
   Project ID: ✅ Found
   Dataset: ✅ production
   Token: ✅ Found

🚀 Starting data import (upsert mode - no duplicates)...

👤 Importing 1 authors...
   Checking author: Tushar Laad
   ✅ Updated author with ID: abc123

📦 Importing 10 projects...
   Checking project: XpenseLab
   ✅ Updated project with ID: def456
   ...

📝 Importing 4 blog posts...
   Checking post: Choosing Innovation Over Safety
   ✅ Updated post with ID: ghi789
   ...

✨ Import complete! (No duplicates created)
```

## 🎉 Benefits

- **Always up-to-date**: Content syncs on every deploy
- **No manual work**: Automatic, hands-off
- **Version controlled**: Seed data in Git
- **No duplicates**: Upsert logic prevents duplicate content
- **Safe**: Non-destructive updates
- **Fast**: Only updates changed data
- **Auditable**: Build logs show what changed

---

**Note:** This setup is production-ready and will keep your Sanity CMS in sync with your seed data automatically on every deployment! 🚀
