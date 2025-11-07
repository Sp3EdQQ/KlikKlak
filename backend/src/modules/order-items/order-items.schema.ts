import { sql } from 'drizzle-orm';
import { pgTable, integer, uuid, varchar, decimal } from 'drizzle-orm/pg-core';
import { products, orders } from '../../database/index';

export const orderItems = pgTable('order_items', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  orderId: uuid('order_id').references(() => orders.id),
  productId: uuid('product_id').references(() => products.id),
  quantity: integer('quantity'),
  price: decimal('price'),
});
