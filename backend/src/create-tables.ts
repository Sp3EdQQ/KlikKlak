import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function createNewTables() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    console.log('🚀 Creating new component tables...');

    const sqlFile = fs.readFileSync(
      path.join(__dirname, '../drizzle/0006_woozy_betty_brant.sql'),
      'utf-8',
    );

    // Wykonaj tylko CREATE TABLE, pomiń ALTER TABLE
    const statements = sqlFile
      .split('--> statement-breakpoint')
      .filter((stmt) => stmt.trim().startsWith('CREATE TABLE'))
      .map((stmt) => stmt.trim());

    for (const statement of statements) {
      try {
        await pool.query(statement);
        const tableName = statement.match(/CREATE TABLE "(\w+)"/)?.[1];
        console.log(`✓ Created table: ${tableName}`);
      } catch (error: any) {
        if (error.code === '42P07') {
          // Table already exists, skip
          const tableName = statement.match(/CREATE TABLE "(\w+)"/)?.[1];
          console.log(`→ Table already exists: ${tableName}`);
        } else {
          throw error;
        }
      }
    }

    console.log('✅ All tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

createNewTables();
