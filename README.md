# 🍔 Messi Burger - Full Stack Restaurant Website

A complete Ethiopian burger restaurant ordering system with payment integration, built with React and Spring Boot.

## 🚀 Features

### Customer Features
- **User Registration & Authentication** - Secure signup/login with 5% discount for registered users
- **Menu Browsing** - 20+ delicious burger items with high-quality images
- **Shopping Cart** - Add/remove items with quantity management
- **Ethiopian Payment Integration** - Support for 12 major Ethiopian banks and digital wallets
- **Order Tracking** - Real-time order status updates
- **Contact System** - Direct messaging with admin response functionality

### Admin Features
- **Admin Dashboard** - Complete management interface
- **Order Management** - View detailed order items and customer information
- **Payment Verification** - Verify bank transfers and mobile payments
- **Customer Management** - View and manage customer accounts
- **Message System** - Respond to customer inquiries
- **Social Media Integration** - Manage social media presence

### Payment Methods Supported
#### Digital Wallets
- **Telebirr** - Ethiopia's leading mobile wallet
- **CBE Birr** - Commercial Bank of Ethiopia mobile money
- **M-Pesa Ethiopia** - Vodacom's mobile money service
- **HelloCash** - Digital payment platform

#### Traditional Banks
- **Commercial Bank of Ethiopia (CBE)**
- **Awash Bank**
- **Bank of Abyssinia**
- **Dashen Bank**
- **Wegagen Bank**
- **United Bank**
- **Nib International Bank**
- **Cooperative Bank of Oromia**

## 🛠️ Technology Stack

- **Frontend**: React 18, Bootstrap 5, HTML5, CSS3, JavaScript
- **Backend**: Spring Boot, Java 17
- **Database**: PostgreSQL
- **Security**: Spring Security with password encryption
- **Build Tool**: Maven
- **Images**: Unsplash CDN for high-quality food images

## 📋 Prerequisites

- Node.js 16+ and npm
- Java 17+
- PostgreSQL 12+
- Maven 3.6+

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/messiyenatu-jpg/Messi_Burger.git
cd Messi_Burger
```

### 2. Setup Database
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb zoma_burger_db
sudo -u postgres createuser --interactive zomaburger
```

### 3. Backend Setup
```bash
# Build Spring Boot application
mvn clean package

# Run backend (port 8081)
java -jar target/zoma-burger-springboot-1.0.0.jar
```

### 4. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start React development server (port 3000)
npm start
```

### 5. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8081
- **Admin Panel**: http://localhost:3000/admin

## 🔐 Default Login Credentials

### Admin Access
- **Username**: messi
- **Password**: 7009

### Test Customer
- **Email**: test@example.com
- **Password**: password123

## 💳 Payment Integration

### How Payment Works
1. **Customer places order** - Items added to cart and checkout initiated
2. **Payment method selection** - Choose from 12 Ethiopian banks or digital wallets
3. **Bank transfer** - Customer transfers money using selected method
4. **Transaction reference** - Customer enters transaction ID/reference
5. **Admin verification** - Admin verifies payment and approves order
6. **Order fulfillment** - Order processed and delivered

## 📁 Project Structure

```
Messi_Burger/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── context/           # React contexts
│   │   ├── pages/             # Page components
│   │   └── services/          # API services
│   └── public/                # Static assets
├── src/main/java/             # Spring Boot backend
│   └── com/zomaburger/
│       ├── controller/        # REST controllers
│       ├── entity/           # JPA entities
│       ├── repository/       # Data repositories
│       └── config/           # Configuration
├── database/                  # Database scripts
└── docs/                     # Documentation
```

## 🎨 Key Features Implementation

### Ethiopian Bank Integration
- Support for 12 major Ethiopian financial institutions
- Real-time payment verification system
- Mobile money and traditional bank transfers
- Secure transaction reference tracking

### Admin Dashboard
- Comprehensive order management with detailed item display
- Customer information and order history
- Payment verification and status updates
- Message system for customer support

### Responsive Design
- Mobile-first Bootstrap design
- Touch-friendly interface
- Cross-browser compatibility
- High-quality food images from Unsplash

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy build folder
```

### Backend (Railway/Render)
```bash
mvn clean package
# Deploy JAR file
```

### Database (ElephantSQL/Supabase)
- Create PostgreSQL instance
- Import database schema
- Update connection strings

## 📊 Database Schema

### Core Tables
- `users` - Customer and admin accounts
- `menu_items` - Restaurant menu
- `orders` - Customer orders
- `order_items` - Order line items
- `payments` - Payment transactions
- `ethiopian_banks` - Bank configuration
- `contact_messages` - Customer inquiries

## 🔧 Configuration

### Database Configuration
Update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/zoma_burger_db
    username: zomaburger
    password: zomaburger123
```

## 📞 Contact & Support

- **Developer**: Messi Yenatu
- **Email**: messiyenatu@gmail.com
- **Secondary Email**: mmesenbetshegaw@gmail.com
- **Telegram**: @mmmessi
- **Location**: Bole Atlas, Near Edna Mall, Addis Ababa, Ethiopia

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ for Ethiopian food lovers**

*Enjoy delicious burgers with authentic Ethiopian hospitality!*# Messi_Burger
