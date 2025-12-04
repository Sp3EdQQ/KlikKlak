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

// Mapowanie typu komponentu → nazwa kategorii
const categoryMapping = {
  cpu: 'Procesory',
  gpu: 'Karty graficzne',
  ram: 'Pamięć RAM',
  ssd: 'Dyski SSD',
  hdd: 'Dyski HDD',
  motherboard: 'Płyty główne',
  psu: 'Zasilacze',
  cpu_cooler: 'Chłodzenia CPU',
  monitor: 'Monitory',
  case: 'Obudowy',
};

async function updateProductCategories() {
  console.log('🔄 Aktualizacja category_id w tabeli products...\n');

  try {
    // Najpierw pobierz UUID kategorii
    const categoriesResult = await db.execute(sql`
      SELECT id, name FROM categories
    `);

    const categoryMap = new Map<string, string>();
    categoriesResult.rows.forEach((row: any) => {
      categoryMap.set(row.name, row.id);
    });

    console.log('📋 Znalezione kategorie:');
    categoryMap.forEach((id, name) => {
      console.log(`   ${name}: ${id}`);
    });
    console.log();

    // Aktualizuj category_id dla każdego typu komponentu
    for (const [componentType, categoryName] of Object.entries(categoryMapping)) {
      const categoryId = categoryMap.get(categoryName);

      if (!categoryId) {
        console.log(`⚠️  Brak kategorii "${categoryName}" dla ${componentType}`);
        continue;
      }

      const result = await db.execute(sql`
        UPDATE products
        SET category_id = ${categoryId}::uuid
        WHERE component_type = ${componentType}
      `);

      console.log(`✅ ${componentType}: zaktualizowano ${result.rowCount || 0} produktów → ${categoryName}`);
    }

    console.log('\n📊 Podsumowanie po aktualizacji:');
    const summaryResult = await db.execute(sql`
      SELECT c.name, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      GROUP BY c.id, c.name
      ORDER BY product_count DESC
    `);

    summaryResult.rows.forEach((row: any) => {
      console.log(`   ${row.name}: ${row.product_count} produktów`);
    });

    // Usuń duplikaty kategorii (stare)
    console.log('\n🗑️  Usuwanie duplikatów kategorii...');
    const toDelete = ['Procesor', 'Karta graficzna']; // Stare nazwy w liczbie pojedynczej

    for (const name of toDelete) {
      const result = await db.execute(sql`
        DELETE FROM categories WHERE name = ${name}
      `);
      if (result.rowCount && result.rowCount > 0) {
        console.log(`   ❌ Usunięto kategorię: ${name}`);
      }
    }

    console.log('\n✨ Zakończono pomyślnie!');

  } catch (error) {
    console.error('❌ Błąd podczas aktualizacji:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

updateProductCategories();
