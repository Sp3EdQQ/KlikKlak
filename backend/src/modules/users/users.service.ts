import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DrizzleService } from 'src/database/drizzle.service';
import { users } from './user.schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UpdateUserDto } from './user.zod';

@Injectable()
export class UsersService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly jwtService: JwtService,
  ) { }

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

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const [user] = await this.drizzle.db
      .insert(users)
      .values({ ...data, password: hashedPassword })
      .returning();
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    const [user] = await this.drizzle.db
      .update(users)
      .set(updateData)
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
    const { password: _, refreshToken: __, ...userData } = user;

    // Generate access token (short-lived, 15 minutes)
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      { expiresIn: '15m' },
    );

    // Generate refresh token (long-lived, 7 days)
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        type: 'refresh',
      },
      { expiresIn: '7d' },
    );

    // Hash and save refresh token to database
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.drizzle.db
      .update(users)
      .set({ refreshToken: hashedRefreshToken })
      .where(eq(users.id, user.id));

    return {
      user: userData,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      // Verify refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken);

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Find user and verify stored refresh token
      const user = await this.findOne(payload.sub);
      if (!user.refreshToken) {
        throw new UnauthorizedException('No refresh token found');
      }

      const isTokenValid = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );
      if (!isTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new access token
      const newAccessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        { expiresIn: '15m' },
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, refreshToken: __, ...userData } = user;

      return {
        user: userData,
        access_token: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(userId: string) {
    const [user] = await this.drizzle.db
      .update(users)
      .set({ refreshToken: null })
      .where(eq(users.id, userId))
      .returning();

    if (!user) throw new NotFoundException('User not found');
    return { message: 'Logged out successfully' };
  }
}
