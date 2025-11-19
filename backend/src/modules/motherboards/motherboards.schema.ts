import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal, boolean, integer, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const motherboards = pgTable('motherboards', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price').notNull(),
  producer: varchar('producer', { length: 100 }),
  mpn: varchar('mpn', { length: 100 }),
  ean: varchar('ean', { length: 50 }),
  upc: varchar('upc', { length: 50 }),
  socket: varchar('socket', { length: 50 }),
  chipset: varchar('chipset', { length: 50 }),
  unlocked: boolean('unlocked'),
  formFactor: varchar('form_factor', { length: 50 }),
  memoryType: varchar('memory_type', { length: 50 }),
  memoryCapacity: varchar('memory_capacity', { length: 50 }),
  ramSlots: integer('ram_slots'),
  sata: integer('sata'),
  vga: integer('vga'),
  dvi: integer('dvi'),
  displayPort: integer('display_port'),
  hdmi: integer('hdmi'),
  wifi: boolean('wifi'),
  integratedGraphics: boolean('integrated_graphics'),
  productPage: varchar('product_page', { length: 512 }),
  imageUrl: varchar('image_url', { length: 512 }),
  stock: decimal('stock').notNull().default('0'),
  ...timestamps,
  categoryId: uuid('category_id').references(() => categories.id),
});
