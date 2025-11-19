import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class GpusService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.select().from(schema.gpus);
  }

  async findOne(id: string) {
    const [gpu] = await this.db
      .select()
      .from(schema.gpus)
      .where(eq(schema.gpus.id, id));
    return gpu;
  }
}
