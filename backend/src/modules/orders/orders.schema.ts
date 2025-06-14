import { addresses, users } from '../../database/index';
import { sql } from 'drizzle-orm';
import { pgTable, varchar, decimal } from 'drizzle-orm/pg-core';
import { timestamps } from 'src/database/utils';

export const orders = pgTable('orders', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar('user_id').references(() => users.id),
  status: varchar('status', { length: 50 }),
  total: decimal('total'),
  ...timestamps,
  shippingAddressId: varchar('shipping_address_id').references(
    () => addresses.id,
  ),
});
