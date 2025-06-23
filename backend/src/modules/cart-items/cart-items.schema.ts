import { sql } from 'drizzle-orm';
import { pgTable, varchar, integer, uuid } from 'drizzle-orm/pg-core';
import { carts, products } from '../../database/index';

export const cartItems = pgTable('cart_items', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  cartId: varchar('cart_id').references(() => carts.id),
  productId: varchar('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
});
