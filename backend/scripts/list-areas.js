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

async function listAreas() {
  const result = await pool.query('SELECT name FROM areas ORDER BY name');
  console.log(`Total: ${result.rows.length} areas\n`);
  result.rows.forEach((row, i) => console.log(`${(i+1).toString().padStart(3)}. ${row.name}`));
  await pool.end();
}

listAreas();
