# Image Optimization Guide

Your headshot images are currently **5.7MB each** - way too large for web use! This will slow down your site significantly.

## Target Sizes
- **headshot.png**: Currently 5.7MB → Target: < 200KB
- **headshot-collared.png**: Currently 5.7MB → Target: < 200KB

## Quick Online Solutions (Easiest)

### Option 1: TinyPNG (Recommended)
1. Go to https://tinypng.com/
2. Drag and drop both PNG files
3. Wait for compression (usually reduces by 60-80%)
4. Download the optimized versions
5. Replace the original files

**Pros:** Super easy, excellent quality, works in browser
**Expected result:** ~500KB-800KB per image

### Option 2: Squoosh (More Control)
1. Go to https://squoosh.app/
2. Upload one image at a time
3. Choose format:
   - **WebP** (best compression, modern browsers) - recommended!
   - **JPEG** (good compression, universal support)
   - **PNG** (lossless, but larger files)
4. Adjust quality slider (75-85% is usually perfect)
5. Compare before/after in split view
6. Download optimized version

**Pros:** More control, can convert to WebP, side-by-side comparison
**Expected result:** 100-300KB per image

### Option 3: ImageOptim (Mac Only)
1. Download from https://imageoptim.com/
2. Drag PNG files into the app
3. Automatic optimization
4. Files are replaced with optimized versions

**Pros:** Desktop app, batch processing, preserves metadata
**Expected result:** ~500KB-1MB per image

## Command Line Solutions (For Developers)

### Using Sharp (Node.js)
Run the optimization script:
```bash
cd frontend/public/images
node optimize-images.js
```

This will create WebP versions and optimize PNGs automatically.

### Manual with ImageMagick
```bash
# Install ImageMagick first
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: apt-get install imagemagick

# Optimize and resize
convert headshot.png -resize 800x800 -quality 85 headshot-optimized.png
convert headshot-collared.png -resize 800x800 -quality 85 headshot-collared-optimized.png

# Convert to WebP (best compression)
convert headshot.png -resize 800x800 -quality 85 headshot.webp
convert headshot-collared.png -resize 800x800 -quality 85 headshot-collared.webp
```

## Recommended Workflow

**Best approach for your portfolio:**

1. **Use Squoosh** (https://squoosh.app/) to create optimized versions:
   - Upload headshot.png
   - Select **WebP** format
   - Set quality to 80-85%
   - Resize to 800x800px (if larger)
   - Download as `headshot.webp`
   - Repeat for headshot-collared.png

2. **Keep PNG fallbacks** for older browsers:
   - Use TinyPNG to compress original PNGs
   - Keep them as fallbacks

3. **Update code** to use WebP with PNG fallback:
   ```typescript
   // The code will automatically handle this with Next.js Image component
   ```

## Why This Matters

**Current situation:**
- 2 images × 5.7MB = **11.4MB** just for your photos!
- On a 4G connection: ~8-10 seconds to load
- On a 3G connection: ~30-40 seconds to load

**After optimization:**
- 2 images × 200KB = **400KB** total
- On a 4G connection: < 1 second
- On a 3G connection: ~2-3 seconds

This is a **96% reduction** in file size! 🚀

## Quick Checklist

- [ ] Optimize headshot.png (target: < 200KB)
- [ ] Optimize headshot-collared.png (target: < 200KB)
- [ ] Optional: Create WebP versions for better compression
- [ ] Replace original files or update image references in code
- [ ] Test site loading speed

## Verification

After optimization, check file sizes:
```bash
ls -lh frontend/public/images/*.png
```

Or in PowerShell:
```powershell
Get-ChildItem frontend/public/images/*.png | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}
```

## Next Steps

1. Choose your preferred method above
2. Optimize both images
3. Replace the files in `frontend/public/images/`
4. Test your site: `cd frontend && yarn dev`
5. Verify load times in browser DevTools (Network tab)

Need help? Check the optimization script or run it automatically!
