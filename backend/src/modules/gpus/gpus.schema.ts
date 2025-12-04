import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal, integer, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const gpus = pgTable('gpus', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price').notNull(),
  producer: varchar('producer', { length: 100 }),
  mpn: varchar('mpn', { length: 100 }),
  ean: varchar('ean', { length: 50 }),
  upc: varchar('upc', { length: 50 }),
  length: varchar('length', { length: 50 }),
  slots: varchar('slots', { length: 20 }),
  pin8Connectors: integer('pin8_connectors'),
  pin6Connectors: integer('pin6_connectors'),
  hdmi: integer('hdmi'),
  displayPort: integer('display_port'),
  dvi: integer('dvi'),
  vga: integer('vga'),
  boostClock: varchar('boost_clock', { length: 50 }),
  vram: varchar('vram', { length: 50 }),
  memoryClock: varchar('memory_clock', { length: 50 }),
  tdp: varchar('tdp', { length: 50 }),
  productPage: varchar('product_page', { length: 512 }),
  imageUrl: varchar('image_url', { length: 512 }),
  stock: decimal('stock').notNull().default('0'),
  ...timestamps,
  categoryId: uuid('category_id').references(() => categories.id),
});
