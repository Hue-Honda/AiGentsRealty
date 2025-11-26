import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const { Pool } = pg;

async function importDataToSupabase() {
  console.log('\n🚀 Importing data to Supabase...\n');

  if (!process.env.DATABASE_URL) {
    console.log('❌ No DATABASE_URL found in .env file');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('📡 Connecting to Supabase...');
    const client = await pool.connect();
    console.log('✅ Connected successfully!\n');

    // Read and clean the data.sql file
    console.log('📄 Reading data.sql file...');
    let dataSql = fs.readFileSync('backup/data.sql', 'utf8');

    // Remove pg_dump security tokens and commands
    const lines = dataSql.split('\n');
    const cleanedLines = lines.filter((line, index) => {
      // Skip \restrict and \unrestrict lines
      if (line.trim().startsWith('\\restrict') || line.trim().startsWith('\\unrestrict')) {
        console.log(`⚠️  Skipping line ${index + 1}: ${line.substring(0, 50)}...`);
        return false;
      }
      return true;
    });

    dataSql = cleanedLines.join('\n');
    console.log('✅ SQL file cleaned\n');

    // Begin transaction
    console.log('🔄 Starting transaction...');
    await client.query('BEGIN');

    try {
      // Import data
      console.log('📥 Importing data...');
      await client.query(dataSql);

      // Commit transaction
      await client.query('COMMIT');
      console.log('✅ Data imported successfully!\n');

      // Verify the import
      console.log('🔍 Verifying import...');

      const areasCount = await client.query('SELECT COUNT(*) FROM areas');
      console.log(`  ✓ Areas: ${areasCount.rows[0].count} rows`);

      const developersCount = await client.query('SELECT COUNT(*) FROM developers');
      console.log(`  ✓ Developers: ${developersCount.rows[0].count} rows`);

      const projectsCount = await client.query('SELECT COUNT(*) FROM projects');
      console.log(`  ✓ Projects: ${projectsCount.rows[0].count} rows`);

      // Show sample projects
      console.log('\n📦 Sample projects:');
      const sampleProjects = await client.query('SELECT id, name, location, price_from FROM projects LIMIT 3');
      sampleProjects.rows.forEach(project => {
        console.log(`  - ${project.name} (${project.location}) - ${project.price_from}`);
      });

    } catch (error) {
      // Rollback on error
      await client.query('ROLLBACK');
      throw error;
    }

    client.release();
    await pool.end();

    console.log('\n✅ Import completed successfully!\n');
    console.log('Next steps:');
    console.log('1. Restart your backend server to connect to Supabase');
    console.log('2. Open http://localhost:3000 to see your projects\n');

  } catch (error) {
    console.error('\n❌ Import failed:');
    console.error(error.message);
    console.log('\n💡 Make sure your DATABASE_URL is correct and Supabase is accessible\n');
    process.exit(1);
  }
}

importDataToSupabase();
