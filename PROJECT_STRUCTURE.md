# 🍔 Zoma Burger - Clean Project Structure

## Frontend (React) - Port 3000
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with auth status
│   │   └── Footer.jsx          # Footer component
│   ├── context/
│   │   ├── AuthContext.js      # User authentication & 5% discount
│   │   └── CartContext.js      # Shopping cart management
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   ├── Menu.jsx           # Menu with add to cart
│   │   ├── Cart.jsx           # Cart with discount for logged users
│   │   ├── Payment.jsx        # Ethiopian payment processing
│   │   ├── Login.jsx          # User login
│   │   ├── Signup.jsx         # User registration
│   │   ├── Contact.jsx        # Contact page
│   │   └── Admin.jsx          # Admin dashboard
│   ├── services/
│   │   └── api.js             # API service layer
│   └── App.js                 # Main app with routing
└── public/images/             # Product images
```

## Backend (Spring Boot) - Port 8081
```
src/main/java/com/zomaburger/
├── controller/
│   ├── AuthController.java    # Login/Signup endpoints
│   ├── MenuController.java    # Menu API
│   ├── OrderController.java   # Order processing
│   ├── PaymentController.java # Payment verification
│   ├── CartController.java    # Cart operations
│   └── BankController.java    # Ethiopian banks
├── entity/
│   ├── User.java             # User entity
│   ├── MenuItem.java         # Menu items
│   ├── Order.java            # Orders
│   ├── OrderItem.java        # Order line items
│   ├── Payment.java          # Payments
│   └── EthiopianBank.java    # Bank details
├── repository/
│   ├── UserRepository.java
│   ├── MenuItemRepository.java
│   ├── OrderRepository.java
│   ├── PaymentRepository.java
│   └── EthiopianBankRepository.java
├── security/
│   └── SecurityConfig.java   # Security configuration
└── ZomaBurgerApplication.java # Main application
```

## Key Features Implemented

### ✅ Authentication System
- **Signup**: Creates account with 5% discount eligibility
- **Login**: Authenticates user and redirects to menu
- **Logout**: Clears session and returns to guest mode
- **5% Discount**: Automatic for logged-in users

### ✅ Shopping Flow
1. **Guest Users**: Browse → Add to Cart → Checkout → Pay Full Price
2. **Logged Users**: Browse → Add to Cart → Get 5% Discount → Checkout

### ✅ Payment Processing
- Ethiopian bank integration (Telebirr, CBE Birr, etc.)
- Transaction reference validation
- Admin verification system
- Automatic redirect to admin after order placement

### ✅ Admin Management
- Order tracking and status updates
- Payment verification (Approve/Reject)
- Real-time statistics dashboard
- Customer information management

## Removed Unused Files
- ❌ JSP templates (replaced with React)
- ❌ Old servlet controllers
- ❌ Duplicate model classes
- ❌ Unused DAO classes (using JPA repositories)
- ❌ Old documentation files
- ❌ Legacy shell scripts
- ❌ Thymeleaf dependencies

## Database Integration
- PostgreSQL with existing schema
- JPA/Hibernate for data access
- Automatic transaction management
- Ethiopian bank configuration support