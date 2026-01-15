# How to Seed Data into Sanity

## Step 1: Get Your Sanity Write Token

1. Go to https://sanity.io/manage
2. Select your project (project ID: `0ttnaq4a`)
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Name it: "Seed Script" or "Import Token"
6. Set permissions to **Editor** (needs write access)
7. Copy the token (you'll only see it once!)

## Step 2: Set the Token

### Option A: Environment Variable (Recommended)

Create a `.env.local` file in the `backend/` directory:

```bash
# backend/.env.local
SANITY_AUTH_TOKEN=your-token-here
```

Or set it temporarily in PowerShell:
```powershell
$env:SANITY_AUTH_TOKEN="your-token-here"
npm run seed
```

### Option B: Add to Existing .env File

If you already have a `.env` or `.env.local` file, just add:
```
SANITY_AUTH_TOKEN=your-token-here
```

## Step 3: Run the Seed Script

```bash
cd backend
npm run seed
```

## Expected Output

You should see:
```
📋 Using Sanity project: 0ttnaq4a, dataset: dev

🚀 Starting data import...

👤 Importing 1 authors...
   Importing author: Tushar Laad
   ✅ Successfully imported with ID: ...

📦 Importing 6 projects...
   Importing project: ...
   ✅ Successfully imported with ID: ...

📝 Importing 4 blog posts...
   Importing post: ...
   ✅ Successfully imported with ID: ...

✨ Import complete!
```

## Troubleshooting

### "Insufficient permissions"
- Make sure your token has **Editor** permissions (not just Viewer)
- Regenerate the token if needed

### "Configuration must contain projectId"
- The script now reads from `sanity.json` automatically
- If this still fails, check that `backend/sanity.json` exists and has `api.projectId`

### "Failed to import"
- Check that you're using the correct dataset (`dev` or `production`)
- Verify the token is set correctly
- Make sure you're logged into the correct Sanity account

## Verify in Sanity Studio

After seeding, open Sanity Studio:
```bash
cd backend
npm start
```

Then go to http://localhost:3333 and check:
- ✅ **Author** section: Should have "Tushar Laad"
- ✅ **Project** section: Should have 6 projects
- ✅ **Post** section: Should have 4 blog posts

## Notes

- The script will **not** overwrite existing documents (it creates new ones)
- If you run it multiple times, you'll get duplicates
- To avoid duplicates, delete existing documents in Sanity Studio first, or modify the script to check for existing documents
