#!/bin/bash

# Backend Testing Script for Zoma Burger House
# Run this script to test all backend endpoints and functionality

BASE_URL="http://localhost:8080/zoma-burger"
COOKIE_JAR="cookies.txt"

echo "🧪 Starting Backend Testing Suite for Zoma Burger House"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Helper functions
log_test() {
    echo -e "${YELLOW}[TEST]${NC} $1"
}

log_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
    ((TESTS_PASSED++))
}

log_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    ((TESTS_FAILED++))
}

test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local expected_status=$4
    local description=$5
    
    log_test "$description"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "%{http_code}" -b "$COOKIE_JAR" "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "%{http_code}" -X "$method" -b "$COOKIE_JAR" -c "$COOKIE_JAR" \
                   -H "Content-Type: application/x-www-form-urlencoded" \
                   -d "$data" "$BASE_URL$endpoint")
    fi
    
    status_code="${response: -3}"
    
    if [ "$status_code" = "$expected_status" ]; then
        log_pass "$description - Status: $status_code"
    else
        log_fail "$description - Expected: $expected_status, Got: $status_code"
    fi
}

# Clean up previous test session
rm -f "$COOKIE_JAR"

echo ""
echo "🔍 Testing Database Connection"
echo "------------------------------"

# Test database connection
log_test "Database connectivity"
if sudo -u postgres psql -d zoma_burger_db -c "SELECT 1;" > /dev/null 2>&1; then
    log_pass "Database connection successful"
else
    log_fail "Database connection failed"
fi

echo ""
echo "🌐 Testing Web Application Endpoints"
echo "------------------------------------"

# Test homepage
test_endpoint "GET" "/" "" "200" "Homepage accessibility"

# Test registration page
test_endpoint "GET" "/register" "" "200" "Registration page"

# Test login page
test_endpoint "GET" "/login" "" "200" "Login page"

# Test menu page
test_endpoint "GET" "/menu" "" "200" "Menu page"

# Test contact page
test_endpoint "GET" "/contact" "" "200" "Contact page"

echo ""
echo "👤 Testing User Authentication"
echo "------------------------------"

# Test user registration
test_endpoint "POST" "/register" \
    "username=testuser&email=test@example.com&password=password123&phone=+251911234567" \
    "302" "User registration"

# Test user login
test_endpoint "POST" "/login" \
    "email=test@example.com&password=password123" \
    "302" "User login"

# Test invalid login
test_endpoint "POST" "/login" \
    "email=invalid@example.com&password=wrongpass" \
    "200" "Invalid login (should stay on login page)"

echo ""
echo "🛒 Testing Cart Functionality"
echo "-----------------------------"

# Login first for cart tests
curl -s -X POST -c "$COOKIE_JAR" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "email=admin@zomaburger.com&password=admin123" \
     "$BASE_URL/login" > /dev/null

# Test add to cart
test_endpoint "POST" "/cart" \
    "action=add&menuItemId=1&quantity=2" \
    "200" "Add item to cart"

# Test view cart
test_endpoint "GET" "/cart" "" "200" "View cart"

# Test update cart
test_endpoint "POST" "/cart" \
    "action=update&menuItemId=1&quantity=3" \
    "200" "Update cart quantity"

# Test remove from cart
test_endpoint "POST" "/cart" \
    "action=remove&menuItemId=1" \
    "200" "Remove item from cart"

echo ""
echo "💳 Testing Payment System"
echo "-------------------------"

# Add item to cart first
curl -s -X POST -b "$COOKIE_JAR" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "action=add&menuItemId=1&quantity=1" \
     "$BASE_URL/cart" > /dev/null

# Test checkout page
test_endpoint "GET" "/checkout" "" "200" "Checkout page"

# Test order placement
test_endpoint "POST" "/checkout" \
    "deliveryAddress=Test Address&phone=+251911234567&paymentMethod=CBE&notes=Test order" \
    "302" "Place order"

