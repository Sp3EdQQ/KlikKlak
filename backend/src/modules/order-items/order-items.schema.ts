import { sql } from 'drizzle-orm';
import { pgTable, integer, varchar, decimal } from 'drizzle-orm/pg-core';
import { products, orders } from '../../database/index';

export const orderItems = pgTable('order_items', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  orderId: varchar('order_id').references(() => orders.id),
  productId: varchar('product_id').references(() => products.id),
  quantity: integer('quantity'),
  price: decimal('price'),
});
