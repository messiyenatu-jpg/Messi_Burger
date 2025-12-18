-- PostgreSQL Database Setup for Zoma Burger Website
-- Run this script after creating the database

-- Create database (run separately as postgres user)
-- CREATE DATABASE zoma_burger_db;
-- CREATE USER zomaburger WITH PASSWORD 'zomaburger123';
-- GRANT ALL PRIVILEGES ON DATABASE zoma_burger_db TO zomaburger;

-- Connect to database
\c zoma_burger_db;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    final_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    delivery_address TEXT,
    phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

-- Payments table with Ethiopian bank support
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    payment_method VARCHAR(50) NOT NULL,
    bank_name VARCHAR(100),
    account_number VARCHAR(50),
    transaction_reference VARCHAR(100) UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    payment_proof VARCHAR(255),
    verified_by INTEGER REFERENCES users(id),
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart items table (session-based)
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, menu_item_id)
);

-- Contact messages table
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ethiopian banks configuration
CREATE TABLE ethiopian_banks (
    id SERIAL PRIMARY KEY,
    bank_name VARCHAR(100) NOT NULL,
    bank_code VARCHAR(20) UNIQUE NOT NULL,
    account_number VARCHAR(50),
    account_name VARCHAR(100),
    swift_code VARCHAR(20),
    active BOOLEAN DEFAULT TRUE,
    logo_url VARCHAR(255)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password, is_admin) 
VALUES ('admin', 'admin@zomaburger.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', TRUE);

-- Insert Ethiopian banks
INSERT INTO ethiopian_banks (bank_name, bank_code, account_number, account_name, active) VALUES
('Commercial Bank of Ethiopia (CBE)', 'CBE', '1000123456789', 'Zoma Burger House', TRUE),
('Awash Bank', 'AWASH', '01234567890123', 'Zoma Burger House', TRUE),
('Bank of Abyssinia', 'BOA', '123456789012', 'Zoma Burger House', TRUE),
('Dashen Bank', 'DASHEN', '0123456789012', 'Zoma Burger House', TRUE),
('Wegagen Bank', 'WEGAGEN', '012345678901', 'Zoma Burger House', TRUE),
('United Bank', 'UNITED', '1234567890123', 'Zoma Burger House', TRUE),
('Nib International Bank', 'NIB', '0123456789012', 'Zoma Burger House', TRUE),
('Cooperative Bank of Oromia', 'CBO', '123456789012', 'Zoma Burger House', TRUE),
('Telebirr', 'TELEBIRR', '0911234567', 'Zoma Burger House', TRUE),
('CBE Birr', 'CBEBIRR', '0911234567', 'Zoma Burger House', TRUE),
('M-Pesa Ethiopia', 'MPESA', '0911234567', 'Zoma Burger House', TRUE),
('HelloCash', 'HELLOCASH', '0911234567', 'Zoma Burger House', TRUE);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, image) VALUES
('Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, and special sauce', 250.00, 'Burgers', 'images/bruger1.jpg'),
('Cheeseburger Deluxe', 'Beef patty with melted cheddar, pickles, and onions', 280.00, 'Burgers', 'images/bruger2.jpg'),
('Double Patty Burger', 'Two beef patties with double cheese and bacon', 350.00, 'Burgers', 'images/bruger3.jpg'),
('Chicken Burger', 'Crispy chicken breast with avocado and mayo', 220.00, 'Burgers', 'images/bruger4.jpg'),
('Spicy Chicken Burger', 'Spicy chicken fillet with jalapeños', 240.00, 'Burgers', 'images/bruger5.jpg'),
('Grilled Chicken Burger', 'Grilled chicken breast with fresh vegetables', 230.00, 'Burgers', 'images/bruger6.jpg'),
('Fish Burger', 'Crispy fish fillet with tartar sauce', 210.00, 'Burgers', 'images/bruger7.jpg'),
('Veggie Burger', 'Plant-based patty with fresh greens', 190.00, 'Burgers', 'images/bruger10.avif'),
('French Fries', 'Crispy golden fries', 80.00, 'Sides', 'images/sides1.jpg'),
('Onion Rings', 'Crispy battered onion rings', 90.00, 'Sides', 'images/side2.jpg'),
('Coca Cola', 'Refreshing cold drink', 40.00, 'Drinks', 'images/fanta1.png'),
('Chocolate Milkshake', 'Creamy chocolate milkshake', 120.00, 'Drinks', 'images/chekolet.jpg'),
('Chocolate Cake', 'Rich chocolate cake slice', 150.00, 'Desserts', 'images/chekolet.jpg');

-- Create indexes for better performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_cart_user_id ON cart_items(user_id);
CREATE INDEX idx_menu_category ON menu_items(category);

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO zomaburger;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO zomaburger;