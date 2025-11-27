-- Setup pgvector for semantic search in AiGentsRealty
-- Run this once to enable vector search for 100k+ properties

-- Step 1: Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Step 2: Add embedding column to projects table (1536 dimensions for OpenAI embeddings)
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Step 3: Add embedding column to areas table
ALTER TABLE areas
ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Step 4: Create HNSW index for fast vector search (best for 100k+ records)
CREATE INDEX IF NOT EXISTS idx_projects_embedding
ON projects USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_areas_embedding
ON areas USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Step 5: Create hybrid search function
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

-- Step 6: Create area search function
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
