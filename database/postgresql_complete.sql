-- Complete PostgreSQL Database Setup for Zoma Burger Website
-- Run: psql -U postgres -f postgresql_complete.sql

-- Create database and user
CREATE DATABASE zoma_burger_db;
CREATE USER zomaburger WITH PASSWORD 'zomaburger123';
GRANT ALL PRIVILEGES ON DATABASE zoma_burger_db TO zomaburger;

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

-- Payments table
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

-- Cart items table
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

-- Ethiopian banks table
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

-- Insert sample users (password: admin123)
INSERT INTO users (username, email, password, phone, is_admin) VALUES
('admin', 'admin@zomaburger.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+251911234567', TRUE),
('messi', 'messi@zomaburger.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+251911234568', FALSE),
('developer1', 'dev1@zomaburger.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+251911234569', FALSE),
('developer2', 'dev2@zomaburger.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+251911234570', FALSE),
('customer1', 'customer1@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+251911234571', FALSE);

-- Insert Ethiopian banks
INSERT INTO ethiopian_banks (bank_name, bank_code, account_number, account_name, active) VALUES
('Commercial Bank of Ethiopia', 'CBE', '1000123456789', 'Zoma Burger House', TRUE),
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

-- Insert complete menu items
INSERT INTO menu_items (name, description, price, category, image, available) VALUES
('Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, and special sauce', 250.00, 'Burgers', '/images/bruger1.jpg', TRUE),
('Cheeseburger Deluxe', 'Beef patty with melted cheddar, pickles, and onions', 280.00, 'Burgers', '/images/bruger2.jpg', TRUE),
('Double Patty Burger', 'Two beef patties with double cheese and bacon', 350.00, 'Burgers', '/images/bruger3.jpg', TRUE),
('Chicken Burger', 'Crispy chicken breast with avocado and mayo', 220.00, 'Burgers', '/images/bruger4.jpg', TRUE),
('Spicy Chicken Burger', 'Spicy chicken fillet with jalapeños and chipotle sauce', 240.00, 'Burgers', '/images/bruger5.jpg', TRUE),
('Grilled Chicken Burger', 'Grilled chicken breast with fresh vegetables', 230.00, 'Burgers', '/images/bruger6.jpg', TRUE),
('Fish Burger', 'Crispy fish fillet with tartar sauce and lettuce', 210.00, 'Burgers', '/images/bruger7.jpg', TRUE),
('Crispy Fish Burger', 'Beer-battered fish with special sauce', 225.00, 'Burgers', '/images/bruger8.jpg', TRUE),
('Grilled Fish Burger', 'Grilled fish with lemon herb sauce', 235.00, 'Burgers', '/images/bruger9.jpg', TRUE),
('Veggie Burger', 'Plant-based patty with fresh greens and avocado', 190.00, 'Burgers', '/images/bruger10.avif', TRUE),
('Spicy Veggie Burger', 'Spicy plant-based patty with sriracha mayo', 205.00, 'Burgers', '/images/bruger11.jpg', TRUE),
('Plant-Based Burger', 'Premium plant-based burger with all fixings', 215.00, 'Burgers', '/images/bruger12.jpg', TRUE),
('Bacon Cheese Burger', 'Beef patty with crispy bacon and American cheese', 300.00, 'Burgers', '/images/classic.jpg', TRUE),
('Mushroom Swiss Burger', 'Beef patty with sautéed mushrooms and Swiss cheese', 290.00, 'Burgers', '/images/chesse.jpg', TRUE),
('BBQ Burger', 'Beef patty with BBQ sauce and onion rings', 270.00, 'Burgers', '/images/meet.jpg', TRUE),
('Breakfast Burger', 'Beef patty with egg, bacon, and hash brown', 320.00, 'Burgers', '/images/veggeg.jpg', TRUE),
('French Fries', 'Crispy golden fries with ketchup', 80.00, 'Sides', '/images/sides1.jpg', TRUE),
('Onion Rings', 'Crispy battered onion rings', 90.00, 'Sides', '/images/side2.jpg', TRUE),
('Mozzarella Sticks', 'Fried mozzarella with marinara sauce', 110.00, 'Sides', '/images/side3.jpg', TRUE),
('Chicken Wings', 'Spicy buffalo wings', 150.00, 'Sides', '/images/side4.jpg', TRUE),
('Coca Cola', 'Refreshing cold drink', 40.00, 'Drinks', '/images/fanta1.png', TRUE),
('Fanta Orange', 'Orange flavored soda', 40.00, 'Drinks', '/images/fanta3.jpg', TRUE),
('Sprite', 'Lemon-lime soda', 40.00, 'Drinks', '/images/fanta4.jpg', TRUE),
('Fresh Juice', 'Freshly squeezed orange juice', 80.00, 'Drinks', '/images/juse1.jpg', TRUE),
('Mango Juice', 'Fresh mango juice', 85.00, 'Drinks', '/images/juse2.jpeg', TRUE),
('Apple Juice', 'Fresh apple juice', 80.00, 'Drinks', '/images/juse3.jpg', TRUE),
('Chocolate Milkshake', 'Creamy chocolate milkshake', 120.00, 'Drinks', '/images/chekolet.jpg', TRUE),
('Vanilla Milkshake', 'Classic vanilla milkshake', 120.00, 'Drinks', '/images/cream.jpg', TRUE),
('Chocolate Cake', 'Rich chocolate cake slice', 150.00, 'Desserts', '/images/chekolet.jpg', TRUE),
('Ice Cream', 'Vanilla ice cream with toppings', 100.00, 'Desserts', '/images/cream.jpg', TRUE),
('Apple Pie', 'Warm apple pie with ice cream', 130.00, 'Desserts', '/images/aple.jpg', TRUE);

-- Create indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_cart_user_id ON cart_items(user_id);
CREATE INDEX idx_menu_category ON menu_items(category);

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO zomaburger;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO zomaburger;

-- Display summary
SELECT 'Database setup complete!' as status;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_menu_items FROM menu_items;
SELECT COUNT(*) as total_banks FROM ethiopian_banks;