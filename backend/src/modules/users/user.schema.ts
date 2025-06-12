import { sql } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from 'src/database/utils';

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  ...timestamps,

  // phone: varchar('phone', { length: 100 }),
  // address: varchar('address', { length: 100 }),
  // city: varchar('city', { length: 100 }),
  // state: varchar('state', { length: 100 }),
  // zip: varchar('zip', { length: 100 }),
  // country: varchar('country', { length: 100 }),
  // role: varchar('role', { length: 20 }).default('user').notNull(),
});
