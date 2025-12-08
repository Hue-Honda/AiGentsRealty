import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function getSchema() {
  console.log('📊 CURRENT DATABASE SCHEMA\n');
  console.log('='.repeat(60));

  // Get all tables and views
  const tables = await pool.query(`
    SELECT table_name, table_type
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_type, table_name;
  `);

  console.log('\n📁 TABLES & VIEWS:');
  console.log('-'.repeat(40));
  tables.rows.forEach(t => console.log(`  ${t.table_type.padEnd(12)} ${t.table_name}`));

  // Get row counts for main tables
  console.log('\n📈 ROW COUNTS:');
  console.log('-'.repeat(40));
  const counts = await pool.query(`
    SELECT 'areas' as tbl, COUNT(*) as cnt FROM areas
    UNION ALL SELECT 'projects', COUNT(*) FROM projects
    UNION ALL SELECT 'developers', COUNT(*) FROM developers
    UNION ALL SELECT 'area_market_stats', COUNT(*) FROM area_market_stats
    UNION ALL SELECT 'market_trends', COUNT(*) FROM market_trends
    UNION ALL SELECT 'area_monthly_stats', COUNT(*) FROM area_monthly_stats
;
  `);
  counts.rows.forEach(r => console.log(`  ${r.tbl.padEnd(22)} ${r.cnt} rows`));

  // Get columns for each main table
  console.log('\n📋 TABLE STRUCTURES:');
  console.log('='.repeat(60));

  const mainTables = ['areas', 'projects', 'developers', 'area_market_stats', 'market_trends', 'area_monthly_stats'];

  for (const tbl of mainTables) {
    const cols = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position;
    `, [tbl]);

    console.log(`\n🔹 ${tbl.toUpperCase()}`);
    console.log('-'.repeat(50));
    cols.rows.forEach(c => {
      const nullable = c.is_nullable === 'YES' ? '?' : '*';
      console.log(`  ${nullable} ${c.column_name.padEnd(28)} ${c.data_type}`);
    });
  }

  // Show views
  console.log('\n👁️ VIEWS:');
  console.log('='.repeat(60));
  const views = await pool.query(`
    SELECT table_name FROM information_schema.views
    WHERE table_schema = 'public';
  `);
  views.rows.forEach(v => console.log(`  - ${v.table_name}`));

  await pool.end();
}

getSchema();
