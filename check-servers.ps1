# SCM Career Bridge - Server Status Checker

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "  SCM Career Bridge Status" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check Backend
Write-Host "[Backend - Port 5000]" -ForegroundColor Yellow
try {
    $backend = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -TimeoutSec 3
    $backendData = $backend.Content | ConvertFrom-Json
    Write-Host "  Status: " -NoNewline
    Write-Host "RUNNING" -ForegroundColor Green
    Write-Host "  Database: $($backendData.database)" -ForegroundColor Green
    Write-Host "  URL: http://localhost:5000" -ForegroundColor Blue
} catch {
    Write-Host "  Status: " -NoNewline
    Write-Host "NOT RUNNING" -ForegroundColor Red
    Write-Host "  Please start: cd server && npm run dev" -ForegroundColor Yellow
}

Write-Host ""

# Check Frontend
Write-Host "[Frontend - Port 3000]" -ForegroundColor Yellow
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 3
    Write-Host "  Status: " -NoNewline
    Write-Host "RUNNING" -ForegroundColor Green
    Write-Host "  URL: http://localhost:3000" -ForegroundColor Blue
} catch {
    Write-Host "  Status: " -NoNewline
    Write-Host "NOT RUNNING" -ForegroundColor Red
    Write-Host "  Please start: cd client && npm run dev" -ForegroundColor Yellow
}

Write-Host "`n================================`n" -ForegroundColor Cyan

