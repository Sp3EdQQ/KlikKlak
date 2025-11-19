import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class CpusService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.select().from(schema.cpus);
  }

  async findOne(id: string) {
    const [cpu] = await this.db
      .select()
      .from(schema.cpus)
      .where(eq(schema.cpus.id, id));
    return cpu;
  }
}
