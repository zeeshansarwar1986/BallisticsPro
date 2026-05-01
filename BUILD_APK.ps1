# BallisticsPro — APK Build Script
# Run this PowerShell script after installing Node.js from https://nodejs.org

Write-Host "======================================" -ForegroundColor Cyan
Write-Host " BallisticsPro — Android APK Builder" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Check if Node.js is available
$nodeVersion = node -v 2>$null
if (-not $nodeVersion) {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green

# Create a package.json for Capacitor
$packageJson = @'
{
  "name": "ballistics-pro",
  "version": "1.0.0",
  "description": "Professional Ballistics Calculator",
  "scripts": {
    "build": "echo Build complete"
  },
  "dependencies": {
    "@capacitor/core": "latest",
    "@capacitor/android": "latest"
  },
  "devDependencies": {
    "@capacitor/cli": "latest"
  }
}
'@

$packageJson | Out-File -FilePath "package.json" -Encoding utf8 -Force
Write-Host "✅ package.json created" -ForegroundColor Green

# Install Capacitor
Write-Host "📦 Installing Capacitor (this may take a few minutes)..." -ForegroundColor Yellow
npm install

# Initialize Capacitor
Write-Host "⚙️  Initializing Capacitor..." -ForegroundColor Yellow
npx cap init "BallisticsPro" "com.ballistics.pro" --web-dir "."

# Add Android platform
Write-Host "📱 Adding Android platform..." -ForegroundColor Yellow
npx cap add android

# Copy files
Write-Host "📂 Syncing files..." -ForegroundColor Yellow
npx cap sync android

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host " ✅ SUCCESS! Next steps:" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host "1. Open Android Studio" -ForegroundColor White
Write-Host "2. Run: npx cap open android" -ForegroundColor White
Write-Host "3. In Android Studio: Build > Generate Signed Bundle/APK" -ForegroundColor White
Write-Host "4. APK will be in: android/app/build/outputs/apk/" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"
