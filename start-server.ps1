
Write-Host "Starting TypeScript compiler in watch mode..."
Start-Process cmd -ArgumentList "/c", "npm", "run", "start" -NoNewWindow

Write-Host "Starting development server..."
Write-Host "You can stop the server by pressing Ctrl+C in this window."
Start-Process cmd -ArgumentList "/c", "npx", "http-server" -NoNewWindow
