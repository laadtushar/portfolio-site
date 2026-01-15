# Build Test Script for Windows PowerShell
# Run this to test if your site builds correctly

Write-Host "🏗️  Testing Production Build..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if yarn is available
$yarnAvailable = Get-Command yarn -ErrorAction SilentlyContinue
$npmAvailable = Get-Command npm -ErrorAction SilentlyContinue

if (-not $yarnAvailable -and -not $npmAvailable) {
    Write-Host "❌ Neither yarn nor npm found!" -ForegroundColor Red
    Write-Host "   Please install Node.js and yarn/npm first" -ForegroundColor Yellow
    exit 1
}

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Warning: .env.local not found!" -ForegroundColor Yellow
    Write-Host "   Make sure you've created it with your Sanity credentials`n" -ForegroundColor Yellow
}

# Run build
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
if ($yarnAvailable) {
    yarn install
} else {
    npm install
}

Write-Host "`n🔨 Building production bundle..." -ForegroundColor Yellow
if ($yarnAvailable) {
    yarn build
} else {
    npm run build
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Build successful!" -ForegroundColor Green
    Write-Host "   Your site is ready to deploy!`n" -ForegroundColor Green
} else {
    Write-Host "`n❌ Build failed!" -ForegroundColor Red
    Write-Host "   Check the errors above and fix them before deploying`n" -ForegroundColor Yellow
    exit 1
}
