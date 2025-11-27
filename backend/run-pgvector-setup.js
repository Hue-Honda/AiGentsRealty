// Run pgvector setup for semantic search
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function setupPgVector() {
  const client = await pool.connect();

  try {
    console.log('🚀 Setting up pgvector for semantic search...\n');

    // Step 1: Enable pgvector extension
    console.log('1️⃣ Enabling pgvector extension...');
    await client.query(`CREATE EXTENSION IF NOT EXISTS vector;`);
    console.log('   ✅ pgvector extension enabled\n');

    // Step 2: Add embedding column to projects
    console.log('2️⃣ Adding embedding column to projects table...');
    await client.query(`
      ALTER TABLE projects
      ADD COLUMN IF NOT EXISTS embedding vector(1536);
    `);
    console.log('   ✅ Embedding column added to projects\n');

    // Step 3: Add embedding column to areas
    console.log('3️⃣ Adding embedding column to areas table...');
    await client.query(`
      ALTER TABLE areas
      ADD COLUMN IF NOT EXISTS embedding vector(1536);
    `);
    console.log('   ✅ Embedding column added to areas\n');

    // Step 4: Create HNSW indexes
    console.log('4️⃣ Creating HNSW indexes for fast vector search...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_projects_embedding
      ON projects USING hnsw (embedding vector_cosine_ops)
      WITH (m = 16, ef_construction = 64);
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_areas_embedding
      ON areas USING hnsw (embedding vector_cosine_ops)
      WITH (m = 16, ef_construction = 64);
    `);
    console.log('   ✅ HNSW indexes created\n');

    // Step 5: Create search_properties function
    console.log('5️⃣ Creating search_properties function...');
    await client.query(`
      CREATE OR REPLACE FUNCTION search_properties(
        query_embedding vector(1536),
        filter_bedrooms text DEFAULT NULL,
        filter_type text DEFAULT NULL,
        filter_max_price numeric DEFAULT NULL,
        filter_area_id int DEFAULT NULL,
        filter_developer_id int DEFAULT NULL,
        match_count int DEFAULT 10
      )
      RETURNS TABLE (
        id int,
        name varchar,
        slug varchar,
        location varchar,
        description text,
        price_from varchar,
        payment_plan varchar,
        completion_date varchar,
        status varchar,
        images text[],
        unit_types jsonb,
        amenities text[],
        developer_name varchar,
        area_name varchar,
        area_slug varchar,
        similarity float
      )
      LANGUAGE plpgsql
      AS $$
      BEGIN
        RETURN QUERY
        SELECT
          p.id,
          p.name,
          p.slug,
          p.location,
          p.description,
          p.price_from,
          p.payment_plan,
          p.completion_date,
          p.status,
          p.images,
          p.unit_types,
          p.amenities,
          d.name as developer_name,
          a.name as area_name,
          a.slug as area_slug,
          1 - (p.embedding <=> query_embedding) as similarity
        FROM projects p
        LEFT JOIN developers d ON p.developer_id = d.id
        LEFT JOIN areas a ON p.area_id = a.id
        WHERE
          p.embedding IS NOT NULL
          AND (filter_bedrooms IS NULL OR p.unit_types::text ILIKE '%' || filter_bedrooms || '%')
          AND (filter_type IS NULL OR p.description ILIKE '%' || filter_type || '%')
          AND (filter_area_id IS NULL OR p.area_id = filter_area_id)
          AND (filter_developer_id IS NULL OR p.developer_id = filter_developer_id)
        ORDER BY p.embedding <=> query_embedding
        LIMIT match_count;
      END;
      $$;
    `);
    console.log('   ✅ search_properties function created\n');

    // Step 6: Create search_areas function
    console.log('6️⃣ Creating search_areas function...');
    await client.query(`
      CREATE OR REPLACE FUNCTION search_areas(
        query_embedding vector(1536),
        match_count int DEFAULT 5
      )
      RETURNS TABLE (
        id int,
        name varchar,
        slug varchar,
        description text,
        similarity float
      )
      LANGUAGE plpgsql
      AS $$
      BEGIN
        RETURN QUERY
        SELECT
          a.id,
          a.name,
          a.slug,
          a.description,
          1 - (a.embedding <=> query_embedding) as similarity
        FROM areas a
        WHERE a.embedding IS NOT NULL
        ORDER BY a.embedding <=> query_embedding
        LIMIT match_count;
      END;
      $$;
    `);
    console.log('   ✅ search_areas function created\n');

    // Verify setup
    console.log('7️⃣ Verifying setup...');
    const extResult = await client.query(`
      SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';
    `);
    const colResult = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'projects' AND column_name = 'embedding';
    `);

    console.log('   Extension:', extResult.rows[0]);
    console.log('   Column:', colResult.rows[0]);

    console.log('\n✅ pgvector setup complete!');
    console.log('\n📋 Summary:');
    console.log('   - vector extension enabled');
    console.log('   - embedding column added to projects (1536 dimensions)');
    console.log('   - embedding column added to areas (1536 dimensions)');
    console.log('   - HNSW indexes created for fast 100k+ search');
    console.log('   - search_properties() function ready');
    console.log('   - search_areas() function ready');
    console.log('\n🔜 Next step: Generate embeddings for your properties');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('extension "vector" is not available')) {
      console.log('\n💡 Hint: Enable pgvector in Supabase Dashboard:');
      console.log('   1. Go to Database > Extensions');
      console.log('   2. Search for "vector"');
      console.log('   3. Click Enable');
    }
  } finally {
    client.release();
    await pool.end();
  }
}

setupPgVector();
