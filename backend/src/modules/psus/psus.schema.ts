import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const psus = pgTable('psus', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price').notNull(),
  producer: varchar('producer', { length: 100 }),
  mpn: varchar('mpn', { length: 100 }),
  ean: varchar('ean', { length: 50 }),
  upc: varchar('upc', { length: 50 }),
  watt: varchar('watt', { length: 50 }),
  size: varchar('size', { length: 50 }),
  efficiencyRating: varchar('efficiency_rating', { length: 50 }),
  productPage: varchar('product_page', { length: 512 }),
  imageUrl: varchar('image_url', { length: 512 }),
  stock: decimal('stock').notNull().default('0'),
  ...timestamps,
  categoryId: uuid('category_id').references(() => categories.id),
});
