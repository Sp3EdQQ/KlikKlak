import { timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const timestamps = {
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
    precision: 3,
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'string',
    withTimezone: true,
    precision: 3,
  })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
};
