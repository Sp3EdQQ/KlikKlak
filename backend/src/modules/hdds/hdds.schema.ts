import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const hdds = pgTable('hdds', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price').notNull(),
  producer: varchar('producer', { length: 100 }),
  mpn: varchar('mpn', { length: 100 }),
  ean: varchar('ean', { length: 50 }),
  upc: varchar('upc', { length: 50 }),
  formFactor: varchar('form_factor', { length: 50 }),
  size: varchar('size', { length: 50 }),
  rpm: varchar('rpm', { length: 50 }),
  cache: varchar('cache', { length: 50 }),
  productPage: varchar('product_page', { length: 512 }),
  imageUrl: varchar('image_url', { length: 512 }),
  stock: decimal('stock').notNull().default('0'),
  ...timestamps,
  categoryId: uuid('category_id').references(() => categories.id),
});