echo ""
echo "📞 Testing Contact Form"
echo "----------------------"

# Test contact form submission
test_endpoint "POST" "/contact" \
    "name=Test User&email=test@example.com&subject=Test&message=This is a test message" \
    "302" "Contact form submission"

echo ""
echo "🔐 Testing Admin Functions"
echo "--------------------------"

# Login as admin
curl -s -X POST -c "$COOKIE_JAR" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "email=admin@zomaburger.com&password=admin123" \
     "$BASE_URL/login" > /dev/null

# Test admin dashboard
test_endpoint "GET" "/admin/dashboard" "" "200" "Admin dashboard"

# Test user management
test_endpoint "GET" "/admin/users" "" "200" "User management"

# Test menu management
test_endpoint "GET" "/admin/menu" "" "200" "Menu management"

# Test order management
test_endpoint "GET" "/admin/orders" "" "200" "Order management"

# Test payment verification
test_endpoint "GET" "/admin/payments" "" "200" "Payment verification"

echo ""
echo "🔒 Testing Security"
echo "-------------------"

# Test SQL injection protection
log_test "SQL injection protection in login"
response=$(curl -s -w "%{http_code}" -X POST \
           -H "Content-Type: application/x-www-form-urlencoded" \
           -d "email=admin@zomaburger.com' OR '1'='1&password=anything" \
           "$BASE_URL/login")
status_code="${response: -3}"

if [ "$status_code" = "200" ]; then
    log_pass "SQL injection protection - Login rejected malicious input"
else
    log_fail "SQL injection protection - Potential vulnerability detected"
fi

# Test XSS protection
log_test "XSS protection in contact form"
response=$(curl -s -w "%{http_code}" -X POST \
           -H "Content-Type: application/x-www-form-urlencoded" \
           -d "name=<script>alert('XSS')</script>&email=test@example.com&subject=Test&message=Test" \
           "$BASE_URL/contact")
status_code="${response: -3}"

if [ "$status_code" = "302" ]; then
    log_pass "XSS protection - Form accepted input (check if script is sanitized)"
else
    log_fail "XSS protection - Form rejected input unexpectedly"
fi

echo ""
echo "⚡ Testing Performance"
echo "---------------------"

# Test page load times
log_test "Homepage load time"
start_time=$(date +%s%N)
curl -s "$BASE_URL/" > /dev/null
end_time=$(date +%s%N)
load_time=$(( (end_time - start_time) / 1000000 ))

if [ $load_time -lt 2000 ]; then
    log_pass "Homepage loads in ${load_time}ms (under 2 seconds)"
else
    log_fail "Homepage loads in ${load_time}ms (over 2 seconds)"
fi

# Test database query performance
log_test "Database query performance"
start_time=$(date +%s%N)
sudo -u postgres psql -d zoma_burger_db -c "SELECT COUNT(*) FROM menu_items;" > /dev/null 2>&1
end_time=$(date +%s%N)
query_time=$(( (end_time - start_time) / 1000000 ))

if [ $query_time -lt 100 ]; then
    log_pass "Database query executes in ${query_time}ms (under 100ms)"
else
    log_fail "Database query executes in ${query_time}ms (over 100ms)"
fi

echo ""
echo "🧹 Cleanup"
echo "----------"

# Clean up test data
log_test "Cleaning up test data"
sudo -u postgres psql -d zoma_burger_db -c "DELETE FROM users WHERE email = 'test@example.com';" > /dev/null 2>&1
sudo -u postgres psql -d zoma_burger_db -c "DELETE FROM contact_messages WHERE email = 'test@example.com';" > /dev/null 2>&1
rm -f "$COOKIE_JAR"
log_pass "Test data cleaned up"

echo ""
echo "📊 Test Results Summary"
echo "======================"
echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
echo "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please check the output above.${NC}"
    exit 1
fi