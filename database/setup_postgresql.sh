#!/bin/bash

# PostgreSQL Setup Script for Zoma Burger Website on Manjaro
# Run this script to set up PostgreSQL database

echo "🍔 Setting up PostgreSQL for Zoma Burger Website..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "📦 Installing PostgreSQL..."
    sudo pacman -S postgresql
fi

# Initialize PostgreSQL if not already done
if [ ! -d "/var/lib/postgres/data" ]; then
    echo "🔧 Initializing PostgreSQL database..."
    sudo -u postgres initdb -D /var/lib/postgres/data
fi

# Start and enable PostgreSQL service
echo "🚀 Starting PostgreSQL service..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Wait for PostgreSQL to start
sleep 3

# Create database and user
echo "👤 Creating database and user..."
sudo -u postgres psql << EOF
CREATE DATABASE zoma_burger_db;
CREATE USER zomaburger WITH PASSWORD 'zomaburger123';
GRANT ALL PRIVILEGES ON DATABASE zoma_burger_db TO zomaburger;
ALTER USER zomaburger CREATEDB;
\q
EOF

# Run the database setup script
echo "📊 Setting up database schema..."
sudo -u postgres psql -d zoma_burger_db -f postgresql_setup.sql

echo "✅ PostgreSQL setup completed!"
echo ""
echo "📋 Database Connection Details:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: zoma_burger_db"
echo "   Username: zomaburger"
echo "   Password: zomaburger123"
echo ""
echo "🔐 Default Admin Login:"
echo "   Email: admin@zomaburger.com"
echo "   Password: admin123"
echo ""
echo "🏦 Ethiopian Banks Configured:"
echo "   - Commercial Bank of Ethiopia (CBE)"
echo "   - Awash Bank"
echo "   - Bank of Abyssinia"
echo "   - Dashen Bank"
echo "   - Wegagen Bank"
echo "   - United Bank"
echo "   - Nib International Bank"
echo "   - Cooperative Bank of Oromia"
echo "   - Telebirr (Digital)"
echo "   - CBE Birr (Digital)"
echo "   - M-Pesa Ethiopia (Digital)"
echo "   - HelloCash (Digital)"
echo ""
echo "🚀 You can now start your Tomcat server and access the website!"