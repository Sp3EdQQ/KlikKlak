import { sql } from 'drizzle-orm';
import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';
import { products, wishlists } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const wishlistItems = pgTable('wishlist_items', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  wishlistId: uuid('wishlist_id').references(() => wishlists.id),
  productId: uuid('product_id').references(() => products.id),
  ...timestamps,
});
