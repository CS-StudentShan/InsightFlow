-- Customers table
CREATE TABLE customers (
    customer_id VARCHAR(20) PRIMARY KEY,
    country VARCHAR(100),
    first_purchase_date DATE,
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0
);

-- Products table
CREATE TABLE products (
    stock_code VARCHAR(20) PRIMARY KEY,
    description TEXT,
    unit_price DECIMAL(10,2)
);

-- Orders table
CREATE TABLE orders (
    order_id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) REFERENCES customers(customer_id),
    order_date TIMESTAMP,
    country VARCHAR(100),
    total_amount DECIMAL(10,2)
);

-- Order items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(20) REFERENCES orders(order_id),
    stock_code VARCHAR(20) REFERENCES products(stock_code),
    description TEXT,
    quantity INT,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(10,2)
);

-- Indexes for fast queries
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);