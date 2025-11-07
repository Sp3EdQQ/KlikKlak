import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { products, tags } from '../../database/index';

export const productTags = pgTable(
  'product_tags',
  {
    productId: uuid('product_id').references(() => products.id),
    tagId: uuid('tag_id').references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.tagId] }),
  }),
);
