import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'adminadmin',
  database: process.env.POSTGRES_DB || 'klikklakdb',
});

const db = drizzle(pool);

// Mapowanie CSV do tabel
const CSV_MAPPINGS = {
  'CPUData.csv': {
    table: 'cpus',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Base Clock': 'base_clock',
      'Turbo Clock': 'turbo_clock',
      'Unlocked Multiplier': 'unlocked_multiplier',
      'Cores': 'cores',
      'Threads': 'threads',
      'TDP': 'tdp',
      'Socket': 'socket',
      'Integrated GPU': 'integrated_gpu',
      'Product Page': 'product_page',
    },
  },
  'GPUData.csv': {
    table: 'gpus',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Length': 'length',
      'Slots': 'slots',
      '8-Pin Connectors': 'pin8_connectors',
      '6-Pin Connectors': 'pin6_connectors',
      'HDMI': 'hdmi',
      'DisplayPort': 'display_port',
      'DVI': 'dvi',
      'VGA': 'vga',
      'Boost Clock': 'boost_clock',
      'Vram': 'vram',
      'Memory Clock': 'memory_clock',
      'TDP': 'tdp',
      'Product Page': 'product_page',
    },
  },
  'RAMData.csv': {
    table: 'rams',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Ram Type': 'ram_type',
      'Size': 'size',
      'Clock': 'clock',
      'Timings': 'timings',
      'Sticks': 'sticks',
      'Product Page': 'product_page',
    },
  },
  'SSDData.csv': {
    table: 'ssds',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Form Factor': 'form_factor',
      'Protocol': 'protocol',
      'Size': 'size',
      'NAND': 'nand',
      'Controller': 'controller',
      'Product Page': 'product_page',
    },
  },
  'HDDData.csv': {
    table: 'hdds',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Form Factor': 'form_factor',
      'Size': 'size',
      'RPM': 'rpm',
      'Cache': 'cache',
      'Product Page': 'product_page',
    },
  },
  'MotherboardData.csv': {
    table: 'motherboards',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Socket': 'socket',
      'Chipset': 'chipset',
      'Unlocked': 'unlocked',
      'Form Factor': 'form_factor',
      'Memory Type': 'memory_type',
      'Memory Capacity': 'memory_capacity',
      'RAM Slots': 'ram_slots',
      'SATA': 'sata',
      'VGA': 'vga',
      'DVI': 'dvi',
      'Display Port': 'display_port',
      'HDMI': 'hdmi',
      'WiFi': 'wifi',
      'Integrated Graphics': 'integrated_graphics',
      'Product Page': 'product_page',
    },
  },
  'PSUData.csv': {
    table: 'psus',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Watt': 'watt',
      'Size': 'size',
      'Efficiency Rating': 'efficiency_rating',
      'Product Page': 'product_page',
    },
  },
  'CPUCoolerData.csv': {
    table: 'cpu_coolers',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Supported Sockets': 'supported_sockets',
      'Height': 'height',
      'TDP': 'tdp',
      '80mm Fans': 'fans_80mm',
      '92mm Fans': 'fans_92mm',
      '120mm Fans': 'fans_120mm',
      '140mm Fans': 'fans_140mm',
      '200mm Fans': 'fans_200mm',
      'Additional Fan Support': 'additional_fan_support',
      'Product Page': 'product_page',
    },
  },
  'MonitorData.csv': {
    table: 'monitors',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Resolution': 'resolution',
      'Refresh Rate': 'refresh_rate',
      'Size': 'size',
      'Panel': 'panel',
      'Response Time': 'response_time',
      'HDMI': 'hdmi',
      'DisplayPort': 'display_port',
      'DVI': 'dvi',
      'VGA': 'vga',
      'Speaker': 'speaker',
      'Curved': 'curved',
      'Adjustable Height': 'adjustable_height',
      'Sync': 'sync',
      'Product Page': 'product_page',
    },
  },
  'CaseData.csv': {
    table: 'cases',
    columns: {
      'Name': 'name',
      'Price': 'price',
      'Producer': 'producer',
      'MPN': 'mpn',
      'EAN': 'ean',
      'UPC': 'upc',
      'Width': 'width',
      'Depth': 'depth',
      'Height': 'height',
      'Motherboard': 'motherboard',
      'Power Supply': 'power_supply',
      'Supported GPU Length': 'supported_gpu_length',
      'Supported CPU Cooler Height': 'supported_cpu_cooler_height',
      '80mm Fans': 'fans_80mm',
      '120mm Fans': 'fans_120mm',
      '140mm Fans': 'fans_140mm',
      '200mm Fans': 'fans_200mm',
      '120mm Radiator Support': 'radiator_120mm',
      '140mm Radiator Support': 'radiator_140mm',
      '240mm Radiator Support': 'radiator_240mm',
      '280mm Radiator Support': 'radiator_280mm',
      '360mm Radiator Support': 'radiator_360mm',
      'Disk 2.5"': 'disk_25',
      'Disk 3.5"': 'disk_35',
      'Disk 2.5"/3.5"': 'disk_25_35',
      'Disk 5.25"': 'disk_525',
      'Primary Color(s)': 'primary_colors',
      'Window': 'has_window',
      'Dust Filter': 'dust_filter',
      'Cable Management': 'cable_management',
      'Noise Isolation': 'noise_isolation',
      'Product Page': 'product_page',
    },
  },
};

