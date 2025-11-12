import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/index';
import { tags } from './tags.schema';

@Injectable()
export class TagsService {
  constructor(
    @Inject('DB') private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.drizzle.select().from(tags);
  }

  async findOne(id: string) {
    const result = await this.drizzle
      .select()
      .from(tags)
      .where(eq(tags.id, id));
    return result[0];
  }

  async create(data: { name: string }) {
    const result = await this.drizzle
      .insert(tags)
      .values(data)
      .returning();
    return result[0];
  }

  async update(id: string, data: { name: string }) {
    const result = await this.drizzle
      .update(tags)
      .set(data)
      .where(eq(tags.id, id))
      .returning();
    return result[0];
  }

  async remove(id: string) {
    await this.drizzle
      .delete(tags)
      .where(eq(tags.id, id));
    return { message: 'Tag deleted successfully' };
  }
}
