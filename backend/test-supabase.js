import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

async function testSupabaseConnection() {
  console.log('\n🧪 Testing Supabase Connection...\n');

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.log('❌ No DATABASE_URL found in .env file');
    console.log('\n💡 To test Supabase, add this to your backend/.env file:');
    console.log('DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres\n');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    // Test connection
    console.log('📡 Connecting to Supabase...');
    const client = await pool.connect();
    console.log('✅ Connected successfully!\n');

    // Check tables
    console.log('📋 Checking tables...');
    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log(`Found ${tablesResult.rows.length} tables:`);
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    // Check projects count
    console.log('\n🏢 Checking projects...');
    try {
      const projectsCount = await client.query('SELECT COUNT(*) FROM projects');
      console.log(`✅ Projects table exists: ${projectsCount.rows[0].count} projects found`);

      if (parseInt(projectsCount.rows[0].count) > 0) {
        const sampleProjects = await client.query('SELECT id, name, location, price_from FROM projects LIMIT 3');
        console.log('\n📦 Sample projects:');
        sampleProjects.rows.forEach(project => {
          console.log(`  - ${project.name} (${project.location}) - ${project.price_from}`);
        });
      } else {
        console.log('\n⚠️  Projects table is empty - no data in production database');
        console.log('💡 You need to migrate your local Docker data to Supabase');
      }
    } catch (err) {
      console.log('❌ Projects table does not exist');
      console.log('💡 You need to run the schema migration on Supabase');
    }

    // Check other tables
    console.log('\n📊 Checking other tables...');
    const tables = ['developers', 'areas', 'project_types'];
    for (const table of tables) {
      try {
        const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`  - ${table}: ${result.rows[0].count} rows`);
      } catch (err) {
        console.log(`  - ${table}: ❌ does not exist`);
      }
    }

    client.release();
    await pool.end();
    console.log('\n✅ Test completed!\n');

  } catch (error) {
    console.error('\n❌ Connection failed:');
    console.error(error.message);
    console.log('\n💡 Make sure your DATABASE_URL is correct and Supabase is accessible\n');
    process.exit(1);
  }
}

testSupabaseConnection();