function parsePrice(priceStr: string): number {
  if (!priceStr || priceStr === '') return 0;
  // Extract numeric value from "$158.86 USD" format
  const match = priceStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function parseBoolean(value: string): boolean {
  if (!value || value === '') return false;
  const lower = value.toLowerCase();
  return lower === 'true' || lower === '1' || lower === 'yes';
}

function parseInteger(value: string): number | null {
  if (!value || value === '') return null;
  const parsed = parseInt(value);
  return isNaN(parsed) ? null : parsed;
}

async function importCSV(csvFileName: string, mapping: any) {
  const csvPath = path.join(__dirname, '../../database files', csvFileName);
  
  if (!fs.existsSync(csvPath)) {
    console.log(`⚠️  File not found: ${csvFileName}`);
    return;
  }

  console.log(`\n📂 Importing ${csvFileName}...`);

  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  let imported = 0;
  let skipped = 0;
  const batchSize = 100;
  const batches: any[][] = [];
  let currentBatch: any[] = [];

  for (const record of records) {
    const data: any = {};
    
    // Map CSV columns to database columns
    for (const [csvCol, dbCol] of Object.entries<string>(mapping.columns)) {
      const value = (record as any)[csvCol];
      
      if (dbCol === 'price') {
        data[dbCol] = parsePrice(value);
      } else if (dbCol.includes('unlocked') || dbCol.includes('wifi') || 
                 dbCol.includes('speaker') || dbCol.includes('curved') || 
                 dbCol.includes('has_window') || dbCol.includes('dust_filter') ||
                 dbCol.includes('cable_management') || dbCol.includes('noise_isolation') ||
                 dbCol.includes('adjustable') || dbCol.includes('integrated') ||
                 dbCol.includes('additional_fan')) {
        data[dbCol] = parseBoolean(value);
      } else if (dbCol.includes('_connectors') || dbCol.includes('hdmi') || 
                 dbCol.includes('display_port') || dbCol.includes('dvi') || 
                 dbCol.includes('vga') || dbCol.includes('sata') || 
                 dbCol.includes('ram_slots') || dbCol.includes('sticks') ||
                 dbCol.includes('fans_') || dbCol.includes('radiator_') ||
                 dbCol.includes('disk_')) {
        data[dbCol] = parseInteger(value);
      } else {
        data[dbCol] = value && value !== '' ? value : null;
      }
    }

    // Skip if no name or price = 0
    if (!data.name || data.price === 0) {
      skipped++;
      continue;
    }

    // Add default values
    data.stock = Math.floor(Math.random() * 50) + 10; // Random stock 10-60

    currentBatch.push(data);

    if (currentBatch.length >= batchSize) {
      batches.push(currentBatch);
      currentBatch = [];
    }
  }

  // Add remaining records
  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  // Insert batches
  for (const batch of batches) {
    try {
      const columns = Object.keys(batch[0]);
      const values: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      for (const row of batch) {
        const rowValues = columns.map(() => `$${paramIndex++}`);
        values.push(`(${rowValues.join(', ')})`);
        params.push(...columns.map(col => row[col]));
      }

      const query = `
        INSERT INTO ${mapping.table} (${columns.join(', ')})
        VALUES ${values.join(', ')}
        ON CONFLICT DO NOTHING
      `;

      const result = await pool.query(query, params);
      imported += result.rowCount || 0;
      console.log(`  ✓ Imported ${imported} records...`);
    } catch (error: any) {
      console.error(`  ❌ Error importing batch:`, error.message);
    }
  }

  console.log(`  ✅ Imported: ${imported}, Skipped: ${skipped}`);
}

async function importAllData() {
  try {
    console.log('🚀 Starting CSV import...\n');

    for (const [csvFile, mapping] of Object.entries(CSV_MAPPINGS)) {
      await importCSV(csvFile, mapping);
    }

    console.log('\n✅ All data imported successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

importAllData();
