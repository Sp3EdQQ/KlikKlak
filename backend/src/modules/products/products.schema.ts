import { sql } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  decimal,
  numeric,
  integer,
} from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const products = pgTable('products', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description'),
  price: decimal('price').notNull(),
  stock: numeric('stock').notNull(),
  imageUrl: varchar('image_url', { length: 512 }),
  ...timestamps,
  categoryId: integer('category_id').references(() => categories.id),
});
