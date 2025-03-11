#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo "❌ Error: .env file not found. Please create it first."
  exit 1
fi

# Run the build script to create manifest.clean.json
echo "🔧 Building extension with environment variables..."
npm run build

# Backup the current manifest.json
echo "📦 Backing up manifest.json to manifest.backup.json..."
cp manifest.json manifest.backup.json

# Replace manifest.json with the clean version
echo "🧹 Replacing manifest.json with clean version..."
cp manifest.clean.json manifest.json

echo "✅ Repository is now ready for GitHub!"
echo "⚠️ Remember to run 'cp manifest.backup.json manifest.json' to restore your development version after pushing to GitHub."

# Instructions for Git
echo ""
echo "📝 Git commands to push to GitHub:"
echo "git add ."
echo "git commit -m \"Your commit message\""
echo "git push -u origin main"
echo ""
echo "🔒 Your API keys are now protected and won't be pushed to GitHub." 