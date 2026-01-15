# Blog Empty - Troubleshooting Guide

## Issue
The `/blog` page is showing empty (no blog posts displayed).

## Most Likely Causes

### 1. **Posts Not Seeded in Sanity** (Most Common)
The posts exist in `backend/seed-data.json` but haven't been imported into your Sanity project yet.

**Solution:**
1. Make sure you have your Sanity credentials set up:
   ```bash
   cd backend
   # Check if .env.local exists with:
   # SANITY_STUDIO_API_PROJECT_ID=your-project-id
   # SANITY_STUDIO_API_DATASET=production (or dev)
   # SANITY_AUTH_TOKEN=your-write-token
   ```

2. Run the seed script:
   ```bash
   cd backend
   npm run seed
   ```

3. Verify in Sanity Studio:
   - Open http://localhost:3333
   - Check if posts appear in the "Post" section
   - You should see 4 posts

### 2. **Environment Variables Not Set on Vercel**
If posts are in Sanity but not showing on the live site, check Vercel environment variables.

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure these are set:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = Your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production` (or `dev`)
   - `SANITY_API_TOKEN` = Your read token (optional, for private content)

3. Redeploy after setting variables

### 3. **Wrong Dataset**
The frontend might be querying a different dataset than where your posts are stored.

**Solution:**
- Check `frontend/.env.local` or Vercel env vars
- Make sure `NEXT_PUBLIC_SANITY_DATASET` matches the dataset where you seeded posts
- Default is `production`, but you might have used `dev`

### 4. **Posts Missing Author Reference**
The import script should handle this, but if posts were created manually, they might be missing author references.

**Solution:**
1. Open Sanity Studio
2. Check each post has an "Author" field set
3. If not, set it to "Tushar Laad"

## Quick Check

Run this in your browser console on the blog page:
```javascript
// Check what data is being passed
console.log('Posts:', window.__NEXT_DATA__?.props?.pageProps?.posts);
```

Or check the network tab for Sanity API calls to see if posts are being fetched.

## Verification Steps

1. ✅ **Check Sanity Studio**: http://localhost:3333 → Posts section
2. ✅ **Check Seed Data**: `backend/seed-data.json` has 4 posts
3. ✅ **Check Import Script**: `backend/import-projects.js` handles posts
4. ✅ **Check Environment Variables**: Both local and Vercel
5. ✅ **Check Build Logs**: Look for Sanity errors during build

## Expected Result

After seeding, you should see:
- 4 blog posts in Sanity Studio
- 4 floating cubes on `/blog` page
- Posts titled:
  1. "Choosing Innovation Over Safety..."
  2. "The Corporate Robot Paradox..."
  3. "Did You Try Reading the Documentation?"
  4. "POV: You Work 16 Hours a Day"

## Still Not Working?

If posts are in Sanity but still not showing:
1. Check browser console for errors
2. Check Vercel build logs for Sanity API errors
3. Verify the Sanity project ID and dataset match between Studio and Frontend
4. Try rebuilding the site: `npm run build` locally to see errors
