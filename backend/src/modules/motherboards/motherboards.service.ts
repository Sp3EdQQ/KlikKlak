import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class MotherboardsService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) { }

  async findAll() {
    return this.db.select().from(schema.motherboards);
  }

  async findOne(id: string) {
    const [motherboard] = await this.db
      .select()
      .from(schema.motherboards)
      .where(eq(schema.motherboards.id, id));
    return motherboard;
  }
}
