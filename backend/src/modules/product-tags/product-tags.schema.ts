import { pgTable, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { products, tags } from '../../database/index';

export const productTags = pgTable(
  'product_tags',
  {
    productId: varchar('product_id').references(() => products.id),
    tagId: varchar('tag_id').references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.tagId] }),
  }),
);
