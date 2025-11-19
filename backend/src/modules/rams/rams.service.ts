import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class RamsService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.select().from(schema.rams);
  }

  async findOne(id: string) {
    const [ram] = await this.db
      .select()
      .from(schema.rams)
      .where(eq(schema.rams.id, id));
    return ram;
  }
}
