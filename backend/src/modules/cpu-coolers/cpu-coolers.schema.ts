import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal, boolean, integer, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const cpuCoolers = pgTable('cpu_coolers', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price').notNull(),
  producer: varchar('producer', { length: 100 }),
  mpn: varchar('mpn', { length: 100 }),
  ean: varchar('ean', { length: 50 }),
  upc: varchar('upc', { length: 50 }),
  supportedSockets: varchar('supported_sockets', { length: 512 }),
  height: varchar('height', { length: 50 }),
  tdp: varchar('tdp', { length: 50 }),
  fans80mm: integer('fans_80mm'),
  fans92mm: integer('fans_92mm'),
  fans120mm: integer('fans_120mm'),
  fans140mm: integer('fans_140mm'),
  fans200mm: integer('fans_200mm'),
  additionalFanSupport: boolean('additional_fan_support'),
  productPage: varchar('product_page', { length: 512 }),
  imageUrl: varchar('image_url', { length: 512 }),
  stock: decimal('stock').notNull().default('0'),
  ...timestamps,
  categoryId: uuid('category_id').references(() => categories.id),
});
