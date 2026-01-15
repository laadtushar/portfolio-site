# LinkedIn Blog Articles

This document contains information about blog articles from LinkedIn that can be integrated into the portfolio site.

## Articles List

### 1. Choosing Innovation Over Safety
**File:** `choosing-innovation-over-safety-what-my-journey-appsatile-tushar-laad-xg2be.html`
**Title:** Choosing Innovation Over Safety: What My Journey With Appsatile Taught Me About Risk, Research, and the Future of Indian Tech
**Created:** 2025-11-14
**Published:** 2025-11-14
**URL:** https://www.linkedin.com/pulse/choosing-innovation-over-safety-what-my-journey-appsatile-tushar-laad-xg2be

**Summary:** Personal reflection on choosing innovation over traditional career safety, discussing India's tech landscape, the need for more risk-taking in Indian tech culture, and the value of research and experimentation.

**Key Topics:**
- Innovation vs. Safety
- Indian Tech Culture
- Startup Experience at Appsatile
- Research & Development
- Risk-taking in Career

---

### 2. The Corporate Robot Paradox
**File:** `corporate-robot-paradox-why-innovation-doesnt-tushar-laad-cqooe.html`
**Title:** The Corporate Robot Paradox: Why Innovation Doesn't Happen Inside Traditional Companies

**Summary:** Discusses why innovation is difficult in traditional corporate environments and how startup culture enables more creative problem-solving.

**Key Topics:**
- Corporate Innovation
- Startup Culture
- Creative Problem-Solving
- Organizational Dynamics

---

### 3. Did You Try Reading the Documentation?
**File:** `did-you-try-reading-documentation-finding-tushar-laad-k8oie.html`
**Title:** Did You Try Reading the Documentation? Finding the Balance Between Self-Reliance and Asking for Help

**Summary:** Explores the balance between independently solving problems through documentation and knowing when to ask for help in software development.

**Key Topics:**
- Documentation
- Problem-Solving
- Software Development
- Learning
- Team Collaboration

---

### 4. POV: You Work 16 Hours a Day
**File:** `pov-you-work-16-hours-day-you-still-dont-tushar-laad-ygdoe.html`
**Title:** POV: You Work 16 Hours a Day but You Still Don't Understand Your Job

**Summary:** Commentary on work-life balance, understanding your role, and the difference between working hard and working effectively.

**Key Topics:**
- Work-Life Balance
- Career Development
- Productivity
- Understanding Work Value

---

## Future Blog Integration

### Option 1: Add to Sanity CMS
Create a new schema `blogPost.ts` in `backend/schemas/` with fields:
- Title
- Slug
- Author
- Published Date
- Content (portable text)
- Featured Image
- Tags/Categories
- Excerpt

### Option 2: Static Blog Pages
Create static pages in `frontend/pages/blog/`:
- `index.tsx` - Blog listing page
- `[slug].tsx` - Individual blog post pages

Convert HTML content to Markdown or React components.

### Option 3: External Blog Link
Simply link to LinkedIn articles from the portfolio site with a "Blog" or "Articles" section that lists titles and links to the original LinkedIn posts.

---

## Recommendation

**Best approach:** Add a simple "Writings" or "Articles" section to the About slides (similar to Experience/Education) that lists blog titles with external links to LinkedIn articles. This is the fastest implementation and maintains content on LinkedIn's platform.

Alternatively, for full blog integration:
1. Add blog schema to Sanity
2. Manually add these 4 articles to Sanity CMS
3. Create blog listing and detail pages in Next.js
4. Style to match the portfolio's 3D aesthetic
