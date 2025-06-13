import { sql } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  decimal,
  numeric,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';
import { categories } from '../categories/categories.schema';

export const products = pgTable('products', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description'),
  price: decimal('price').notNull(),
  stock: numeric('stock').notNull(),
  imageUrl: varchar('image_url', { length: 512 }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  categoryId: integer('category_id').references(() => categories.id),
});
