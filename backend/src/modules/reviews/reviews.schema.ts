import { sql } from 'drizzle-orm';
import { pgTable, integer, varchar, uuid } from 'drizzle-orm/pg-core';
import { products, users } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const reviews = pgTable('reviews', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar('user_id').references(() => users.id),
  productId: varchar('product_id').references(() => products.id),
  rating: integer('rating'),
  comment: varchar('comment'),
  ...timestamps,
});
