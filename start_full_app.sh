#!/bin/bash

echo "🍔 Starting Zoma Burger Full Stack Application"
echo "=============================================="

# Check if PostgreSQL is running
if ! systemctl is-active --quiet postgresql; then
    echo "Starting PostgreSQL..."
    sudo systemctl start postgresql
fi

# Start Spring Boot Backend
echo "Starting Spring Boot Backend on port 8081..."
cd "/home/messi/Downloads/Telegram Desktop/BurgerWebsite"
mvn spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 10

# Start React Frontend
echo "Starting React Frontend on port 3000..."
cd "/home/messi/Downloads/Telegram Desktop/BurgerWebsite/frontend"
npm start &
FRONTEND_PID=$!

echo ""
echo "🚀 Application Started Successfully!"
echo "=================================="
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8081"
echo "Admin:    http://localhost:3000/admin"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user to stop
trap "echo 'Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait