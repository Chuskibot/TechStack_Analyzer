const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read manifest template
const manifestPath = path.join(__dirname, 'manifest.json');
let manifestContent = fs.readFileSync(manifestPath, 'utf8');

// Replace placeholders with actual values from .env
manifestContent = manifestContent.replace(
  '"rapidApiKey": "__RAPID_API_KEY__"',
  `"rapidApiKey": "${process.env.RAPID_API_KEY}"`
);

// Write updated manifest
fs.writeFileSync(manifestPath, manifestContent);

console.log('✅ Build completed: API keys injected into manifest.json');

// Create a clean version for GitHub (without actual API keys)
const cleanManifestContent = manifestContent.replace(
  `"rapidApiKey": "${process.env.RAPID_API_KEY}"`,
  '"rapidApiKey": "__RAPID_API_KEY__"'
);

// Save clean version for GitHub
const cleanManifestPath = path.join(__dirname, 'manifest.clean.json');
fs.writeFileSync(cleanManifestPath, cleanManifestContent);

console.log('✅ Clean manifest created for GitHub: manifest.clean.json');
console.log('⚠️ Remember to rename manifest.clean.json to manifest.json before pushing to GitHub'); 