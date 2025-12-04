import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal, boolean, integer, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const monitors = pgTable('monitors', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price').notNull(),
  producer: varchar('producer', { length: 100 }),
  mpn: varchar('mpn', { length: 100 }),
  ean: varchar('ean', { length: 50 }),
  upc: varchar('upc', { length: 50 }),
  resolution: varchar('resolution', { length: 50 }),
  refreshRate: varchar('refresh_rate', { length: 50 }),
  size: varchar('size', { length: 50 }),
  panel: varchar('panel', { length: 50 }),
  responseTime: varchar('response_time', { length: 50 }),
  hdmi: integer('hdmi'),
  displayPort: integer('display_port'),
  dvi: integer('dvi'),
  vga: integer('vga'),
  speaker: boolean('speaker'),
  curved: boolean('curved'),
  adjustableHeight: boolean('adjustable_height'),
  sync: varchar('sync', { length: 50 }),
  productPage: varchar('product_page', { length: 512 }),
  imageUrl: varchar('image_url', { length: 512 }),
  stock: decimal('stock').notNull().default('0'),
  ...timestamps,
  categoryId: uuid('category_id').references(() => categories.id),
});
