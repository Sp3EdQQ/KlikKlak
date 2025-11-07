import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:adminadmin@localhost:5432/klikklakdb',
  },
});
