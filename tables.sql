-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation.', 199.99),
('Smartphone', 'Latest model smartphone with 5G connectivity and advanced camera.', 899.00),
('Laptop', 'Lightweight laptop with powerful performance and long battery life.', 1299.99),
('Smartwatch', 'Waterproof smartwatch with fitness tracking and GPS.', 249.50),
('Bluetooth Speaker', 'Portable Bluetooth speaker with deep bass and long playtime.', 89.99),
('Gaming Console', 'Next-gen gaming console with stunning graphics and exclusive games.', 499.99),
('4K TV', 'Ultra HD 4K television with HDR and smart functionality.', 999.00),
('Action Camera', 'Compact action camera with 4K recording and waterproof casing.', 299.00),
('Fitness Tracker', 'Wearable fitness tracker with heart rate monitoring.', 49.99),
('Drone', 'High-performance drone with 4K camera and long flight time.', 599.99);

CREATE TABLE recently_viewed (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);
