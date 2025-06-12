import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  phone: varchar('phone', { length: 100 }),
  address: varchar('address', { length: 100 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  zip: varchar('zip', { length: 100 }),
  country: varchar('country', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  role: varchar('role', { length: 20 }).default('user').notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
});
