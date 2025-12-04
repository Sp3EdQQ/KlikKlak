import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { sql } from 'drizzle-orm';

const pool = new Pool({
  host: process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'adminadmin',
  database: 'klikklakdb',
});

const db = drizzle(pool);

// Mapowanie nazw tabel komponentów do ich typów
const componentTypes = [
  { table: 'cpus', type: 'cpu' },
  { table: 'gpus', type: 'gpu' },
  { table: 'rams', type: 'ram' },
  { table: 'ssds', type: 'ssd' },
  { table: 'hdds', type: 'hdd' },
  { table: 'motherboards', type: 'motherboard' },
  { table: 'psus', type: 'psu' },
  { table: 'cpu_coolers', type: 'cpu_cooler' },
  { table: 'monitors', type: 'monitor' },
  { table: 'cases', type: 'case' },
];

async function populateProducts() {
  console.log('🚀 Rozpoczynam wypełnianie tabeli products...\n');

  try {
    for (const { table, type } of componentTypes) {
      console.log(`📦 Przetwarzam ${table}...`);

      // Wstawiamy dane z tabeli komponentu do products
      const result = await db.execute(sql`
        INSERT INTO products (
          component_type,
          component_id,
          name,
          price,
          stock,
          image_url,
          category_id,
          producer,
          mpn,
          ean,
          product_page,
          created_at,
          updated_at
        )
        SELECT
          ${type}::varchar as component_type,
          id as component_id,
          name,
          price,
          COALESCE(stock, 0) as stock,
          image_url,
          category_id,
          producer,
          mpn,
          ean,
          product_page,
          created_at,
          updated_at
        FROM ${sql.identifier(table)}
        ON CONFLICT (id) DO NOTHING
      `);

      console.log(`   ✅ Dodano ${result.rowCount || 0} produktów z ${table}`);
    }

    console.log('\n✨ Zakończono pomyślnie!');
    console.log('\n📊 Podsumowanie:');

    // Sprawdzamy ile mamy produktów każdego typu
    for (const { type } of componentTypes) {
      const result = await db.execute(sql`
        SELECT COUNT(*) as count FROM products WHERE component_type = ${type}
      `);
      const count = result.rows[0]?.count || 0;
      console.log(`   ${type}: ${count} produktów`);
    }

    // Całkowita liczba produktów
    const totalResult = await db.execute(sql`SELECT COUNT(*) as count FROM products`);
    const total = totalResult.rows[0]?.count || 0;
    console.log(`\n   RAZEM: ${total} produktów w tabeli products`);

  } catch (error) {
    console.error('❌ Błąd podczas wypełniania tabeli products:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

populateProducts();
