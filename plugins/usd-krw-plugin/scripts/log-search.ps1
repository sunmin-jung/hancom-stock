$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$logLine = "$timestamp 환율 관련 웹검색이 실행되었습니다"
Add-Content -Path "$env:TEMP\usd-krw-search-log.txt" -Value $logLine -Encoding UTF8
Write-Host "🔍 환율 검색 로그 기록됨"
