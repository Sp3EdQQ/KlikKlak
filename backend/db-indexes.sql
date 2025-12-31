-- Optymalizacja indeksów dla tabeli products
CREATE INDEX IF NOT EXISTS idx_products_component_type ON products(component_type);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- Indeksy dla często używanych filtrów
CREATE INDEX IF NOT EXISTS idx_products_component_category ON products(component_type, category_id);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_quantity) WHERE stock_quantity > 0;

-- Optymalizacja dla pozostałych tabel
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

-- Materialized view dla popularnych produktów (opcjonalnie)
-- CREATE MATERIALIZED VIEW IF NOT EXISTS popular_products AS
-- SELECT p.*, COUNT(oi.id) as order_count
-- FROM products p
-- LEFT JOIN order_items oi ON p.id = oi.product_id
-- GROUP BY p.id
-- ORDER BY order_count DESC;

-- CREATE INDEX IF NOT EXISTS idx_popular_products_count ON popular_products(order_count DESC);

-- Vacuum i analyze dla optymalizacji
VACUUM ANALYZE products;
VACUUM ANALYZE orders;
VACUUM ANALYZE order_items;
