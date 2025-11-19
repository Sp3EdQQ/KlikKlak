import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from './database/schema';

dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'adminadmin',
  database: process.env.POSTGRES_DB || 'klikklakdb',
});

const db = drizzle(pool, { schema });

const categories = [
  { name: 'Procesory', description: 'Procesory AMD i Intel' },
  { name: 'Karty graficzne', description: 'Karty graficzne NVIDIA i AMD' },
  { name: 'Pamięć RAM', description: 'Pamięć operacyjna DDR4 i DDR5' },
  { name: 'Dyski SSD', description: 'Szybkie dyski półprzewodnikowe' },
  { name: 'Dyski HDD', description: 'Pojemne dyski talerzowe' },
  { name: 'Płyty główne', description: 'Płyty główne AMD i Intel' },
  { name: 'Zasilacze', description: 'Zasilacze komputerowe' },
  { name: 'Chłodzenia CPU', description: 'Chłodzenia powietrzne i wodne' },
  { name: 'Monitory', description: 'Monitory LCD i OLED' },
  { name: 'Obudowy', description: 'Obudowy komputerowe' },
];

async function seedCategories() {
  try {
    console.log('🚀 Dodawanie kategorii...\n');

    for (const category of categories) {
      try {
        await pool.query(
          `INSERT INTO categories (name, description) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [category.name, category.description]
        );
        console.log(`✓ Dodano kategorię: ${category.name}`);
      } catch (error: any) {
        console.error(`✗ Błąd przy kategorii ${category.name}:`, error.message);
      }
    }

    console.log('\n✅ Zakończono dodawanie kategorii!');
  } catch (error) {
    console.error('❌ Błąd:', error);
  } finally {
    await pool.end();
  }
}

seedCategories();
