#!/bin/bash

echo "🍔 Zoma Burger Website - GitHub Deployment Script"
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    git branch -M main
fi

# Build frontend
echo -e "${YELLOW}Building React frontend...${NC}"
cd frontend
if [ -f "package.json" ]; then
    npm install
    # Set environment for production build
    export GENERATE_SOURCEMAP=false
    export REACT_APP_API_URL=https://your-backend-url.com/api
    npm run build
    echo -e "${GREEN}✅ Frontend build complete${NC}"
    echo -e "${GREEN}✅ Using CDN images - no local image issues${NC}"
else
    echo -e "${RED}❌ package.json not found in frontend directory${NC}"
    exit 1
fi
cd ..

# Build backend
echo -e "${YELLOW}Building Spring Boot backend...${NC}"
if [ -f "pom.xml" ]; then
    mvn clean package -DskipTests
    echo -e "${GREEN}✅ Backend build complete${NC}"
else
    echo -e "${RED}❌ pom.xml not found${NC}"
    exit 1
fi

# Add all files to git
echo -e "${YELLOW}Adding files to Git...${NC}"
git add .

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
COMMIT_MESSAGE="Production deployment $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MESSAGE"

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${YELLOW}Please add your GitHub repository URL:${NC}"
    read -p "Enter GitHub repository URL: " REPO_URL
    git remote add origin "$REPO_URL"
fi

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push -u origin main

echo -e "${GREEN}🚀 Deployment complete!${NC}"
echo -e "${GREEN}📧 Contact: messiyenatu@gmail.com, mmesenbetshegaw@gmail.com${NC}"
echo -e "${GREEN}📱 Telegram: @mmmessi${NC}"
echo -e "${GREEN}🖼️  All images now use CDN - no loading issues!${NC}"

# Display next steps
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Deploy frontend to Netlify/Vercel"
echo "2. Deploy backend to Railway/Render"
echo "3. Setup PostgreSQL database"
echo "4. Configure environment variables"
echo "5. Add custom domain (optional)"