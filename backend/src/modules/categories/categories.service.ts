import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/index';
import { categories } from './categories.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('DB') private readonly drizzle: NodePgDatabase<typeof schema>,
  ) { }

  async findAll() {
    return this.drizzle.select().from(categories);
  }

  async findOne(id: string) {
    const category = await this.drizzle.query.categories.findFirst({
      where: eq(categories.id, id),
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(data: any) {
    const [category] = await this.drizzle
      .insert(categories)
      .values(data)
      .returning();
    return category;
  }

  async update(id: string, data: any) {
    const [category] = await this.drizzle
      .update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async remove(id: string) {
    const [category] = await this.drizzle
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
