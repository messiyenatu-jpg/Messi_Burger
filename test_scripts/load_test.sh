#!/bin/bash

# Load Testing Script for Zoma Burger House
# Uses Apache Bench (ab) to perform load testing

BASE_URL="http://localhost:8080/zoma-burger"

echo "🚀 Load Testing Suite for Zoma Burger House"
echo "==========================================="

# Check if Apache Bench is installed
if ! command -v ab &> /dev/null; then
    echo "❌ Apache Bench (ab) is not installed. Installing..."
    sudo pacman -S apache-tools
fi

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_test() {
    echo -e "${YELLOW}[LOAD TEST]${NC} $1"
}

log_result() {
    echo -e "${GREEN}[RESULT]${NC} $1"
}

# Test 1: Homepage Load Test
log_test "Testing homepage with 1000 requests, 10 concurrent users"
ab -n 1000 -c 10 -g homepage_results.tsv "$BASE_URL/" > homepage_load_test.txt 2>&1

if [ $? -eq 0 ]; then
    requests_per_second=$(grep "Requests per second" homepage_load_test.txt | awk '{print $4}')
    time_per_request=$(grep "Time per request" homepage_load_test.txt | head -1 | awk '{print $4}')
    log_result "Homepage: $requests_per_second req/sec, $time_per_request ms/req"
else
    echo -e "${RED}[ERROR]${NC} Homepage load test failed"
fi

# Test 2: Menu Page Load Test
log_test "Testing menu page with 500 requests, 5 concurrent users"
ab -n 500 -c 5 -g menu_results.tsv "$BASE_URL/menu" > menu_load_test.txt 2>&1

if [ $? -eq 0 ]; then
    requests_per_second=$(grep "Requests per second" menu_load_test.txt | awk '{print $4}')
    time_per_request=$(grep "Time per request" menu_load_test.txt | head -1 | awk '{print $4}')
    log_result "Menu page: $requests_per_second req/sec, $time_per_request ms/req"
else
    echo -e "${RED}[ERROR]${NC} Menu page load test failed"
fi

# Test 3: Login POST Test
log_test "Testing login endpoint with 200 requests, 5 concurrent users"

# Create login data file
cat > login_data.txt << EOF
email=admin@zomaburger.com&password=admin123
EOF

ab -n 200 -c 5 -p login_data.txt -T application/x-www-form-urlencoded -g login_results.tsv "$BASE_URL/login" > login_load_test.txt 2>&1

if [ $? -eq 0 ]; then
    requests_per_second=$(grep "Requests per second" login_load_test.txt | awk '{print $4}')
    time_per_request=$(grep "Time per request" login_load_test.txt | head -1 | awk '{print $4}')
    log_result "Login endpoint: $requests_per_second req/sec, $time_per_request ms/req"
else
    echo -e "${RED}[ERROR]${NC} Login load test failed"
fi

# Test 4: Database Connection Pool Test
log_test "Testing database performance under load"

# Create a simple database test
cat > db_test.sql << EOF
SELECT COUNT(*) FROM menu_items;
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM orders;
EOF

start_time=$(date +%s)
for i in {1..100}; do
    sudo -u postgres psql -d zoma_burger_db -f db_test.sql > /dev/null 2>&1 &
done
wait
end_time=$(date +%s)

db_test_time=$((end_time - start_time))
log_result "100 concurrent database queries completed in ${db_test_time} seconds"

# Test 5: Memory Usage Test
log_test "Monitoring memory usage during load test"

# Start memory monitoring in background
(
    while true; do
        ps aux | grep java | grep tomcat | awk '{print $6}' >> memory_usage.log
        sleep 1
    done
) &
MONITOR_PID=$!

# Run a sustained load test
ab -n 2000 -c 20 -t 60 "$BASE_URL/" > sustained_load_test.txt 2>&1

# Stop memory monitoring
kill $MONITOR_PID 2>/dev/null

if [ -f memory_usage.log ]; then
    max_memory=$(sort -n memory_usage.log | tail -1)
    avg_memory=$(awk '{sum+=$1} END {print sum/NR}' memory_usage.log)
    log_result "Memory usage - Max: ${max_memory}KB, Avg: ${avg_memory}KB"
    rm memory_usage.log
fi

# Generate summary report
echo ""
echo "📊 Load Test Summary Report"
echo "=========================="

cat > load_test_report.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Zoma Burger Load Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .test-result { margin: 10px 0; padding: 10px; border-left: 4px solid #007bff; }
        .pass { border-left-color: #28a745; }
        .warning { border-left-color: #ffc107; }
        .fail { border-left-color: #dc3545; }
    </style>
</head>
<body>
    <h1>Zoma Burger House - Load Test Report</h1>
    <p>Generated on: $(date)</p>
    
    <h2>Test Results</h2>
EOF

# Add results to HTML report
if [ -f homepage_load_test.txt ]; then
    echo "<div class='test-result pass'>" >> load_test_report.html
    echo "<h3>Homepage Load Test</h3>" >> load_test_report.html
    grep "Requests per second\|Time per request\|Failed requests" homepage_load_test.txt >> load_test_report.html
    echo "</div>" >> load_test_report.html
fi

if [ -f menu_load_test.txt ]; then
    echo "<div class='test-result pass'>" >> load_test_report.html
    echo "<h3>Menu Page Load Test</h3>" >> load_test_report.html
    grep "Requests per second\|Time per request\|Failed requests" menu_load_test.txt >> load_test_report.html
    echo "</div>" >> load_test_report.html
fi

if [ -f login_load_test.txt ]; then
    echo "<div class='test-result pass'>" >> load_test_report.html
    echo "<h3>Login Endpoint Load Test</h3>" >> load_test_report.html
    grep "Requests per second\|Time per request\|Failed requests" login_load_test.txt >> load_test_report.html
    echo "</div>" >> load_test_report.html
fi

cat >> load_test_report.html << EOF
    
    <h2>Recommendations</h2>
    <ul>
        <li>Monitor response times under normal load</li>
        <li>Implement caching for static content</li>
        <li>Consider connection pooling optimization</li>
        <li>Set up monitoring alerts for high load</li>
    </ul>
    
</body>
</html>
EOF

log_result "Load test report generated: load_test_report.html"

# Cleanup
rm -f login_data.txt db_test.sql
rm -f *.tsv *.txt

echo ""
echo "✅ Load testing completed!"
echo "📄 Check load_test_report.html for detailed results"