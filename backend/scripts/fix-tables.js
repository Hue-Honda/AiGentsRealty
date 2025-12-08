import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function fixTables() {
  console.log('Fixing table schema...');

  try {
    // Drop existing tables
    await pool.query('DROP TABLE IF EXISTS area_market_stats CASCADE');
    await pool.query('DROP TABLE IF EXISTS market_trends CASCADE');
    await pool.query('DROP TABLE IF EXISTS area_monthly_stats CASCADE');
    console.log('Dropped existing tables');

    // Recreate with correct schema
    await pool.query(`
      CREATE TABLE area_market_stats (
        id SERIAL PRIMARY KEY,
        area_name VARCHAR(255) NOT NULL UNIQUE,
        area_slug VARCHAR(255),
        avg_price_sqft DECIMAL(15, 2),
        median_price_sqft DECIMAL(15, 2),
        min_price DECIMAL(18, 2),
        max_price DECIMAL(18, 2),
        avg_transaction_value DECIMAL(18, 2),
        total_transactions_6m INTEGER DEFAULT 0,
        total_transactions_12m INTEGER DEFAULT 0,
        total_volume_12m DECIMAL(22, 2),
        yoy_price_change DECIMAL(8, 2),
        mom_price_change DECIMAL(8, 2),
        top_property_type VARCHAR(100),
        avg_unit_size DECIMAL(15, 2),
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data_from_date DATE,
        data_to_date DATE
      )
    `);
    console.log('Created area_market_stats');

    await pool.query(`
      CREATE TABLE market_trends (
        id SERIAL PRIMARY KEY,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL,
        total_transactions INTEGER DEFAULT 0,
        total_volume_aed DECIMAL(22, 2),
        avg_price_sqft DECIMAL(15, 2),
        median_price_sqft DECIMAL(15, 2),
        top_area VARCHAR(255),
        top_area_transactions INTEGER,
        property_type_breakdown JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(month, year)
      )
    `);
    console.log('Created market_trends');

    await pool.query(`
      CREATE TABLE area_monthly_stats (
        id SERIAL PRIMARY KEY,
        area_name VARCHAR(255) NOT NULL,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL,
        transactions_count INTEGER DEFAULT 0,
        avg_price_sqft DECIMAL(15, 2),
        total_volume DECIMAL(22, 2),
        avg_unit_size DECIMAL(15, 2),
        villa_count INTEGER DEFAULT 0,
        apartment_count INTEGER DEFAULT 0,
        land_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(area_name, month, year)
      )
    `);
    console.log('Created area_monthly_stats');

    // Create indexes
    await pool.query('CREATE INDEX idx_area_market_stats_slug ON area_market_stats(area_slug)');
    await pool.query('CREATE INDEX idx_area_market_stats_name ON area_market_stats(area_name)');
    await pool.query('CREATE INDEX idx_market_trends_date ON market_trends(year, month)');
    await pool.query('CREATE INDEX idx_area_monthly_area ON area_monthly_stats(area_name)');
    await pool.query('CREATE INDEX idx_area_monthly_date ON area_monthly_stats(year, month)');
    console.log('Created indexes');

    console.log('✅ Tables fixed successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

fixTables();
