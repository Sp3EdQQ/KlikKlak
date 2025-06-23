import { sql } from 'drizzle-orm';
import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';
import { users } from '../../database/index';
import { timestamps } from 'src/database/utils';

export const carts = pgTable('carts', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar('user_id').references(() => users.id),
  ...timestamps,
});
