# 🍔 Zoma Burger House - Full Stack Web Application

A complete restaurant ordering system with Ethiopian bank payment integration, built with Java servlets, JSP, and PostgreSQL.

## 🚀 Features

### Customer Features
- **User Registration & Authentication** - Secure signup/login with password encryption
- **Menu Browsing** - Categorized menu with images and descriptions
- **Shopping Cart** - Add/remove items with quantity management
- **Ethiopian Payment Integration** - Support for all major Ethiopian banks and digital wallets
- **Order Tracking** - Real-time order status updates
- **5% Discount** - Automatic discount for registered users

### Admin Features
- **Admin Dashboard** - Complete management interface
- **User Management** - View, delete, and promote users
- **Menu Management** - Add, edit, and delete menu items
- **Payment Verification** - Verify bank transfers and mobile payments
- **Order Management** - Track and update order status
- **Statistics** - Revenue, orders, and user analytics

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

- **Backend**: Java Servlets, JSP
- **Database**: PostgreSQL
- **Frontend**: Bootstrap 5, HTML5, CSS3, JavaScript
- **Security**: Spring Security (Password encryption)
- **Build Tool**: Maven
- **Server**: Apache Tomcat

## 📋 Prerequisites

- Java 8 or higher
- Apache Tomcat 9+
- PostgreSQL 12+
- Maven 3.6+

## 🔧 Installation & Setup

### 1. Install PostgreSQL on Manjaro

```bash
# Install PostgreSQL
sudo pacman -S postgresql

# Initialize database
sudo -u postgres initdb -D /var/lib/postgres/data

# Start and enable service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Setup Database

```bash
# Navigate to project directory
cd "/home/messi/Downloads/Telegram Desktop/BurgerWebsite/database"

# Run the automated setup script
./setup_postgresql.sh
```

Or manually:

```bash
# Create database and user
sudo -u postgres psql << EOF
CREATE DATABASE zoma_burger_db;
CREATE USER zomaburger WITH PASSWORD 'zomaburger123';
GRANT ALL PRIVILEGES ON DATABASE zoma_burger_db TO zomaburger;
\q
EOF

# Import schema
sudo -u postgres psql -d zoma_burger_db -f postgresql_setup.sql
```

### 3. Build and Deploy

```bash
# Build the project
mvn clean package

# Deploy to Tomcat
cp target/zoma-burger.war $TOMCAT_HOME/webapps/
```

### 4. Start Application

```bash
# Start Tomcat
$TOMCAT_HOME/bin/startup.sh

# Access application
http://localhost:8080/zoma-burger
```

## 🔐 Default Login Credentials

### Admin Access
- **Email**: admin@zomaburger.com
- **Password**: admin123

### Database Connection
- **Host**: localhost
- **Port**: 5432
- **Database**: zoma_burger_db
- **Username**: zomaburger
- **Password**: zomaburger123

## 💳 Payment Integration

### How Payment Works

1. **Customer places order** - Items added to cart and checkout initiated
2. **Payment method selection** - Choose from Ethiopian banks or digital wallets
3. **Bank transfer** - Customer transfers money using selected method
4. **Transaction reference** - Customer enters transaction ID/reference
5. **Admin verification** - Admin verifies payment and approves order
6. **Order fulfillment** - Order processed and delivered

### Payment Verification Process

1. Customer submits payment with transaction reference
2. Payment status set to "PENDING"
3. Admin receives notification in dashboard
4. Admin verifies payment with bank/digital wallet
5. Admin updates payment status to "VERIFIED" or "REJECTED"
6. Order status updated accordingly

## 📁 Project Structure

```
BurgerWebsite/
├── src/main/
│   ├── java/com/zomaburger/
│   │   ├── controller/          # Servlets
│   │   ├── dao/                 # Data Access Objects
│   │   ├── model/               # Entity classes
│   │   ├── service/             # Business logic
│   │   └── util/                # Utilities
│   └── webapp/
│       ├── css/                 # Stylesheets
│       ├── images/              # Product images
│       ├── js/                  # JavaScript files
│       └── *.jsp                # JSP pages
├── database/
│   ├── postgresql_setup.sql    # Database schema
│   └── setup_postgresql.sh     # Setup script
└── pom.xml                      # Maven configuration
```

## 🎨 Key Features Implementation

### Ethiopian Bank Integration
- Support for 12 major Ethiopian financial institutions
- Real-time payment verification system
- Mobile money and traditional bank transfers
- Secure transaction reference tracking

### Security Features
- Password encryption using Spring Security
- Session-based authentication
- SQL injection prevention
- XSS protection

### Responsive Design
- Mobile-first Bootstrap design
- Touch-friendly interface
- Progressive Web App features
- Cross-browser compatibility

## 🚀 GitHub Deployment

### Quick Deploy to GitHub
```bash
# Run automated deployment script
./deploy.sh
```

### Manual Deployment Steps

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Zoma Burger website"
   git branch -M main
   git remote add origin https://github.com/yourusername/zoma-burger.git
   git push -u origin main
   ```

2. **Frontend Deployment (Netlify/Vercel)**
   - Connect GitHub repository
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`

3. **Backend Deployment (Railway/Render)**
   - Connect GitHub repository
   - Build command: `mvn clean package`
   - Start command: `java -jar target/zoma-burger-springboot-1.0.0.jar`

4. **Database Setup (ElephantSQL/Supabase)**
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
- `cart_items` - Shopping cart
- `ethiopian_banks` - Bank configuration
- `contact_messages` - Customer inquiries

## 🔧 Configuration

### Database Configuration
Update `src/main/java/com/zomaburger/util/DatabaseConnection.java`:

```java
private static final String URL = "jdbc:postgresql://localhost:5432/zoma_burger_db";
private static final String USERNAME = "zomaburger";
private static final String PASSWORD = "zomaburger123";
```

### Bank Account Configuration
Update bank account details in the `ethiopian_banks` table for production use.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify PostgreSQL is running: `sudo systemctl status postgresql`
   - Check database credentials
   - Ensure database exists

2. **Payment Not Working**
   - Verify bank configuration in database
   - Check transaction reference format
   - Ensure payment servlet is properly mapped

3. **Images Not Loading**
   - Check image file paths
   - Verify image files exist in `webapp/images/`
   - Check file permissions

## 📈 Performance Optimization

- Database indexing on frequently queried columns
- Connection pooling for database connections
- Image optimization and lazy loading
- Caching for static content
- Minified CSS and JavaScript

## 🔒 Security Considerations

- Regular security updates
- Input validation and sanitization
- Secure session management
- HTTPS enforcement in production
- Regular database backups

## 📞 Support

For technical support or questions:
- **Primary Email**: messiyenatu@gmail.com
- **Secondary Email**: mmesenbetshegaw@gmail.com
- **Telegram**: @mmmessi
- **Phone**: +251 911 123 456

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Built with ❤️ for Ethiopian food lovers**