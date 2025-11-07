import { users } from '../users/user.schema';
import { sql } from 'drizzle-orm';
import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const addresses = pgTable('addresses', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id),
  fullName: varchar('full_name', { length: 255 }),
  street: varchar('street', { length: 255 }),
  city: varchar('city', { length: 100 }),
  postalCode: varchar('postal_code', { length: 20 }),
  country: varchar('country', { length: 100 }),
  phone: varchar('phone', { length: 50 }),
});
