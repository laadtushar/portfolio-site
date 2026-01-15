# PowerShell Image Optimization Script
# This script helps you optimize images using online tools

Write-Host "🖼️  Image Optimization Helper" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check current file sizes
Write-Host "📊 Current Image Sizes:" -ForegroundColor Yellow
Get-ChildItem *.png | Where-Object { $_.Name -like "headshot*" } | ForEach-Object {
    $sizeInMB = [math]::Round($_.Length / 1MB, 2)
    $color = if ($sizeInMB -gt 1) { "Red" } else { "Green" }
    Write-Host "   $($_.Name): $sizeInMB MB" -ForegroundColor $color
}

Write-Host "`n⚠️  Your images are too large for web use!" -ForegroundColor Red
Write-Host "   Target size: < 0.2 MB (200 KB) per image`n" -ForegroundColor Yellow

Write-Host "🎯 Recommended Optimization Methods:`n" -ForegroundColor Green

Write-Host "1. TINYPNG (Easiest - Recommended)" -ForegroundColor Cyan
Write-Host "   • Go to: https://tinypng.com/"
Write-Host "   • Drag and drop your PNG files"
Write-Host "   • Download optimized versions"
Write-Host "   • Replace original files`n"

Write-Host "2. SQUOOSH (Best Control)" -ForegroundColor Cyan
Write-Host "   • Go to: https://squoosh.app/"
Write-Host "   • Upload one image at a time"
Write-Host "   • Choose WebP format with 80-85% quality"
Write-Host "   • Download and replace`n"

Write-Host "3. NODE.JS SCRIPT (Automated)" -ForegroundColor Cyan
Write-Host "   • Install Sharp: npm install sharp"
Write-Host "   • Run: node optimize-images.js"
Write-Host "   • Follow the prompts`n"

# Offer to open TinyPNG
$response = Read-Host "Would you like to open TinyPNG in your browser? (y/n)"
if ($response -eq 'y' -or $response -eq 'Y') {
    Start-Process "https://tinypng.com"
    Write-Host "`n✅ TinyPNG opened in your browser!" -ForegroundColor Green
    Write-Host "   1. Drag and drop headshot.png and headshot-collared.png"
    Write-Host "   2. Wait for compression"
    Write-Host "   3. Download the optimized files"
    Write-Host "   4. Replace the original files in this folder`n"
}

Write-Host "📝 After optimization, run this script again to verify sizes!" -ForegroundColor Yellow
Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
