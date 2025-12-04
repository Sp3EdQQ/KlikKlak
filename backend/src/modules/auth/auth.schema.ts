import { sql } from 'drizzle-orm';
import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from '../users/user.schema';

// Tabela do przechowywania refresh tokenów
export const refreshTokens = pgTable('refresh_tokens', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    token: varchar('token', { length: 500 }).notNull().unique(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});
