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

async function fixAreaStatsView() {
  console.log('🔧 Fixing area_stats view...');

  try {
    // Drop the old view
    console.log('Dropping old view...');
    await pool.query('DROP VIEW IF EXISTS area_stats;');
    console.log('✅ Old view dropped');

    // Create a new view that properly handles M and K price formats
    const createViewSQL = `
      CREATE VIEW area_stats AS
      SELECT
        a.*,
        COUNT(p.id) as actual_project_count,
        MIN(
          CASE
            WHEN p.price_from LIKE '%M' THEN
              CAST(
                REPLACE(REPLACE(REPLACE(p.price_from, 'AED ', ''), 'M', ''), '.', '')
                AS NUMERIC
              ) *
              CASE
                WHEN p.price_from LIKE '%.%M' THEN 100000
                ELSE 1000000
              END
            WHEN p.price_from LIKE '%K' THEN
              CAST(
                REPLACE(REPLACE(p.price_from, 'AED ', ''), 'K', '000')
                AS NUMERIC
              )
            ELSE NULL
          END
        ) as min_price
      FROM areas a
      LEFT JOIN projects p ON a.id = p.area_id
      GROUP BY a.id;
    `;

    console.log('Creating new view...');
    await pool.query(createViewSQL);
    console.log('✅ New view created');

    // Test the view
    const result = await pool.query('SELECT name, actual_project_count, min_price FROM area_stats LIMIT 5;');
    console.log('✅ View test passed! Sample data:');
    console.table(result.rows);

  } catch (error) {
    console.log('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

fixAreaStatsView();
