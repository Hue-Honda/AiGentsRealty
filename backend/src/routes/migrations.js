import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Setup pgvector for semantic search
router.get('/setup-pgvector', async (req, res) => {
  try {
    const results = [];

    // Step 1: Enable pgvector extension
    results.push('Enabling pgvector extension...');
    await query(`CREATE EXTENSION IF NOT EXISTS vector;`);
    results.push('pgvector extension enabled');

    // Step 2: Add embedding column to projects
    results.push('Adding embedding column to projects...');
    await query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS embedding vector(1536);`);
    results.push('Embedding column added to projects');

    // Step 3: Add embedding column to areas
    results.push('Adding embedding column to areas...');
    await query(`ALTER TABLE areas ADD COLUMN IF NOT EXISTS embedding vector(1536);`);
    results.push('Embedding column added to areas');

    // Step 4: Create HNSW indexes for fast 100k+ search
    results.push('Creating HNSW index for projects...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_projects_embedding
      ON projects USING hnsw (embedding vector_cosine_ops)
      WITH (m = 16, ef_construction = 64);
    `);
    results.push('Creating HNSW index for areas...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_areas_embedding
      ON areas USING hnsw (embedding vector_cosine_ops)
      WITH (m = 16, ef_construction = 64);
    `);
    results.push('HNSW indexes created');

    // Step 5: Create search_properties function
    results.push('Creating search_properties function...');
    await query(`
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
          p.id, p.name, p.slug, p.location, p.description,
          p.price_from, p.payment_plan, p.completion_date, p.status,
          p.images, p.unit_types, p.amenities,
          d.name as developer_name, a.name as area_name, a.slug as area_slug,
          1 - (p.embedding <=> query_embedding) as similarity
        FROM projects p
        LEFT JOIN developers d ON p.developer_id = d.id
        LEFT JOIN areas a ON p.area_id = a.id
        WHERE p.embedding IS NOT NULL
          AND (filter_bedrooms IS NULL OR p.unit_types::text ILIKE '%' || filter_bedrooms || '%')
          AND (filter_type IS NULL OR p.description ILIKE '%' || filter_type || '%')
          AND (filter_area_id IS NULL OR p.area_id = filter_area_id)
          AND (filter_developer_id IS NULL OR p.developer_id = filter_developer_id)
        ORDER BY p.embedding <=> query_embedding
        LIMIT match_count;
      END;
      $$;
    `);
    results.push('search_properties function created');

    // Step 6: Create search_areas function
    results.push('Creating search_areas function...');
    await query(`
      CREATE OR REPLACE FUNCTION search_areas(
        query_embedding vector(1536),
        match_count int DEFAULT 5
      )
      RETURNS TABLE (id int, name varchar, slug varchar, description text, similarity float)
      LANGUAGE plpgsql
      AS $$
      BEGIN
        RETURN QUERY
        SELECT a.id, a.name, a.slug, a.description,
          1 - (a.embedding <=> query_embedding) as similarity
        FROM areas a
        WHERE a.embedding IS NOT NULL
        ORDER BY a.embedding <=> query_embedding
        LIMIT match_count;
      END;
      $$;
    `);
    results.push('search_areas function created');

    // Verify
    const extCheck = await query(`SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';`);
    const colCheck = await query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'embedding';`);

    res.json({
      success: true,
      message: 'pgvector setup complete!',
      steps: results,
      verification: {
        extension: extCheck.rows[0],
        embedding_column: colCheck.rows[0]
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      hint: 'If vector extension fails, enable it in Supabase Dashboard > Database > Extensions'
    });
  }
});

export default router;
