import { sql } from 'drizzle-orm';
import { pgTable, varchar, integer, uuid } from 'drizzle-orm/pg-core';
import { carts, products } from '../../database/index';

export const cartItems = pgTable('cart_items', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  cartId: uuid('cart_id').references(() => carts.id),
  productId: uuid('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
});
