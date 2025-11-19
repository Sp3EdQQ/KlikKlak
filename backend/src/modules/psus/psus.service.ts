import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class PsusService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.select().from(schema.psus);
  }

  async findOne(id: string) {
    const [psu] = await this.db
      .select()
      .from(schema.psus)
      .where(eq(schema.psus.id, id));
    return psu;
  }
}
