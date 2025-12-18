#!/bin/bash

echo "🍔 Simple GitHub Deploy - Zoma Burger"
echo "===================================="

# Set git config
git config --global user.email "messiyenatu@gmail.com"
git config --global user.name "Messi"

# Initialize git if needed
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

# Build frontend only (skip backend for now)
echo "Building React frontend..."
cd frontend
npm install --silent
GENERATE_SOURCEMAP=false npm run build
cd ..

# Add all files
git add .

# Commit
git commit -m "Zoma Burger Website - $(date '+%Y-%m-%d %H:%M')"

# Ask for GitHub repo URL
echo "Enter your GitHub repository URL:"
read REPO_URL

# Add remote if not exists
if ! git remote get-url origin > /dev/null 2>&1; then
    git remote add origin "$REPO_URL"
fi

# Push to GitHub
git push -u origin main

echo "✅ Deployed to GitHub!"
echo "📧 Contact: messiyenatu@gmail.com"
echo "📱 Telegram: @mmmessi"
echo ""
echo "Next: Deploy frontend to Netlify/Vercel"