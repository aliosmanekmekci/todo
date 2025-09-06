#!/bin/bash

# Deploy script for GitHub Pages
echo "🚀 Building and deploying to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Copy built files to root for GitHub Pages
echo "📋 Copying files to root directory..."
cp dist/index.html .
cp dist/bundle.js .
cp dist/styles.css .

# Add and commit changes
echo "💾 Committing changes..."
git add index.html bundle.js styles.css
git commit -m "deploy: Update GitHub Pages files"

# Push to main branch
echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete! Your site should be available at:"
echo "   https://aliosmanekmekci.github.io/todo/"
