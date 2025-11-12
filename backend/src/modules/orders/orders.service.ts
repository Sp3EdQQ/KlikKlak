import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/index';
import { orders } from './orders.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('DB') private readonly drizzle: NodePgDatabase<typeof schema>,
  ) { }

  async findAll() {
    return this.drizzle.select().from(orders);
  }

  async findOne(id: string) {
    const order = await this.drizzle.query.orders.findFirst({
      where: eq(orders.id, id),
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(data: any) {
    const [order] = await this.drizzle
      .insert(orders)
      .values(data)
      .returning();
    return order;
  }

  async update(id: string, data: any) {
    const [order] = await this.drizzle
      .update(orders)
      .set(data)
      .where(eq(orders.id, id))
      .returning();
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
