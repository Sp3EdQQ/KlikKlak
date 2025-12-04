import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/index';
import { users } from '../users/user.schema';
import { refreshTokens } from './auth.schema';
import { eq, and, gt, lt } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { LoginDtoType, RegisterDtoType } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DRIZZLE') private readonly drizzle: NodePgDatabase<typeof schema>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDtoType) {
    const { email, password, firstName, lastName } = registerDto;

    // Sprawdź czy użytkownik już istnieje
    const existingUser = await this.drizzle.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      throw new ConflictException('Użytkownik z tym adresem email już istnieje');
    }

    // Hashuj hasło
    const hashedPassword = await bcrypt.hash(password, 10);

    // Utwórz użytkownika
    const [user] = await this.drizzle
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'user', // Domyślna rola
      })
      .returning();

    // Generuj tokeny
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async login(loginDto: LoginDtoType) {
    const { email, password } = loginDto;

    // Znajdź użytkownika
    const user = await this.drizzle.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    // Sprawdź hasło
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    // Generuj tokeny
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Weryfikuj refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
      });

      // Sprawdź czy token istnieje w bazie i nie wygasł
      const [tokenRecord] = await this.drizzle
        .select()
        .from(refreshTokens)
        .where(
          and(
            eq(refreshTokens.token, refreshToken),
            gt(refreshTokens.expiresAt, new Date()),
          ),
        )
        .limit(1);

      if (!tokenRecord) {
        throw new UnauthorizedException('Nieprawidłowy refresh token');
      }

      // Znajdź użytkownika
      const user = await this.drizzle.query.users.findFirst({
        where: eq(users.id, payload.sub),
      });

      if (!user) {
        throw new UnauthorizedException('Użytkownik nie znaleziony');
      }

      // Usuń stary refresh token
      await this.drizzle
        .delete(refreshTokens)
        .where(eq(refreshTokens.token, refreshToken));

      // Generuj nowe tokeny
      const tokens = await this.generateTokens(user.id, user.email, user.role);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Nieprawidłowy refresh token');
    }
  }

  async logout(refreshToken: string) {
    // Usuń refresh token z bazy
    await this.drizzle
      .delete(refreshTokens)
      .where(eq(refreshTokens.token, refreshToken));

    return { message: 'Wylogowano pomyślnie' };
  }

  async validateUser(userId: string) {
    const user = await this.drizzle.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      throw new UnauthorizedException('Użytkownik nie znaleziony');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    // Access token (krótkotrwały - 15 minut)
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'secret-key',
      expiresIn: '15m',
    });

    // Refresh token (długotrwały - 7 dni)
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
      expiresIn: '7d',
    });

    // Zapisz refresh token w bazie
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.drizzle.insert(refreshTokens).values({
      userId,
      token: refreshToken,
      expiresAt,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  // Cleanup expired tokens (można uruchomić w cron job)
  async cleanupExpiredTokens() {
    const now = new Date();
    await this.drizzle
      .delete(refreshTokens)
      .where(lt(refreshTokens.expiresAt, now));
  }
}
