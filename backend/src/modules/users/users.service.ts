import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from 'src/database/drizzle.service';
import { users } from './user.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private readonly drizzle: DrizzleService) {}

  async findAll() {
    return this.drizzle.db.select().from(users);
  }

  async findOne(id: string) {
    const user = await this.drizzle.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    // TODO: hash password
    const [user] = await this.drizzle.db.insert(users).values(data).returning();
    return user;
  }

  async update(
    id: string,
    data: {
      email?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
    },
  ) {
    // TODO: hash password if present
    const [user] = await this.drizzle.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(id: string) {
    const [user] = await this.drizzle.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.drizzle.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }
}
