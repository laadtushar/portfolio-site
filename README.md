# Tushar Laad - Portfolio Site

Welcome to my portfolio website! This is an interactive 3D portfolio showcasing my work as a Data Engineer and Software Architect.

**Live Site:** [tusharlaad.com](https://tusharlaad.com)  
**Original Template:** Forked from [bryantcodes.art](https://bryantcodes.art) by Bryant Smith

## About This Site

This portfolio features an immersive 3D experience built with Three.js, showcasing my projects, skills, work experience, and testimonials. The site demonstrates my technical capabilities while providing an engaging user experience.

## Quick Links

- 🔗 [LinkedIn](https://linkedin.com/in/tusharlaad2002)
- 📧 Contact: tusharlaad@example.com (update this!)
- 📝 [Deployment Guide](DEPLOYMENT_GUIDE.md)
- 🎨 [Asset Guide](frontend/public/images/ASSETS_README.md)
- 📊 [Projects Setup](backend/PROJECTS_GUIDE.md)

# Great libraries you should try

In no particular order, here are some cool things I found and liked:

- Once you go [Typescript](https://www.typescriptlang.org/), you never go back.
- CMS is [Sanity](https://www.sanity.io/).
- Typesafety in sanity via [sanity-codegen](https://github.com/ricokahler/sanity-codegen).
- Frontend is currently [Next.js](https://nextjs.org/), maybe one day soon it will be [Astro](https://astro.build/).
- Hosted on [Vercel](https://vercel.com/).
- 3D rendering via [Three.js](https://threejs.org/) and the AMAZING declarative implementation [React Three Fiber](https://github.com/pmndrs/react-three-fiber).
- UNBELIEVABLY VALUABLE SET OF THREE.JS TOOLS: [Drei](https://github.com/pmndrs/drei). Must have. I used it to embed HTML in the 3D space, to quickly spin up GLSL shader materials, to draw text, and loads more.
- 3D accessibility tools via [@react-three/a11y](https://github.com/pmndrs/react-three-a11y).
- Useful a11y hooks via [react-aria](https://react-spectrum.adobe.com/react-aria/).
- Best way to handle complex touch/click interactions: [@use-gesture/react](https://www.npmjs.com/package/@use-gesture/react). (E.g. used here for the drawing canvas.)
- Not for everyone, but I wrote nearly all the CSS with [Tailwind](https://tailwindcss.com/) and I love it. Haters? Let's debate. lol!
- My new favorite way to manage state: [Zustand](https://github.com/pmndrs/zustand). I used to use Redux and/or Context, but Zustand beats both for nearly all my state abstraction use cases!
- Loads of great, typesafe react hooks [usehooks-ts](https://usehooks-ts.com/).
- Still trying to decide which I like better between [framer-motion](https://www.framer.com/motion/) and [react-spring](https://react-spring.dev/).
- Observe font loading with [use-font-face-observer](https://www.npmjs.com/package/use-font-face-observer). Helps me wait for Roboto to load before I paint to canvas.
- Great SEO solution for Next.js you probably already found: [next-seo](https://github.com/garmeeh/next-seo).
- I stole my loading spinner from [Pure CSS Spinners](https://loading.io/css/)
- Something I use to quickly spin up UIs to tweak e.g. animation variables in the browser while developing: [Leva](https://github.com/pmndrs/leva).

Notice something? Like 50% of the coolest things come from [pmndrs](https://github.com/pmndrs/). I am a HUGE fan of these cats.

# Development Setup

This is a monorepo with separate frontend and backend directories for type-safe development.

## Prerequisites

- Node.js 16+ and Yarn
- Sanity account ([sanity.io](https://sanity.io))
- Vercel account for deployment ([vercel.com](https://vercel.com))

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd portfolio-site

# Install backend dependencies
cd backend
yarn install

# Install frontend dependencies
cd ../frontend
yarn install
```

### 2. Configure Sanity

```bash
cd backend

# Login to Sanity (first time only)
npx sanity login

# Initialize or link your project
# Follow prompts to create/link Sanity project

# Deploy Sanity Studio
yarn deploy

# Generate TypeScript types
yarn build:types
```

### 3. Configure Environment Variables

Create `frontend/.env.local`:

```bash
cd frontend
cp env.example.txt .env.local
```

Edit `.env.local` with your Sanity credentials:
- Get Project ID from https://sanity.io/manage
- Create API token with Read permissions

### 4. Start Development

**Terminal 1 - Sanity Studio:**
```bash
cd backend
yarn dev
# Opens at http://localhost:3333
```

**Terminal 2 - Next.js Frontend:**
```bash
cd frontend
yarn dev
# Opens at http://localhost:3000
```

## Project Structure

```
portfolio-site/
├── frontend/              # Next.js application
│   ├── pages/            # Next.js pages
│   ├── src/              # React components & 3D scenes
│   ├── public/           # Static assets
│   └── styles/           # Global styles
├── backend/              # Sanity CMS
│   ├── schemas/          # Content schemas
│   └── plugins/          # Sanity plugins
├── DEPLOYMENT_GUIDE.md   # Deployment instructions
└── README.md            # This file
```

## Frontend Commands

In the `frontend` directory:

```bash
# Development server
yarn dev

# Production build (test before deploying)
yarn build

# Start production server locally
yarn start

# Linting
yarn lint
```

## Backend Commands

In the `backend` directory:

```bash
# Start Sanity Studio locally
yarn dev

# Deploy Sanity Studio to cloud
yarn deploy

# Build Sanity Studio
yarn build

# Generate TypeScript types for frontend
# Run this EVERY TIME you change schemas!
yarn build:types
```

## Key Features

### 🎨 Interactive 3D Experience
- Built with Three.js and React Three Fiber
- Smooth camera transitions between scenes
- Interactive elements and animations

### 📊 Dynamic Content via Sanity CMS
- Projects portfolio
- Work experience timeline
- Easy content updates without code changes

### 🚀 Optimized for Vercel
- Static Site Generation (SSG)
- Fast page loads
- Automatic deployments from GitHub

### 📱 Fully Responsive
- Desktop, tablet, and mobile optimized
- Touch-friendly interactions
- Adaptive 3D rendering

## Customization

### Adding Projects
1. Open Sanity Studio (local or deployed)
2. Create new "Project" documents
3. See `backend/PROJECTS_GUIDE.md` for details

### Updating Personal Info
- Edit `frontend/src/aboutContent.tsx`
- Update contact links in `frontend/src/contactHref.tsx`
- Replace images in `frontend/public/images/`

### Modifying 3D Scenes
- Scene logic: `frontend/src/SceneDirector.tsx`
- About slides: `frontend/src/About.tsx`
- Experience: `frontend/src/ExperienceWindow.tsx`

## Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions.

**Quick Deploy:**
1. Push code to GitHub
2. Import repository in Vercel
3. Set root directory to `frontend`
4. Add environment variables
5. Deploy!

## Important Notes

⚠️ **Always run `yarn build:types` after changing Sanity schemas**

⚠️ **Test build before deploying:** `cd frontend && yarn build`

⚠️ **Update images:** Replace placeholder images with your own photos

## Common Issues

### Build fails with "Cannot find module"
- Run `cd backend && yarn build:types`

### Projects not loading
- Check Sanity CORS origins include your domain
- Verify API token has read permissions

### 3D scenes not rendering
- Check browser console for errors
- Verify Three.js dependencies are installed
- Some older browsers may not support WebGL

## Performance Tips

- Optimize images before uploading (use TinyPNG, Squoosh)
- Keep 3D assets lightweight
- Test on mobile devices
- Use Lighthouse for performance audits
