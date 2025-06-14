import { defineConfig } from 'drizzle-kit';
import { ConfigService } from '@nestjs/config';
import dotenv from 'dotenv';

const configService = new ConfigService();

dotenv.config({
  path: '.env',
});

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: configService.get('POSTGRES_HOST') as string,
    port: configService.get('POSTGRES_PORT'),
    user: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB') as string,
    ssl: false,
  },
});
