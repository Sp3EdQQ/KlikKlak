import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal, numeric, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../database/index';
import { timestamps } from 'src/database/utils';

// Unified products table - abstrakcyjna warstwa dla wszystkich komponentów
export const products = pgTable('products', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  // Typ i ID komponentu
  componentType: varchar('component_type', { length: 50 }).notNull(), // 'cpu', 'gpu', 'ram', 'ssd', 'hdd', 'motherboard', 'psu', 'cpu_cooler', 'monitor', 'case'
  componentId: uuid('component_id').notNull(), // FK do odpowiedniej tabeli komponentu

  // Wspólne dane produktu
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 512 }).notNull().unique(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  stock: numeric('stock').notNull().default(sql`0`),
  imageUrl: varchar('image_url', { length: 512 }),

  // Kategoria
  categoryId: uuid('category_id').references(() => categories.id),

  // Dodatkowe metadane
  producer: varchar('producer', { length: 100 }),
  mpn: varchar('mpn', { length: 100 }),
  ean: varchar('ean', { length: 13 }),
  productPage: varchar('product_page', { length: 512 }),

  ...timestamps,
});
