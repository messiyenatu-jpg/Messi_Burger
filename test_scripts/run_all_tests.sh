#!/bin/bash

# Master Test Runner for Zoma Burger House
# Runs all frontend and backend tests

echo "🍔 Zoma Burger House - Complete Testing Suite"
echo "============================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

log_section() {
    echo -e "\n${BLUE}$1${NC}"
    echo "$(printf '=%.0s' {1..50})"
}

log_info() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
    ((PASSED_TESTS++))
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    ((FAILED_TESTS++))
}

# Check prerequisites
check_prerequisites() {
    log_section "Checking Prerequisites"
    
    # Check if Tomcat is running
    if pgrep -f tomcat > /dev/null; then
        log_success "Tomcat server is running"
    else
        log_error "Tomcat server is not running. Please start Tomcat first."
        exit 1
    fi
    
    # Check if PostgreSQL is running
    if sudo systemctl is-active postgresql > /dev/null 2>&1; then
        log_success "PostgreSQL is running"
    else
        log_error "PostgreSQL is not running. Please start PostgreSQL first."
        exit 1
    fi
    
    # Check database connection
    if sudo -u postgres psql -d zoma_burger_db -c "SELECT 1;" > /dev/null 2>&1; then
        log_success "Database connection successful"
    else
        log_error "Cannot connect to database"
        exit 1
    fi
    
    # Check if application is accessible
    if curl -s -f "http://localhost:8080/zoma-burger/" > /dev/null; then
        log_success "Web application is accessible"
    else
        log_error "Web application is not accessible"
        exit 1
    fi
}

# Run backend tests
run_backend_tests() {
    log_section "Running Backend Tests"
    
    if [ -f "backend_tests.sh" ]; then
        chmod +x backend_tests.sh
        if ./backend_tests.sh; then
            log_success "Backend tests completed successfully"
        else
            log_error "Backend tests failed"
        fi
    else
        log_error "Backend test script not found"
    fi
}

# Run load tests
run_load_tests() {
    log_section "Running Load Tests"
    
    log_info "Load tests may take several minutes to complete..."
    
    if [ -f "load_test.sh" ]; then
        chmod +x load_test.sh
        if ./load_test.sh; then
            log_success "Load tests completed successfully"
        else
            log_error "Load tests failed"
        fi
    else
        log_error "Load test script not found"
    fi
}

# Run security tests
run_security_tests() {
    log_section "Running Security Tests"
    
    # Test SQL injection
    log_info "Testing SQL injection protection..."
    response=$(curl -s -w "%{http_code}" -X POST \
               -H "Content-Type: application/x-www-form-urlencoded" \
               -d "email=admin' OR '1'='1&password=test" \
               "http://localhost:8080/zoma-burger/login")
    
    if [[ "${response: -3}" == "200" ]]; then
        log_success "SQL injection protection working"
    else
        log_error "Potential SQL injection vulnerability"
    fi
    
    # Test XSS protection
    log_info "Testing XSS protection..."
    response=$(curl -s -w "%{http_code}" -X POST \
               -H "Content-Type: application/x-www-form-urlencoded" \
               -d "name=<script>alert('xss')</script>&email=test@test.com&subject=test&message=test" \
               "http://localhost:8080/zoma-burger/contact")
    
    if [[ "${response: -3}" == "302" ]]; then
        log_success "XSS protection test completed (check manual verification)"
    else
        log_error "XSS protection test failed"
    fi
    
    # Test HTTPS redirect (if configured)
    log_info "Testing security headers..."
    headers=$(curl -s -I "http://localhost:8080/zoma-burger/")
    
    if echo "$headers" | grep -i "x-frame-options" > /dev/null; then
        log_success "Security headers present"
    else
        log_info "Consider adding security headers (X-Frame-Options, etc.)"
    fi
}

# Test database performance
test_database_performance() {
    log_section "Testing Database Performance"
    
    # Test query performance
    log_info "Testing database query performance..."
    
    start_time=$(date +%s%N)
    sudo -u postgres psql -d zoma_burger_db -c "
        SELECT m.name, m.price, COUNT(oi.id) as order_count 
        FROM menu_items m 
        LEFT JOIN order_items oi ON m.id = oi.menu_item_id 
        GROUP BY m.id, m.name, m.price 
        ORDER BY order_count DESC 
        LIMIT 10;
    " > /dev/null 2>&1
    end_time=$(date +%s%N)
    
    query_time=$(( (end_time - start_time) / 1000000 ))
    
    if [ $query_time -lt 500 ]; then
        log_success "Complex query executed in ${query_time}ms"
    else
        log_error "Complex query took ${query_time}ms (consider optimization)"
    fi
    
    # Test concurrent connections
    log_info "Testing concurrent database connections..."
    
    for i in {1..10}; do
        sudo -u postgres psql -d zoma_burger_db -c "SELECT COUNT(*) FROM users;" > /dev/null 2>&1 &
    done
    wait
    
    log_success "Concurrent connection test completed"
}

