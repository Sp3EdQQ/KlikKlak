import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class MonitorsService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.select().from(schema.monitors);
  }

  async findOne(id: string) {
    const [monitor] = await this.db
      .select()
      .from(schema.monitors)
      .where(eq(schema.monitors.id, id));
    return monitor;
  }
}
