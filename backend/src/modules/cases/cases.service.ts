import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class CasesService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.select().from(schema.cases);
  }

  async findOne(id: string) {
    const [caseItem] = await this.db
      .select()
      .from(schema.cases)
      .where(eq(schema.cases.id, id));
    return caseItem;
  }
}
