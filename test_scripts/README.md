# 🧪 Testing Scripts for Zoma Burger House

This directory contains comprehensive testing scripts for both frontend and backend testing of the Zoma Burger House web application.

## 📁 Files Overview

### Test Scripts
- `run_all_tests.sh` - Master test runner (runs all tests)
- `backend_tests.sh` - Backend API and functionality testing
- `load_test.sh` - Performance and load testing
- `frontend_tests.js` - Frontend JavaScript testing suite

### Documentation
- `README.md` - This file
- `TESTING_GUIDE.md` - Comprehensive testing guide (in parent directory)

## 🚀 Quick Start

### Run All Tests
```bash
cd test_scripts
./run_all_tests.sh
```

### Run Individual Test Suites

#### Backend Tests Only
```bash
./backend_tests.sh
```

#### Load Tests Only
```bash
./load_test.sh
```

#### Frontend Tests (in browser console)
```javascript
// Load the frontend_tests.js file in your browser
// Then run:
ZomaBurgerTests.TestRunner.runAllTests();
```

## 📋 Prerequisites

### System Requirements
- **Java 8+** - For running Tomcat
- **Apache Tomcat 9+** - Application server
- **PostgreSQL 12+** - Database
- **curl** - For API testing
- **Apache Bench (ab)** - For load testing

### Installation Commands (Manjaro/Arch)
```bash
# Install required tools
sudo pacman -S curl apache-tools postgresql

# Ensure services are running
sudo systemctl start postgresql
sudo systemctl start tomcat9  # or your Tomcat service name
```

### Application Setup
1. **Database must be running** with `zoma_burger_db` database
2. **Tomcat must be running** with the application deployed
3. **Application must be accessible** at `http://localhost:8080/zoma-burger`

## 🧪 Test Categories

### 1. Backend Testing (`backend_tests.sh`)

#### What it tests:
- **Database connectivity**
- **Web endpoints** (GET/POST requests)
- **User authentication** (registration, login, logout)
- **Cart functionality** (add, update, remove items)
- **Order processing** (checkout, payment)
- **Admin functions** (dashboard, user management, etc.)
- **Security** (SQL injection, XSS protection)
- **Performance** (response times, database queries)

#### Sample output:
```
🧪 Starting Backend Testing Suite for Zoma Burger House
==================================================
[TEST] Homepage accessibility
[PASS] Homepage accessibility - Status: 200
[TEST] User registration
[PASS] User registration - Status: 302
```

### 2. Load Testing (`load_test.sh`)

#### What it tests:
- **Homepage performance** (1000 requests, 10 concurrent)
- **Menu page performance** (500 requests, 5 concurrent)
- **Login endpoint** (200 POST requests)
- **Database performance** (100 concurrent queries)
- **Memory usage** during sustained load

#### Sample output:
```
🚀 Load Testing Suite for Zoma Burger House
===========================================
[LOAD TEST] Testing homepage with 1000 requests, 10 concurrent users
[RESULT] Homepage: 45.23 req/sec, 221.12 ms/req
```

### 3. Frontend Testing (`frontend_tests.js`)

#### What it tests:
- **Form validation** (email, password, phone)
- **Cart operations** (add, update, remove, total calculation)
- **AJAX functionality** (login, cart updates)
- **UI interactions** (modals, navigation)
- **Performance** (page load times, image loading)

#### Usage in browser:
```javascript
// Open browser console and run:
ZomaBurgerTests.FormValidationTests.testEmailValidation();
ZomaBurgerTests.CartTests.testAddToCart();
ZomaBurgerTests.TestRunner.runAllTests(); // Run all tests
```

## 📊 Test Reports

### Generated Reports
After running tests, you'll get:

1. **test_report.html** - Main comprehensive report
2. **load_test_report.html** - Load testing results
3. **Console output** - Real-time test results

### Sample Report Structure
```html
📊 Test Summary
- Total Tests: 25
- Passed: 23
- Failed: 2
- Success Rate: 92%

🧪 Tests Performed
✅ Prerequisites Check
✅ Backend API Testing
✅ Load Testing
✅ Security Testing
✅ Database Performance
```

## 🔧 Customization

### Modify Test Configuration

#### Backend Tests
Edit `backend_tests.sh`:
```bash
BASE_URL="http://localhost:8080/zoma-burger"  # Change URL
COOKIE_JAR="cookies.txt"                      # Change cookie file
```

#### Load Tests
Edit `load_test.sh`:
```bash
# Modify test parameters
ab -n 1000 -c 10  # 1000 requests, 10 concurrent users
ab -n 2000 -c 20  # Increase load
```

#### Frontend Tests
Edit `frontend_tests.js`:
```javascript
const TEST_CONFIG = {
    baseUrl: 'http://localhost:8080/zoma-burger',
    testUser: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
    }
};
```

## 🚨 Troubleshooting

### Common Issues

#### "Connection refused" errors
```bash
# Check if Tomcat is running
sudo systemctl status tomcat9
# Start if not running
sudo systemctl start tomcat9
```

#### Database connection errors
```bash
# Check PostgreSQL status
sudo systemctl status postgresql
# Test database connection
sudo -u postgres psql -d zoma_burger_db -c "SELECT 1;"
```

#### Permission denied on scripts
```bash
# Make scripts executable
chmod +x *.sh
```

#### Apache Bench not found
```bash
# Install Apache tools
sudo pacman -S apache-tools
```

### Test Data Cleanup
Tests automatically clean up test data, but you can manually clean:
```sql
-- Connect to database
sudo -u postgres psql -d zoma_burger_db

-- Remove test data
DELETE FROM users WHERE email LIKE '%test%';
DELETE FROM contact_messages WHERE email LIKE '%test%';
```

## 📈 Performance Benchmarks

### Expected Performance
- **Homepage load**: < 2 seconds
- **Database queries**: < 100ms
- **API responses**: < 500ms
- **Concurrent users**: 20+ without degradation

### Optimization Tips
1. **Enable database indexing** on frequently queried columns
2. **Implement connection pooling** for database connections
3. **Add caching** for static content
4. **Optimize images** and static assets
5. **Monitor memory usage** during peak load

## 🔒 Security Testing

### Automated Security Checks
- **SQL Injection** protection verification
- **XSS** (Cross-Site Scripting) protection
- **Authentication** bypass attempts
- **Session management** security

### Manual Security Testing
1. **Input validation** - Try malicious inputs
2. **File upload** security (if applicable)
3. **Session hijacking** protection
4. **HTTPS** enforcement (in production)

## 📞 Support

### Getting Help
- Check the main `TESTING_GUIDE.md` for detailed information
- Review console output for specific error messages
- Check application logs in Tomcat logs directory
- Verify database connectivity and data integrity

### Reporting Issues
When reporting test failures, include:
1. **Test script name** and command used
2. **Error messages** from console output
3. **System information** (OS, Java version, etc.)
4. **Application logs** from Tomcat

---

**Happy Testing! 🧪✅**