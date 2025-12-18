# 🍔 Zoma Burger - React + Spring Boot Setup

## Architecture Overview

**Frontend (React)**: Port 3000
- Modern React application with routing
- Bootstrap 5 for responsive design
- Cart management with Context API
- Ethiopian payment integration

**Backend (Spring Boot)**: Port 8081
- RESTful API endpoints
- PostgreSQL database integration
- Order and payment processing
- Admin management system

## Quick Start

### 1. Start Full Application
```bash
./start_full_app.sh
```

### 2. Manual Start (Development)

**Backend:**
```bash
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm start
```

## Application Flow

### Customer Journey
1. **Browse Menu** → `/menu`
2. **Add to Cart** → Items stored in React context
3. **View Cart** → `/cart` - Manage quantities
4. **Checkout** → `/payment` - Ethiopian bank selection
5. **Order Placed** → Admin verification required

### Admin Management
1. **Access Admin** → `/admin`
2. **View Orders** → Real-time order management
3. **Verify Payments** → Ethiopian bank verification
4. **Update Status** → Order tracking

## Key Features Implemented

### React Frontend
- ✅ Cart Context for state management
- ✅ Add to cart functionality
- ✅ Cart item counter in navbar
- ✅ Quantity management
- ✅ Ethiopian payment methods
- ✅ Order processing flow
- ✅ Admin dashboard

### Spring Boot Backend
- ✅ Order API endpoints
- ✅ Payment processing
- ✅ Admin verification system
- ✅ PostgreSQL integration
- ✅ CORS configuration

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}/status` - Update order status

### Payments
- `GET /api/payments` - Get all payments
- `PUT /api/payments/{id}/verify` - Verify payment

### Menu
- `GET /api/menu` - Get menu items
- `GET /api/menu/category/{category}` - Get by category

## Database Schema

The application uses your existing PostgreSQL database with tables:
- `orders` - Customer orders
- `payments` - Payment transactions
- `menu_items` - Restaurant menu
- `users` - Customer accounts
- `ethiopian_banks` - Payment methods

## URLs

- **Customer App**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API Base**: http://localhost:8081/api

## Development Notes

- React development server runs on port 3000
- Spring Boot API runs on port 8081
- PostgreSQL database on port 5432
- CORS enabled for development
- Hot reload enabled for both frontend and backend