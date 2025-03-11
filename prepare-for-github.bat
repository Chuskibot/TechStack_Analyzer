@echo off
echo Preparing repository for GitHub...

REM Check if .env file exists
if not exist .env (
  echo X Error: .env file not found. Please create it first.
  exit /b 1
)

REM Run the build script to create manifest.clean.json
echo Building extension with environment variables...
call npm run build

REM Backup the current manifest.json
echo Backing up manifest.json to manifest.backup.json...
copy manifest.json manifest.backup.json

REM Replace manifest.json with the clean version
echo Replacing manifest.json with clean version...
copy manifest.clean.json manifest.json

echo.
echo Repository is now ready for GitHub!
echo Remember to run 'copy manifest.backup.json manifest.json' to restore your development version after pushing to GitHub.

REM Instructions for Git
echo.
echo Git commands to push to GitHub:
echo git add .
echo git commit -m "Your commit message"
echo git push -u origin main
echo.
echo Your API keys are now protected and won't be pushed to GitHub. 