-- Migracja 0009: Dodanie foreign keys do cart_items, order_items, reviews

-- 1. Cart Items - zmiana typów i dodanie FK
ALTER TABLE cart_items ALTER COLUMN cart_id TYPE uuid USING cart_id::uuid;
ALTER TABLE cart_items ALTER COLUMN product_id TYPE uuid USING product_id::uuid;
ALTER TABLE cart_items ADD CONSTRAINT cart_items_cart_id_fk FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE;
ALTER TABLE cart_items ADD CONSTRAINT cart_items_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

-- 2. Order Items - zmiana typów i dodanie FK
ALTER TABLE order_items ALTER COLUMN order_id TYPE uuid USING order_id::uuid;
ALTER TABLE order_items ALTER COLUMN product_id TYPE uuid USING product_id::uuid;
ALTER TABLE order_items ADD CONSTRAINT order_items_order_id_fk FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;
ALTER TABLE order_items ADD CONSTRAINT order_items_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT;

-- 3. Reviews - zmiana typów i dodanie FK
ALTER TABLE reviews ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE reviews ALTER COLUMN product_id TYPE uuid USING product_id::uuid;
ALTER TABLE reviews ADD CONSTRAINT reviews_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE reviews ADD CONSTRAINT reviews_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

-- 4. Carts - zmiana typu user_id i dodanie FK
ALTER TABLE carts ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE carts ADD CONSTRAINT carts_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- 5. Orders - zmiana typów i dodanie FK
ALTER TABLE orders ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE orders ALTER COLUMN shipping_address_id TYPE uuid USING shipping_address_id::uuid;
ALTER TABLE orders ADD CONSTRAINT orders_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT;
ALTER TABLE orders ADD CONSTRAINT orders_shipping_address_id_fk FOREIGN KEY (shipping_address_id) REFERENCES addresses(id) ON DELETE RESTRICT;

-- 6. Addresses - zmiana typu user_id i dodanie FK
ALTER TABLE addresses ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE addresses ADD CONSTRAINT addresses_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- 7. Wishlists - zmiana typu user_id i dodanie FK (jeśli tabela istnieje)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'wishlists') THEN
    ALTER TABLE wishlists ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
    ALTER TABLE wishlists ADD CONSTRAINT wishlists_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;
END
$$;

-- 8. Product Tags - zmiana typów i dodanie FK
ALTER TABLE product_tags ALTER COLUMN product_id TYPE uuid USING product_id::uuid;
ALTER TABLE product_tags ALTER COLUMN tag_id TYPE uuid USING tag_id::uuid;
ALTER TABLE product_tags ADD CONSTRAINT product_tags_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;
ALTER TABLE product_tags ADD CONSTRAINT product_tags_tag_id_fk FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE;
