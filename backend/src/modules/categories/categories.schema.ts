import { sql } from 'drizzle-orm';
import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: varchar('description'),
});
