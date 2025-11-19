import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';

@Injectable()
export class CpuCoolersService {
  constructor(
    @Inject('DRIZZLE') private db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.db.select().from(schema.cpuCoolers);
  }

  async findOne(id: string) {
    const [cpuCooler] = await this.db
      .select()
      .from(schema.cpuCoolers)
      .where(eq(schema.cpuCoolers.id, id));
    return cpuCooler;
  }
}
