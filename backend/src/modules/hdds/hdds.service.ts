import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class HddsService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) { }

  async findAll() {
    return this.db.select().from(schema.hdds);
  }

  async findOne(id: string) {
    const [hdd] = await this.db
      .select()
      .from(schema.hdds)
      .where(eq(schema.hdds.id, id));
    return hdd;
  }
}
