import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/index';
import { wishlists } from './wishlists.schema';

@Injectable()
export class WishlistService {
  constructor(
    @Inject('DB') private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.drizzle.select().from(wishlists);
  }
}
