# Sanity CMS Data Structure Guide

## Overview

Your portfolio site uses **Sanity CMS** as a headless content management system. Sanity doesn't use traditional "tables" like SQL databases. Instead, it uses **document types** (schemas) that define the structure of your content.

## Data Types (Document Schemas)

You have **7 main document types** in Sanity:

### 1. **Author** (`author`)
- **Purpose**: Stores information about blog post authors
- **Fields**:
  - `name` (string): Author's name
  - `slug` (string): URL-friendly identifier
  - `image` (image): Author's profile picture
  - `bio` (array of blocks): Author biography
- **Usage**: Referenced by blog posts to indicate who wrote them

### 2. **Project** (`project`)
- **Purpose**: Stores portfolio project information
- **Fields**:
  - `title` (string): Full project title
  - `shortTitle` (string): Shortened title for displays
  - `slug` (string): URL-friendly identifier (e.g., `nlp-llm-job-matching`)
  - `subTitle` (string): Project subtitle
  - `client` (string): Client name
  - `designers` (array): Array of designer objects (name, url)
  - `links` (array): Array of link objects (text, url)
  - `body` (blockContent): Rich text content describing the project
  - `color1` (color): Highlight color for the project
- **Usage**: Displayed in the 3D "Projects" scene as interactive ice cubes

### 3. **Post** (`post`)
- **Purpose**: Stores blog articles
- **Fields**:
  - `title` (string): Article title
  - `slug` (string): URL-friendly identifier (e.g., `choosing-innovation-over-safety`)
  - `author` (reference): Links to an `author` document
  - `mainImage` (image): Featured image for the blog post
  - `categories` (array): Array of category references
  - `publishedAt` (datetime): Publication date
  - `body` (blockContent): Rich text content of the article
- **Usage**: Displayed in the 3D "Blog" scene as interactive cubes

### 4. **Experience** (`experience`)
- **Purpose**: Stores work experience entries
- **Fields**:
  - `company` (string): Company name
  - `role` (string): Job title/role
  - `startDate` (date): Employment start date
  - `endDate` (date): Employment end date (optional if current)
  - `current` (boolean): Whether this is the current position
  - `location` (string): Job location
  - `description` (array of blocks): Job responsibilities and achievements
  - `technologies` (array of strings): Technologies used
  - `companyUrl` (url): Company website
  - `logo` (image): Company logo
  - `order` (number): Display order (lower = more recent)
- **Usage**: Currently displayed in `ExperienceWindow.tsx` (static data), but can be migrated to Sanity

### 5. **Category** (`category`)
- **Purpose**: Categorizes blog posts
- **Fields**:
  - `title` (string): Category name
  - `description` (text): Category description
- **Usage**: Used to organize and filter blog posts

### 6. **Image Figure** (`imageFigure`)
- **Purpose**: Embedded images in rich text content
- **Usage**: Used within `blockContent` to include images in project/post bodies

### 7. **Video Figure** (`videoFigure`)
- **Purpose**: Embedded videos in rich text content
- **Usage**: Used within `blockContent` to include videos in project/post bodies

## Supporting Types (Not Documents)

These are used within documents but aren't standalone:

- **Block Content** (`blockContent`): Rich text editor with support for:
  - Headings, paragraphs, lists
  - Links, images, videos
  - Custom blocks (YouTube, Vimeo embeds)
- **YouTube** (`youtube`): YouTube video embed block
- **Vimeo** (`vimeo`): Vimeo video embed block

## How Data Flows

```
┌─────────────────┐
│  Sanity Studio  │  ← You edit content here
│   (localhost)   │
└────────┬────────┘
         │
         │ (API calls)
         ▼
┌─────────────────┐
│  Sanity Cloud   │  ← Content stored here
│   (Backend)     │
└────────┬────────┘
         │
         │ (GraphQL/HTTP API)
         ▼
┌─────────────────┐
│  Next.js App    │  ← Your portfolio site
│   (Frontend)    │
└─────────────────┘
```

## Data Fetching in Your App

### Frontend (`frontend/src/sanity/sanityClient.ts`)
- Uses `@sanity/client` to query Sanity API
- Fetches data at build time (SSG) or runtime (ISR)
- Queries are written in GROQ (Graph-Relational Object Queries)

### Example Queries:
```typescript
// Get all projects
const projects = await client.getAll('project');

// Get a single project by slug
const project = await client.get('project', { slug: 'nlp-llm-job-matching' });

// Get all posts
const posts = await client.getAll('post');
```

## Current Data Status

### ✅ Seeded (in `backend/seed-data.json`):
- **1 Author**: Tushar Laad
- **6 Projects**: All LinkedIn projects parsed and structured
- **4 Posts**: All LinkedIn articles parsed and structured

### ⚠️ Not Yet in Sanity (Still Static):
- **Experience**: Currently hardcoded in `ExperienceWindow.tsx`
- **Education**: Currently hardcoded in `EducationWindow.tsx`
- **Volunteer**: Currently hardcoded in `VolunteerWindow.tsx`

## How to Access Sanity Studio

1. **Start the Studio**:
   ```bash
   cd backend
   npm start
   ```

2. **Open in Browser**:
   - Studio runs at: `http://localhost:3333`
   - You'll need to log in with your Sanity account

3. **What You Can Do**:
   - ✅ View all projects and posts
   - ✅ Edit existing content
   - ✅ Create new projects/posts
   - ✅ Upload images
   - ✅ Manage categories
   - ✅ Edit author information

## Environment Variables Needed

For the Studio to work, you need:
- `SANITY_STUDIO_PROJECT_ID`: Your Sanity project ID (from `sanity.json`)
- `SANITY_STUDIO_DATASET`: Your dataset name (usually `production` or `dev`)

For the Frontend to fetch data:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Same project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Same dataset
- `SANITY_API_TOKEN`: Read token (optional, for private content)

## Next Steps

1. **Review Seeded Data**: Open Sanity Studio and verify all projects/posts are there
2. **Add Missing Content**: Consider migrating experience/education to Sanity
3. **Customize**: Edit project descriptions, add images, update blog posts
4. **Deploy**: Changes in Sanity automatically reflect on your site (after rebuild)
