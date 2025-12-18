# 🚀 GitHub Deployment Guide - Zoma Burger Website

## 📧 Contact Information
- **Primary Email**: messiyenatu@gmail.com
- **Secondary Email**: mmesenbetshegaw@gmail.com
- **Telegram**: @mmmessi

## 🔧 Pre-Deployment Setup

### 1. Create GitHub Repository
```bash
# Initialize git repository
cd "/home/messi/Downloads/Telegram Desktop/BurgerWebsite"
git init
git add .
git commit -m "Initial commit: Zoma Burger full-stack application"

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/zoma-burger-website.git
git branch -M main
git push -u origin main
```

### 2. Frontend Deployment (Netlify/Vercel)

#### Option A: Netlify
1. **Build React App**:
```bash
cd frontend
npm run build
```

2. **Deploy to Netlify**:
- Go to [netlify.com](https://netlify.com)
- Connect your GitHub repository
- Set build command: `cd frontend && npm run build`
- Set publish directory: `frontend/build`

#### Option B: Vercel
1. **Deploy to Vercel**:
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Framework: React
- Root directory: `frontend`

### 3. Backend Deployment (Railway/Render)

#### Option A: Railway
1. **Create railway.json**:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "mvn spring-boot:run",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

#### Option B: Render
1. **Create render.yaml**:
```yaml
services:
  - type: web
    name: zoma-burger-backend
    env: java
    buildCommand: mvn clean package
    startCommand: java -jar target/zoma-burger-springboot-1.0.0.jar
```

### 4. Database Deployment (ElephantSQL/Supabase)

#### PostgreSQL Setup:
1. **Create account on ElephantSQL or Supabase**
2. **Create new database instance**
3. **Update application.yml**:
```yaml
spring:
  datasource:
    url: ${DATABASE_URL:jdbc:postgresql://localhost:5432/zoma_burger_db}
    username: ${DB_USERNAME:zomaburger}
    password: ${DB_PASSWORD:zomaburger123}
```

## 📁 Project Structure for GitHub

```
zoma-burger-website/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/                  # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── database/                 # Database scripts
│   ├── postgresql_setup.sql
│   └── setup_postgresql.sh
├── docs/                     # Documentation
├── .gitignore
├── README.md
└── DEPLOYMENT_GUIDE.md
```

## 🔒 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Backend (application-prod.yml)
```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  
server:
  port: ${PORT:8080}
```

## 🌐 Custom Domain Setup

### 1. Frontend Domain
- **Netlify**: Add custom domain in site settings
- **Vercel**: Add domain in project settings

### 2. Backend Domain
- **Railway**: Add custom domain in project settings
- **Render**: Add custom domain in service settings

## 📱 Mobile App Preparation

### PWA Configuration (frontend/public/manifest.json)
```json
{
  "name": "Zoma Burger",
  "short_name": "ZomaBurger",
  "description": "Ethiopian Burger Restaurant",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#dc3545",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "logo192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🔧 Production Optimizations

### 1. Frontend Optimizations
```bash
# Build optimized version
npm run build

# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer frontend/build/static/js/*.js
```

### 2. Backend Optimizations
```yaml
# application-prod.yml
spring:
  jpa:
    show-sql: false
  
logging:
  level:
    com.zomaburger: INFO
    org.springframework: WARN
```

## 📊 Monitoring & Analytics

### 1. Google Analytics
Add to frontend/public/index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 2. Error Monitoring
- **Frontend**: Sentry for React
- **Backend**: Spring Boot Actuator

## 🚀 Deployment Commands

### Quick Deploy Script
```bash
#!/bin/bash
echo "🍔 Deploying Zoma Burger Website"

# Build frontend
cd frontend
npm install
npm run build
cd ..

# Build backend
mvn clean package

# Deploy to GitHub
git add .
git commit -m "Production deployment $(date)"
git push origin main

echo "✅ Deployment complete!"
```

## 📞 Support Contacts
- **Technical Support**: messiyenatu@gmail.com
- **Business Inquiries**: mmesenbetshegaw@gmail.com
- **Telegram**: @mmmessi

## 🔗 Live URLs (Update after deployment)
- **Frontend**: https://zoma-burger.netlify.app
- **Backend API**: https://zoma-burger-api.railway.app
- **Admin Panel**: https://zoma-burger.netlify.app/admin

---
**Built with ❤️ for Ethiopian food lovers**