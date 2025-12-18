# 🚀 GitHub Deployment - Zoma Burger

## Quick Deploy (Frontend Only)

```bash
./simple_deploy.sh
```

## Manual Steps

1. **Set Git Config**:
```bash
git config --global user.email "messiyenatu@gmail.com"
git config --global user.name "Messi"
```

2. **Create GitHub Repository**:
- Go to github.com
- Create new repository: `zoma-burger-website`
- Copy the repository URL

3. **Deploy**:
```bash
git init
git add .
git commit -m "Zoma Burger Website"
git branch -M main
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

## Frontend Deployment (Netlify)

1. **Go to netlify.com**
2. **Connect GitHub repository**
3. **Build settings**:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`
4. **Deploy**

## Images Fixed ✅

All images now use CDN links:
- Home page: 7 burger/food images
- Menu page: 20 items with images
- No local image dependencies
- Fast loading from Unsplash CDN

## Contact Information

- **Email**: messiyenatu@gmail.com, mmesenbetshegaw@gmail.com
- **Telegram**: @mmmessi
- **Location**: Bole Atlas, Addis Ababa, Ethiopia

## Features

- ✅ React Frontend (Working)
- ✅ Cart System (Working)
- ✅ Payment Processing (Working)
- ✅ Admin Dashboard (Working)
- ✅ Ethiopian Banks (12 options)
- ✅ Location Tracking (Working)
- ✅ Social Media Integration (Working)
- ⚠️ Spring Boot Backend (Skip for now)

## Live Demo

After deployment, your website will be available at:
- `https://your-username.github.io/zoma-burger-website`
- Or custom Netlify URL