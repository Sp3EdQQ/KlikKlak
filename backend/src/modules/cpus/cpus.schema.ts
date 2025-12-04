import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal, boolean, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const cpus = pgTable('cpus', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price').notNull(),
  producer: varchar('producer', { length: 100 }),
  mpn: varchar('mpn', { length: 100 }),
  ean: varchar('ean', { length: 50 }),
  upc: varchar('upc', { length: 50 }),
  baseClock: varchar('base_clock', { length: 50 }),
  turboClock: varchar('turbo_clock', { length: 50 }),
  unlockedMultiplier: boolean('unlocked_multiplier'),
  cores: varchar('cores', { length: 20 }),
  threads: varchar('threads', { length: 20 }),
  tdp: varchar('tdp', { length: 50 }),
  socket: varchar('socket', { length: 50 }),
  integratedGpu: varchar('integrated_gpu', { length: 100 }),
  productPage: varchar('product_page', { length: 512 }),
  imageUrl: varchar('image_url', { length: 512 }),
  stock: decimal('stock').notNull().default('0'),
  ...timestamps,
  categoryId: uuid('category_id').references(() => categories.id),
});
