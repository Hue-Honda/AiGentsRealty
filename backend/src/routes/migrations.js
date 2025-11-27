import express from 'express';
import { query } from '../config/database.js';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate embedding for text using OpenAI
async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

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

// Seed more Dubai off-plan data
router.get('/seed-data', async (req, res) => {
  try {
    const results = [];

    // Add more developers
    results.push('Adding developers...');
    const developers = [
      { name: 'Sobha Realty', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3627?w=200&h=200&fit=crop', description: 'Premium quality developer known for Sobha Hartland and luxury villas.' },
      { name: 'Meraas', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3628?w=200&h=200&fit=crop', description: 'Lifestyle developer behind City Walk, Bluewaters, and La Mer.' },
      { name: 'Ellington Properties', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3629?w=200&h=200&fit=crop', description: 'Boutique developer focused on design-led residences.' },
      { name: 'Binghatti', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3630?w=200&h=200&fit=crop', description: 'Known for iconic architecture and Jacob & Co partnership.' },
      { name: 'Azizi Developments', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3631?w=200&h=200&fit=crop', description: 'Major developer in Dubai with projects across prime locations.' },
      { name: 'Samana Developers', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3632?w=200&h=200&fit=crop', description: 'Affordable luxury with private pools and flexible payment plans.' },
      { name: 'Majid Al Futtaim', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3633?w=200&h=200&fit=crop', description: 'Developer of Tilal Al Ghaf and Mall of the Emirates.' },
      { name: 'Select Group', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3634?w=200&h=200&fit=crop', description: 'Award-winning developer known for Marina Gate and Six Senses.' }
    ];

    for (const dev of developers) {
      await query(`
        INSERT INTO developers (name, logo, description)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO NOTHING
      `, [dev.name, dev.logo, dev.description]);
    }
    results.push(`Added ${developers.length} developers`);

    // Add more areas
    results.push('Adding areas...');
    const areas = [
      { slug: 'emaar-beachfront', name: 'Emaar Beachfront', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop', starting_price: 'AED 1,800,000', project_count: 15, description: 'Exclusive beachfront community between JBR and Palm Jumeirah with private beach access.' },
      { slug: 'sobha-hartland', name: 'Sobha Hartland', image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop', starting_price: 'AED 1,400,000', project_count: 22, description: 'Premium waterfront community in MBR City with lush greenery and lagoons.' },
      { slug: 'damac-hills', name: 'DAMAC Hills', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop', starting_price: 'AED 1,200,000', project_count: 35, description: 'Golf community with Trump International Golf Club and Mediterranean lifestyle.' },
      { slug: 'damac-lagoons', name: 'DAMAC Lagoons', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', starting_price: 'AED 1,100,000', project_count: 28, description: 'Mediterranean-inspired community with crystal lagoons and sandy beaches.' },
      { slug: 'tilal-al-ghaf', name: 'Tilal Al Ghaf', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', starting_price: 'AED 2,800,000', project_count: 18, description: 'Lagoon community by Majid Al Futtaim with wellness-focused living.' },
      { slug: 'the-valley', name: 'The Valley', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', starting_price: 'AED 1,300,000', project_count: 25, description: 'Emaar family community along Dubai-Al Ain Road with townhouses and villas.' },
      { slug: 'dubai-islands', name: 'Dubai Islands', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop', starting_price: 'AED 2,000,000', project_count: 20, description: 'Formerly Deira Islands, a new beachfront destination by Nakheel.' },
      { slug: 'meydan', name: 'Meydan', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop', starting_price: 'AED 800,000', project_count: 40, description: 'Home to Meydan Racecourse with luxury residences and canal views.' },
      { slug: 'city-walk', name: 'City Walk', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', starting_price: 'AED 1,600,000', project_count: 12, description: 'Meraas urban lifestyle destination with boutique residences and retail.' },
      { slug: 'madinat-jumeirah-living', name: 'Madinat Jumeirah Living', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop', starting_price: 'AED 1,460,000', project_count: 8, description: 'Resort-style living near Burj Al Arab with lagoon views.' }
    ];

    for (const area of areas) {
      await query(`
        INSERT INTO areas (slug, name, image, starting_price, project_count, description)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (slug) DO NOTHING
      `, [area.slug, area.name, area.image, area.starting_price, area.project_count, area.description]);
    }
    results.push(`Added ${areas.length} areas`);

    // Get developer and area IDs
    const devResult = await query(`SELECT id, name FROM developers`);
    const areaResult = await query(`SELECT id, slug FROM areas`);
    const devMap = {};
    const areaMap = {};
    devResult.rows.forEach(d => devMap[d.name] = d.id);
    areaResult.rows.forEach(a => areaMap[a.slug] = a.id);

    // Add more projects
    results.push('Adding projects...');
    const projects = [
      // Sobha Projects
      { name: 'Sobha One', slug: 'sobha-one', developer: 'Sobha Realty', area: 'sobha-hartland', location: 'Sobha Hartland, MBR City', price_from: 'AED 1.8M', payment_plan: '60/40', completion_date: 'Q4 2026', description: 'Ultra-luxury tower with 2 sky gardens and panoramic views of Ras Al Khor Wildlife Sanctuary.', amenities: ['Infinity Pool', 'Sky Gardens', 'Gym', 'Spa', 'Concierge', 'Cinema'], unit_types: [{ type: '1BR', size: '850 sqft', price: 'AED 1.8M' }, { type: '2BR', size: '1,350 sqft', price: 'AED 2.8M' }, { type: '3BR', size: '2,100 sqft', price: 'AED 4.5M' }], images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop'] },
      { name: 'Sobha Verde', slug: 'sobha-verde', developer: 'Sobha Realty', area: 'jumeirah-village-circle', location: 'JVC', price_from: 'AED 750K', payment_plan: '80/20', completion_date: 'Q2 2025', description: 'Green-focused development with vertical gardens and sustainable design in JVC.', amenities: ['Vertical Gardens', 'Pool', 'Gym', 'Kids Play Area', 'Yoga Deck'], unit_types: [{ type: 'Studio', size: '450 sqft', price: 'AED 750K' }, { type: '1BR', size: '750 sqft', price: 'AED 1.1M' }, { type: '2BR', size: '1,100 sqft', price: 'AED 1.6M' }], images: ['https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=800&fit=crop'] },

      // Binghatti Projects
      { name: 'Binghatti Ghost', slug: 'binghatti-ghost', developer: 'Binghatti', area: 'business-bay', location: 'Business Bay', price_from: 'AED 1.2M', payment_plan: '60/40', completion_date: 'Q1 2026', description: 'Iconic architectural masterpiece with unique facade design and premium finishes.', amenities: ['Infinity Pool', 'Gym', 'Sauna', 'Business Center', 'Valet Parking'], unit_types: [{ type: '1BR', size: '800 sqft', price: 'AED 1.2M' }, { type: '2BR', size: '1,300 sqft', price: 'AED 2M' }], images: ['https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop'] },
      { name: 'Burj Binghatti Jacob & Co', slug: 'burj-binghatti-jacob-co', developer: 'Binghatti', area: 'business-bay', location: 'Business Bay', price_from: 'AED 8.2M', payment_plan: '80/20', completion_date: 'Q2 2026', description: 'Ultra-luxury branded residences with Jacob & Co interiors, the tallest residential clock tower.', amenities: ['Private Pool', 'Butler Service', 'Helipad', 'Fine Dining', 'Spa', 'Cigar Lounge'], unit_types: [{ type: '2BR', size: '2,500 sqft', price: 'AED 8.2M' }, { type: '3BR', size: '3,500 sqft', price: 'AED 15M' }, { type: 'Penthouse', size: '8,000 sqft', price: 'AED 45M' }], images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop'] },

      // DAMAC Lagoons
      { name: 'DAMAC Lagoons Malta', slug: 'damac-lagoons-malta', developer: 'DAMAC Properties', area: 'damac-lagoons', location: 'DAMAC Lagoons', price_from: 'AED 1.1M', payment_plan: '70/30', completion_date: 'Q3 2026', description: 'Mediterranean-inspired townhouses with crystal lagoon access and sandy beaches.', amenities: ['Crystal Lagoon', 'Private Beach', 'Water Sports', 'Kids Club', 'Fitness Center'], unit_types: [{ type: '4BR Villa', size: '2,400 sqft', price: 'AED 1.1M' }, { type: '5BR Villa', size: '3,200 sqft', price: 'AED 1.8M' }], images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop'] },
      { name: 'DAMAC Lagoons Venice', slug: 'damac-lagoons-venice', developer: 'DAMAC Properties', area: 'damac-lagoons', location: 'DAMAC Lagoons', price_from: 'AED 1.3M', payment_plan: '70/30', completion_date: 'Q4 2026', description: 'Venice-inspired cluster with floating villas and gondola rides through the canals.', amenities: ['Floating Villas', 'Canal Access', 'Pool', 'Gym', 'Retail Plaza'], unit_types: [{ type: '4BR Villa', size: '2,800 sqft', price: 'AED 1.3M' }, { type: '5BR Villa', size: '3,600 sqft', price: 'AED 2.1M' }], images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop'] },

      // Emaar Projects
      { name: 'The Oasis by Emaar', slug: 'the-oasis-emaar', developer: 'Emaar Properties', area: 'the-valley', location: 'The Valley', price_from: 'AED 7M', payment_plan: '80/20', completion_date: 'Q1 2028', description: 'Ultra-luxury villas surrounded by water lagoons and lush greenery, the most ambitious Emaar project.', amenities: ['Private Pool', 'Golf Course', 'Beach Club', 'Equestrian Center', 'Wellness Center'], unit_types: [{ type: '5BR Villa', size: '6,000 sqft', price: 'AED 7M' }, { type: '6BR Mansion', size: '10,000 sqft', price: 'AED 15M' }, { type: '7BR Estate', size: '15,000 sqft', price: 'AED 35M' }], images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop'] },
      { name: 'Address Residences The Bay', slug: 'address-residences-bay', developer: 'Emaar Properties', area: 'emaar-beachfront', location: 'Emaar Beachfront', price_from: 'AED 2.4M', payment_plan: '60/40', completion_date: 'Q2 2027', description: 'Branded residences with Address Hotel services, private beach, and marina views.', amenities: ['Private Beach', 'Hotel Services', 'Infinity Pool', 'Spa', 'Fine Dining', 'Concierge'], unit_types: [{ type: '1BR', size: '900 sqft', price: 'AED 2.4M' }, { type: '2BR', size: '1,500 sqft', price: 'AED 3.8M' }, { type: '3BR', size: '2,200 sqft', price: 'AED 5.5M' }], images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop'] },
      { name: 'Creek Beach Lotus', slug: 'creek-beach-lotus', developer: 'Emaar Properties', area: 'dubai-creek-harbour', location: 'Dubai Creek Harbour', price_from: 'AED 1.5M', payment_plan: '60/40', completion_date: 'Q4 2025', description: 'Waterfront apartments with direct beach access and views of Dubai Creek Tower.', amenities: ['Beach Access', 'Pool', 'Gym', 'Kids Play Area', 'Retail', 'Creek Views'], unit_types: [{ type: '1BR', size: '750 sqft', price: 'AED 1.5M' }, { type: '2BR', size: '1,200 sqft', price: 'AED 2.3M' }, { type: '3BR', size: '1,800 sqft', price: 'AED 3.5M' }], images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop'] },

      // Samana Projects (Affordable)
      { name: 'Samana Waves', slug: 'samana-waves', developer: 'Samana Developers', area: 'jumeirah-village-circle', location: 'JVC', price_from: 'AED 479K', payment_plan: '100/0', completion_date: 'Q1 2025', description: 'Affordable luxury with private pools for every unit and flexible payment plans.', amenities: ['Private Pool', 'Gym', 'Kids Area', 'BBQ Area', 'Retail'], unit_types: [{ type: 'Studio', size: '400 sqft', price: 'AED 479K' }, { type: '1BR', size: '650 sqft', price: 'AED 750K' }, { type: '2BR', size: '950 sqft', price: 'AED 1.1M' }], images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop'] },
      { name: 'Samana Skyros', slug: 'samana-skyros', developer: 'Samana Developers', area: 'dubai-south', location: 'Dubai South', price_from: 'AED 420K', payment_plan: '80/20', completion_date: 'Q2 2025', description: 'Greek-inspired architecture with private pools near Al Maktoum Airport.', amenities: ['Private Pool', 'Gym', 'Yoga Studio', 'Cinema', 'Co-working Space'], unit_types: [{ type: 'Studio', size: '380 sqft', price: 'AED 420K' }, { type: '1BR', size: '600 sqft', price: 'AED 680K' }], images: ['https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop'] },

      // Ellington Projects
      { name: 'The Portman', slug: 'the-portman', developer: 'Ellington Properties', area: 'jumeirah-village-circle', location: 'JVC', price_from: 'AED 420K', payment_plan: '70/30', completion_date: 'Q3 2025', description: 'Design-led residences with contemporary architecture and premium finishes.', amenities: ['Pool', 'Gym', 'Landscaped Gardens', 'Pet-Friendly', 'Concierge'], unit_types: [{ type: 'Studio', size: '380 sqft', price: 'AED 420K' }, { type: '1BR', size: '700 sqft', price: 'AED 780K' }, { type: '2BR', size: '1,100 sqft', price: 'AED 1.2M' }], images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop'] },
      { name: 'Belgravia Heights II', slug: 'belgravia-heights-2', developer: 'Ellington Properties', area: 'jumeirah-village-circle', location: 'JVC', price_from: 'AED 650K', payment_plan: '60/40', completion_date: 'Q1 2026', description: 'British-inspired residences with elegant interiors and landscaped gardens.', amenities: ['Pool', 'Gym', 'Kids Play Area', 'BBQ Area', 'Jogging Track'], unit_types: [{ type: '1BR', size: '750 sqft', price: 'AED 650K' }, { type: '2BR', size: '1,200 sqft', price: 'AED 1.1M' }], images: ['https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=800&fit=crop'] },

      // Azizi Projects
      { name: 'Azizi Venice', slug: 'azizi-venice', developer: 'Azizi Developments', area: 'meydan', location: 'Dubai South', price_from: 'AED 550K', payment_plan: '60/40', completion_date: 'Q2 2025', description: 'Venice-inspired mega development with 100+ buildings and 5km crystal lagoon.', amenities: ['Crystal Lagoon', 'Retail', 'Hotels', 'Parks', 'Schools', 'Healthcare'], unit_types: [{ type: 'Studio', size: '400 sqft', price: 'AED 550K' }, { type: '1BR', size: '700 sqft', price: 'AED 850K' }, { type: '2BR', size: '1,000 sqft', price: 'AED 1.2M' }], images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop'] },
      { name: 'Azizi Riviera', slug: 'azizi-riviera', developer: 'Azizi Developments', area: 'meydan', location: 'Meydan One', price_from: 'AED 500K', payment_plan: '50/50', completion_date: 'Ready', description: 'French-Mediterranean residences with waterfront promenade and retail.', amenities: ['Pool', 'Gym', 'Retail Promenade', 'Restaurants', 'Kids Area'], unit_types: [{ type: 'Studio', size: '350 sqft', price: 'AED 500K' }, { type: '1BR', size: '650 sqft', price: 'AED 780K' }, { type: '2BR', size: '950 sqft', price: 'AED 1.1M' }], images: ['https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200&h=800&fit=crop'] },

      // Meraas Projects
      { name: 'Seapoint by Meraas', slug: 'seapoint-meraas', developer: 'Meraas', area: 'emaar-beachfront', location: 'Emaar Beachfront', price_from: 'AED 1.9M', payment_plan: '60/40', completion_date: 'Q4 2026', description: 'Waterfront residences with direct beach access and stunning sea views.', amenities: ['Beach Access', 'Infinity Pool', 'Gym', 'Spa', 'Kids Club', 'Concierge'], unit_types: [{ type: '1BR', size: '850 sqft', price: 'AED 1.9M' }, { type: '2BR', size: '1,400 sqft', price: 'AED 3.2M' }, { type: '3BR', size: '2,000 sqft', price: 'AED 4.8M' }], images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop'] },
      { name: 'Madinat Jumeirah Living', slug: 'mjl-apartments', developer: 'Meraas', area: 'madinat-jumeirah-living', location: 'Madinat Jumeirah Living', price_from: 'AED 1.46M', payment_plan: '60/40', completion_date: 'Q2 2025', description: 'Resort-style apartments with lagoon views and Burj Al Arab backdrop.', amenities: ['Lagoon Views', 'Pool', 'Gym', 'Beach Access', 'Retail', 'Fine Dining'], unit_types: [{ type: '1BR', size: '800 sqft', price: 'AED 1.46M' }, { type: '2BR', size: '1,300 sqft', price: 'AED 2.3M' }, { type: '3BR', size: '1,900 sqft', price: 'AED 3.5M' }], images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop'] },

      // Tilal Al Ghaf Projects
      { name: 'Harmony Villas', slug: 'harmony-villas', developer: 'Majid Al Futtaim', area: 'tilal-al-ghaf', location: 'Tilal Al Ghaf', price_from: 'AED 2.8M', payment_plan: '75/25', completion_date: 'Q3 2026', description: 'Family villas with lagoon access and wellness-focused community amenities.', amenities: ['Lagoon Access', 'Private Garden', 'Community Pool', 'Gym', 'Kids Play Area', 'Sports Courts'], unit_types: [{ type: '3BR Villa', size: '3,200 sqft', price: 'AED 2.8M' }, { type: '4BR Villa', size: '4,000 sqft', price: 'AED 3.8M' }, { type: '5BR Villa', size: '5,500 sqft', price: 'AED 5.5M' }], images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop'] },
      { name: 'Serenity Mansions', slug: 'serenity-mansions', developer: 'Majid Al Futtaim', area: 'tilal-al-ghaf', location: 'Tilal Al Ghaf', price_from: 'AED 8M', payment_plan: '70/30', completion_date: 'Q1 2027', description: 'Ultra-luxury waterfront mansions with private beach and boat dock.', amenities: ['Private Beach', 'Boat Dock', 'Home Automation', 'Private Pool', 'Staff Quarters', 'Cinema Room'], unit_types: [{ type: '5BR Mansion', size: '8,000 sqft', price: 'AED 8M' }, { type: '6BR Mansion', size: '12,000 sqft', price: 'AED 15M' }], images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop'] }
    ];

    for (const proj of projects) {
      const developerId = devMap[proj.developer];
      const areaId = areaMap[proj.area];

      if (!developerId || !areaId) {
        results.push(`Skipped ${proj.name} - missing developer or area`);
        continue;
      }

      await query(`
        INSERT INTO projects (name, slug, developer_id, area_id, location, price_from, starting_price, payment_plan, completion_date, handover, status, description, amenities, unit_types, images, bedrooms, bathrooms, sqft, match_score)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        ON CONFLICT (slug) DO UPDATE SET
          price_from = EXCLUDED.price_from,
          description = EXCLUDED.description,
          amenities = EXCLUDED.amenities,
          unit_types = EXCLUDED.unit_types
      `, [
        proj.name, proj.slug, developerId, areaId, proj.location, proj.price_from, proj.price_from,
        proj.payment_plan, proj.completion_date, proj.completion_date, 'Off Plan', proj.description,
        proj.amenities, JSON.stringify(proj.unit_types), proj.images,
        parseInt(proj.unit_types[proj.unit_types.length - 1]?.type?.match(/\d+/)?.[0] || '3'),
        parseInt(proj.unit_types[proj.unit_types.length - 1]?.type?.match(/\d+/)?.[0] || '3') + 1,
        parseInt(proj.unit_types[proj.unit_types.length - 1]?.size?.replace(/[^0-9]/g, '') || '2000'),
        Math.floor(Math.random() * 20) + 75
      ]);
    }
    results.push(`Added ${projects.length} projects`);

    // Get final counts
    const counts = await query(`
      SELECT
        (SELECT COUNT(*) FROM developers) as developers,
        (SELECT COUNT(*) FROM areas) as areas,
        (SELECT COUNT(*) FROM projects) as projects
    `);

    res.json({
      success: true,
      message: 'Data seeded successfully!',
      steps: results,
      totals: counts.rows[0]
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
});

// Generate embeddings for all projects and areas
router.get('/generate-embeddings', async (req, res) => {
  try {
    const results = [];

    // Get all projects without embeddings
    const projectsResult = await query(`
      SELECT id, name, location, description, amenities, price_from
      FROM projects WHERE embedding IS NULL
    `);

    results.push(`Found ${projectsResult.rows.length} projects to embed`);

    for (const proj of projectsResult.rows) {
      const text = `${proj.name} in ${proj.location}. ${proj.description}. Amenities: ${(proj.amenities || []).join(', ')}. Starting from ${proj.price_from}.`;
      const embedding = await generateEmbedding(text);

      await query(`UPDATE projects SET embedding = $1 WHERE id = $2`, [`[${embedding.join(',')}]`, proj.id]);
      results.push(`Embedded: ${proj.name}`);
    }

    // Get all areas without embeddings
    const areasResult = await query(`
      SELECT id, name, description, starting_price
      FROM areas WHERE embedding IS NULL
    `);

    results.push(`Found ${areasResult.rows.length} areas to embed`);

    for (const area of areasResult.rows) {
      const text = `${area.name} Dubai. ${area.description}. Properties starting from ${area.starting_price}.`;
      const embedding = await generateEmbedding(text);

      await query(`UPDATE areas SET embedding = $1 WHERE id = $2`, [`[${embedding.join(',')}]`, area.id]);
      results.push(`Embedded: ${area.name}`);
    }

    // Count embedded
    const embeddedCount = await query(`
      SELECT
        (SELECT COUNT(*) FROM projects WHERE embedding IS NOT NULL) as projects,
        (SELECT COUNT(*) FROM areas WHERE embedding IS NOT NULL) as areas
    `);

    res.json({
      success: true,
      message: 'Embeddings generated!',
      steps: results,
      embedded: embeddedCount.rows[0]
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
});

export default router;
