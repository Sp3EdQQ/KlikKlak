import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/index';
import { users } from './user.schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DB') private readonly drizzle: NodePgDatabase<typeof schema>,
    private readonly jwtService: JwtService,
  ) { }

  async findAll() {
    return this.drizzle.select().from(users);
  }

  async findOne(id: string) {
    const user = await this.drizzle.query.users.findFirst({
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
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const [user] = await this.drizzle
      .insert(users)
      .values({ ...data, password: hashedPassword })
      .returning();
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
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    const [user] = await this.drizzle
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(id: string) {
    const [user] = await this.drizzle
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.drizzle.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(email: string, plainPassword: string) {
    const user = await this.validateUser(email, plainPassword);
    //For error bellow: Remove password from userData because we shouldn't send it to the frontend.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user;
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return { user: userData, access_token: token };
  }
}
