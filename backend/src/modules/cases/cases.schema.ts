import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal, boolean, integer, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const cases = pgTable('cases', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price').notNull(),
  producer: varchar('producer', { length: 100 }),
  mpn: varchar('mpn', { length: 100 }),
  ean: varchar('ean', { length: 50 }),
  upc: varchar('upc', { length: 50 }),
  width: varchar('width', { length: 50 }),
  depth: varchar('depth', { length: 50 }),
  height: varchar('height', { length: 50 }),
  motherboard: varchar('motherboard', { length: 50 }),
  powerSupply: varchar('power_supply', { length: 50 }),
  supportedGpuLength: varchar('supported_gpu_length', { length: 50 }),
  supportedCpuCoolerHeight: varchar('supported_cpu_cooler_height', { length: 50 }),
  fans80mm: varchar('fans_80mm', { length: 50 }),
  fans120mm: varchar('fans_120mm', { length: 50 }),
  fans140mm: varchar('fans_140mm', { length: 50 }),
  fans200mm: varchar('fans_200mm', { length: 50 }),
  radiator120mm: integer('radiator_120mm'),
  radiator140mm: integer('radiator_140mm'),
  radiator240mm: integer('radiator_240mm'),
  radiator280mm: integer('radiator_280mm'),
  radiator360mm: integer('radiator_360mm'),
  disk25: integer('disk_25'),
  disk35: integer('disk_35'),
  disk2535: integer('disk_25_35'),
  disk525: integer('disk_525'),
  primaryColors: varchar('primary_colors', { length: 100 }),
  hasWindow: boolean('has_window'),
  dustFilter: boolean('dust_filter'),
  cableManagement: boolean('cable_management'),
  noiseIsolation: boolean('noise_isolation'),
  productPage: varchar('product_page', { length: 512 }),
  imageUrl: varchar('image_url', { length: 512 }),
  stock: decimal('stock').notNull().default('0'),
  ...timestamps,
  categoryId: uuid('category_id').references(() => categories.id),
});
