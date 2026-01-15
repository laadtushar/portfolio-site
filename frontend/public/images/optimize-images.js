/**
 * Image Optimization Script
 * 
 * This script optimizes images using Sharp (Node.js image processing library)
 * 
 * Installation:
 *   npm install sharp
 *   or
 *   yarn add sharp
 * 
 * Usage:
 *   node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  {
    input: 'headshot.png',
    outputs: [
      { file: 'headshot-optimized.png', format: 'png', quality: 85 },
      { file: 'headshot.webp', format: 'webp', quality: 85 }
    ]
  },
  {
    input: 'headshot-collared.png',
    outputs: [
      { file: 'headshot-collared-optimized.png', format: 'png', quality: 85 },
      { file: 'headshot-collared.webp', format: 'webp', quality: 85 }
    ]
  }
];

async function optimizeImage(inputPath, outputPath, format, quality, maxWidth = 800) {
  try {
    const startSize = fs.statSync(inputPath).size;
    
    await sharp(inputPath)
      .resize(maxWidth, maxWidth, {
        fit: 'inside',
        withoutEnlargement: true
      })
      [format]({ quality })
      .toFile(outputPath);
    
    const endSize = fs.statSync(outputPath).size;
    const reduction = ((1 - endSize / startSize) * 100).toFixed(2);
    
    console.log(`✅ ${path.basename(outputPath)}`);
    console.log(`   ${(startSize / 1024 / 1024).toFixed(2)}MB → ${(endSize / 1024).toFixed(2)}KB (${reduction}% reduction)`);
    
    return { success: true, inputPath, outputPath, startSize, endSize };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return { success: false, inputPath, error };
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ Sharp is not installed!');
    console.error('   Please run: npm install sharp');
    console.error('   or: yarn add sharp');
    process.exit(1);
  }
  
  let totalSavings = 0;
  let successCount = 0;
  
  for (const image of imagesToOptimize) {
    const inputPath = path.join(__dirname, image.input);
    
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${image.input} not found, skipping...`);
      continue;
    }
    
    console.log(`\n📸 Processing ${image.input}...`);
    
    for (const output of image.outputs) {
      const outputPath = path.join(__dirname, output.file);
      const result = await optimizeImage(
        inputPath,
        outputPath,
        output.format,
        output.quality
      );
      
      if (result.success) {
        totalSavings += result.startSize - result.endSize;
        successCount++;
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🎉 Optimization Complete!');
  console.log(`   ${successCount} images optimized`);
  console.log(`   Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)}MB`);
  console.log('='.repeat(50));
  console.log('\n💡 Next steps:');
  console.log('   1. Review the optimized images');
  console.log('   2. Replace original files if satisfied:');
  console.log('      mv headshot-optimized.png headshot.png');
  console.log('      mv headshot-collared-optimized.png headshot-collared.png');
  console.log('   3. Optional: Use WebP versions for better compression');
  console.log('   4. Test your site: cd frontend && yarn dev\n');
}

main().catch(console.error);
