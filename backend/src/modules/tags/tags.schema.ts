import { sql } from 'drizzle-orm';
import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const tags = pgTable('tags', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 100 }).notNull().unique(),
});