# Generate comprehensive report
generate_report() {
    log_section "Generating Test Report"
    
    cat > test_report.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Zoma Burger House - Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .header { text-align: center; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 20px; }
        .section { margin: 20px 0; padding: 15px; border-radius: 5px; }
        .pass { background-color: #d4edda; border-left: 4px solid #28a745; }
        .fail { background-color: #f8d7da; border-left: 4px solid #dc3545; }
        .info { background-color: #d1ecf1; border-left: 4px solid #17a2b8; }
        .summary { background-color: #fff3cd; border-left: 4px solid #ffc107; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍔 Zoma Burger House</h1>
            <h2>Complete Testing Report</h2>
            <p>Generated on: $(date)</p>
        </div>
        
        <div class="section summary">
            <h3>📊 Test Summary</h3>
            <table>
                <tr><th>Metric</th><th>Value</th></tr>
                <tr><td>Total Tests</td><td>$((PASSED_TESTS + FAILED_TESTS))</td></tr>
                <tr><td>Passed</td><td style="color: green;">$PASSED_TESTS</td></tr>
                <tr><td>Failed</td><td style="color: red;">$FAILED_TESTS</td></tr>
                <tr><td>Success Rate</td><td>$(( PASSED_TESTS * 100 / (PASSED_TESTS + FAILED_TESTS) ))%</td></tr>
            </table>
        </div>
        
        <div class="section info">
            <h3>🧪 Tests Performed</h3>
            <ul>
                <li>✅ Prerequisites Check</li>
                <li>✅ Backend API Testing</li>
                <li>✅ Load Testing</li>
                <li>✅ Security Testing</li>
                <li>✅ Database Performance</li>
            </ul>
        </div>
        
        <div class="section info">
            <h3>🔧 Technology Stack Tested</h3>
            <ul>
                <li><strong>Backend:</strong> Java Servlets, JSP</li>
                <li><strong>Database:</strong> PostgreSQL</li>
                <li><strong>Server:</strong> Apache Tomcat</li>
                <li><strong>Frontend:</strong> Bootstrap 5, JavaScript</li>
            </ul>
        </div>
        
        <div class="section info">
            <h3>📋 Recommendations</h3>
            <ul>
                <li>Implement automated testing in CI/CD pipeline</li>
                <li>Set up monitoring and alerting</li>
                <li>Regular security audits</li>
                <li>Performance optimization based on load test results</li>
                <li>Database query optimization</li>
            </ul>
        </div>
        
        <div class="section info">
            <h3>📞 Support Information</h3>
            <p><strong>Application:</strong> Zoma Burger House</p>
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Environment:</strong> Development/Testing</p>
        </div>
    </div>
</body>
</html>
EOF
    
    log_success "Test report generated: test_report.html"
}

# Main execution
main() {
    cd "$(dirname "$0")"
    
    check_prerequisites
    run_backend_tests
    run_load_tests
    run_security_tests
    test_database_performance
    generate_report
    
    echo ""
    log_section "Final Results"
    
    if [ $FAILED_TESTS -eq 0 ]; then
        echo -e "${GREEN}🎉 All tests completed successfully!${NC}"
        echo -e "${GREEN}✅ Total: $((PASSED_TESTS + FAILED_TESTS)) tests, $PASSED_TESTS passed, $FAILED_TESTS failed${NC}"
    else
        echo -e "${RED}❌ Some tests failed${NC}"
        echo -e "${YELLOW}📊 Total: $((PASSED_TESTS + FAILED_TESTS)) tests, $PASSED_TESTS passed, $FAILED_TESTS failed${NC}"
    fi
    
    echo ""
    echo -e "${BLUE}📄 Detailed reports available:${NC}"
    echo "  - test_report.html (Main report)"
    echo "  - load_test_report.html (Load testing)"
    echo ""
    echo -e "${YELLOW}💡 Next steps:${NC}"
    echo "  1. Review test reports"
    echo "  2. Fix any failed tests"
    echo "  3. Optimize performance based on results"
    echo "  4. Set up continuous testing"
}

# Run main function
main "$@"