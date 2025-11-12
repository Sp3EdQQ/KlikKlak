import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/index';
import { products } from './products.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('DB') private readonly drizzle: NodePgDatabase<typeof schema>,
  ) { }

  async findAll() {
    return this.drizzle.select().from(products);
  }

  async findOne(id: string) {
    const product = await this.drizzle.query.products.findFirst({
      where: eq(products.id, id),
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: any) {
    const [product] = await this.drizzle
      .insert(products)
      .values(data)
      .returning();
    return product;
  }

  async update(id: string, data: any) {
    const [product] = await this.drizzle
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string) {
    const [product] = await this.drizzle
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
