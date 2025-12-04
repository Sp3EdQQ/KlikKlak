import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class SsdsService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) { }

  async findAll() {
    return this.db.select().from(schema.ssds);
  }

  async findOne(id: string) {
    const [ssd] = await this.db
      .select()
      .from(schema.ssds)
      .where(eq(schema.ssds.id, id));
    return ssd;
  }
}
