# Image Assets Guide for Tushar Laad Portfolio

This directory contains image assets for the portfolio site.

## Current Images

### Your Personal Photos (Replace These!)

1. **headshot.png** - Main headshot placeholder
   - Currently: Generic placeholder (5.7MB - should be optimized!)
   - Replace with your professional headshot
   - Recommended size: 400x400px minimum
   - Optimize to < 200KB
   - Format: PNG or JPG

2. **headshot-collared.png** - Alternate headshot placeholder
   - Currently: Generic placeholder (5.7MB - should be optimized!)
   - Replace with another professional photo
   - Used in various sections
   - Optimize to < 200KB

3. **social.png** - Social media sharing image
   - Currently: Generic placeholder (696KB)
   - Replace with your branded social card
   - Required size: 2333x1313px (or similar 16:9 aspect ratio)
   - Should include your name and tagline
   - Format: PNG

4. **favicon.png** - Browser tab icon
   - Currently: Generic icon
   - Replace with your personal logo or initials
   - Size: 512x512px recommended
   - Format: PNG

### Testimonial Photos (Real Photos!)

✅ **suleiman.jpg** - Suleiman Muhammad Sabo (Newcastle University)
✅ **pranjal.jpg** - Pranjal Upadhyaya (Astuto)
✅ **vinay.jpg** - Vinay Mehendi, PhD (OceanFrogs Software)
✅ **srujan.jpg** - Srujan P (OceanFrogs)

These are actual photos of your recommenders. No replacement needed!

### System Icons (Keep These!)

✅ **alert-icon.svg** - UI alert icon
✅ **awards-icon.svg** - Awards/achievement icon  
✅ **computer-icon.svg** - Computer/tech icon
✅ **messages-icon.svg** - Messages/testimonials icon
✅ **star-icon.svg** - Star/rating icon
✅ **linkedin.png** - LinkedIn logo/icon

## Priority Actions

**🚨 URGENT - Image Optimization Required!**

Your headshot images are **5.7MB EACH** - this will make your site very slow!

### Quick Fix Options:

**Option 1: Online Tool (Easiest - 2 minutes)**
1. Go to https://tinypng.com/
2. Drag headshot.png and headshot-collared.png
3. Download optimized versions
4. Replace original files
5. Done! ✨

**Option 2: Automation Script**
```bash
cd frontend/public/images
# If needed: npm install sharp
node optimize-images.js
```

**Option 3: PowerShell Helper (Windows)**
```powershell
cd frontend/public/images
.\optimize-images.ps1
```

📖 **Full guide:** See `OPTIMIZE_IMAGES.md` in this directory

---

**Other Actions:**
- ✅ Testimonial photos are integrated
- ⏳ Update social.png with your branded image (optional)
- ⏳ Update favicon.png with your logo (optional)

## How to Add Your Images

1. Place your images in this directory (`frontend/public/images/`)
2. Name them exactly as listed above (or update the import paths in the code)
3. Optimize images for web:
   - Use appropriate compression
   - Recommended tools: TinyPNG, ImageOptim, or Squoosh
   - Keep file sizes under 500KB each

## Social Image Template

For the social.png image, consider including:
- Your name: "Tushar Laad"
- Tagline: "Data Engineer & Software Architect"
- Background that matches the site's aesthetic (colorful, tech-themed)
- Your logo or personal brand elements

You can create this using:
- Canva (free templates available)
- Figma
- Adobe Photoshop
- Or any graphic design tool

## Files Removed (Bryant's Original Photos)

The following files from the original portfolio have been removed:
- ❌ hailey.jpg, hailey2.jpg (Bryant's dog)
- ❌ jp.jpg, stef.jpg (Bryant's testimonial photos)
- ❌ self-portrait.jpg, self-portrait_square.jpg (Bryant's portraits)
- ❌ placeholder-testimonial-*.svg (Replaced with real photos)

## Files Added (Tushar's Photos)

✅ **suleiman.jpg** - Real testimonial photo
✅ **pranjal.jpg** - Real testimonial photo
✅ **vinay.jpg** - Real testimonial photo
✅ **srujan.jpg** - Real testimonial photo

## Notes

- The 3D elements and UI don't require image assets - they're rendered using Three.js and CSS
- SVG placeholders are lightweight and look professional
- Always optimize images before uploading to production
- Test social card with: https://www.opengraph.xyz/
