import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;

// Use Supabase connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runSeed() {
  console.log('Connecting to Supabase database...');

  try {
    // Step 1: Check existing developers and add if needed
    console.log('1. Checking developers...');

    // Check if Emaar exists (by name or slug) and get the actual ID
    const emaarCheck = await pool.query(`SELECT id, slug FROM developers WHERE slug = 'emaar' OR name ILIKE '%emaar%' LIMIT 1`);
    let emaarId;
    if (emaarCheck.rows.length === 0) {
      const result = await pool.query(`
        INSERT INTO developers (slug, name, logo, description, website) VALUES
          ('emaar', 'Emaar Properties', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200', 'Emaar Properties is a leading global property developer and provider of premium lifestyles.', 'https://www.emaar.com')
        RETURNING id
      `);
      emaarId = result.rows[0].id;
      console.log('   Added Emaar Properties (id: ' + emaarId + ')');
    } else {
      emaarId = emaarCheck.rows[0].id;
      console.log('   Emaar already exists (id: ' + emaarId + ', slug: ' + emaarCheck.rows[0].slug + ')');
    }

    // Check if DAMAC exists
    const damacCheck = await pool.query(`SELECT id, slug FROM developers WHERE slug = 'damac' OR name ILIKE '%damac%' LIMIT 1`);
    let damacId;
    if (damacCheck.rows.length === 0) {
      const result = await pool.query(`
        INSERT INTO developers (slug, name, logo, description, website) VALUES
          ('damac', 'DAMAC Properties', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200', 'DAMAC Properties is a luxury real estate developer based in Dubai, UAE.', 'https://www.damacproperties.com')
        RETURNING id
      `);
      damacId = result.rows[0].id;
      console.log('   Added DAMAC Properties (id: ' + damacId + ')');
    } else {
      damacId = damacCheck.rows[0].id;
      console.log('   DAMAC already exists (id: ' + damacId + ', slug: ' + damacCheck.rows[0].slug + ')');
    }

    console.log('   Developers ready.');

    // Step 2: Ensure areas exist
    console.log('2. Adding/updating areas...');
    await pool.query(`
      INSERT INTO areas (slug, name, image, starting_price, project_count, description) VALUES
        ('mina-rashid', 'Mina Rashid', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 1.5M', 5, 'Mina Rashid is a masterfully planned waterfront residential community at Port Rashid, Dubai.'),
        ('dubai-hills-estate', 'Dubai Hills Estate', 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200', 'AED 1.2M', 15, 'Dubai Hills Estate is a premium golf course community with world-class amenities.'),
        ('damac-hills', 'Damac Hills', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 900K', 12, 'Damac Hills features luxury villas and apartments around a Trump International Golf Club.'),
        ('business-bay', 'Business Bay', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 800K', 20, 'Business Bay is Dubai''s central business district with stunning canal views.'),
        ('dubai-south', 'Dubai South', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 500K', 8, 'Dubai South is a master-planned city near Al Maktoum International Airport and Expo site.'),
        ('jumeirah-village-circle', 'Jumeirah Village Circle', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 600K', 25, 'JVC is a family-friendly community with affordable luxury living options.'),
        ('dubai-creek-harbour', 'Dubai Creek Harbour', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 1.4M', 10, 'Dubai Creek Harbour is a waterfront development featuring the iconic Dubai Creek Tower.'),
        ('akoya-oxygen', 'AKOYA Oxygen', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 700K', 8, 'AKOYA Oxygen is an eco-friendly green community with sustainable living.'),
        ('downtown-dubai', 'Downtown Dubai', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 2.5M', 15, 'Downtown Dubai is home to Burj Khalifa, Dubai Mall, and the Dubai Fountain.'),
        ('dubai-harbour', 'Dubai Harbour', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 2M', 6, 'Dubai Harbour is a premium waterfront destination with beach access and marina views.'),
        ('arabian-ranches-3', 'Arabian Ranches 3', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 1.8M', 8, 'Arabian Ranches 3 is a family community with townhouses and villas in a desert setting.'),
        ('emaar-south', 'Emaar South', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 1M', 6, 'Emaar South offers golf course living near the Expo 2020 site.'),
        ('creek-beach', 'Creek Beach', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 1.6M', 5, 'Creek Beach offers resort-style living with direct beach access at Dubai Creek.')
      ON CONFLICT (slug) DO UPDATE SET
        image = EXCLUDED.image,
        starting_price = EXCLUDED.starting_price,
        description = EXCLUDED.description
    `);
    console.log('   Areas ready.');

    // Step 3: Insert projects
    console.log('3. Adding off-plan projects...');

    const projects = [
      {
        slug: 'emaar-sirdhana-apartments',
        name: 'Emaar Mina Rashid – Sirdhana Apartments',
        developer_id: emaarId,
        area_slug: 'mina-rashid',
        location: 'Mina Rashid, Dubai',
        price_from: 'AED 1.5M',
        payment_plan: '60/40',
        completion_date: 'Q4 2026',
        status: 'Off Plan',
        property_types: ['Apartment', 'Penthouse'],
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200'],
        description: 'A masterly planned waterfront residential community created through Emaar and DP World collaboration. Situated at Port Rashid, these waterfront residences emphasize contemporary interior design with floor-to-ceiling windows.',
        amenities: ['Gym', 'Swimming Pool', 'Private Garage', 'Community Views', 'Floor-to-ceiling Windows', 'Waterfront Living'],
        unit_types: [
          { type: '1BR', size: '750 sqft', price: 'AED 1.5M' },
          { type: '2BR', size: '1100 sqft', price: 'AED 2.2M' },
          { type: '3BR', size: '1500 sqft', price: 'AED 3.2M' },
          { type: '4BR Penthouse', size: '2500 sqft', price: 'AED 5.5M' }
        ],
        match_score: 92
      },
      {
        slug: 'emaar-park-ridge',
        name: 'Emaar Executive Residences II - Park Ridge',
        developer_id: emaarId,
        area_slug: 'dubai-hills-estate',
        location: 'Dubai Hills Estate, Dubai',
        price_from: 'AED 1.2M',
        payment_plan: '70/30',
        completion_date: 'Q2 2026',
        status: 'Off Plan',
        property_types: ['Apartment'],
        images: ['https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200'],
        description: 'Global Free Zone benefits with 3-year visa included. Premium apartments in Dubai Hills Estate with park and golf course views.',
        amenities: ['Golf Course View', 'Park View', 'Gym', 'Swimming Pool', 'Kids Play Area', '24/7 Security'],
        unit_types: [
          { type: '1BR', size: '680 sqft', price: 'AED 1.2M' },
          { type: '2BR', size: '1050 sqft', price: 'AED 1.9M' },
          { type: '3BR', size: '1450 sqft', price: 'AED 2.8M' }
        ],
        match_score: 88
      },
      {
        slug: 'damac-bella-vista',
        name: 'Bella Vista Apartments',
        developer_id: damacId,
        area_slug: 'damac-hills',
        location: 'Damac Hills, Dubai',
        price_from: 'AED 900K',
        payment_plan: '60/40',
        completion_date: 'Q3 2025',
        status: 'Off Plan',
        property_types: ['Apartment'],
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200'],
        description: 'Surrounded by spectacular green fairways and world-class amenities in Damac Hills golf community.',
        amenities: ['Golf Course View', 'Swimming Pool', 'Gym', 'Landscaped Gardens', 'Clubhouse'],
        unit_types: [
          { type: '1BR', size: '650 sqft', price: 'AED 900K' },
          { type: '2BR', size: '950 sqft', price: 'AED 1.4M' },
          { type: '3BR', size: '1300 sqft', price: 'AED 2.1M' }
        ],
        match_score: 85
      },
      {
        slug: 'damac-paramount-towers',
        name: 'Damac Towers by Paramount',
        developer_id: damacId,
        area_slug: 'business-bay',
        location: 'Business Bay, Dubai',
        price_from: 'AED 1.1M',
        payment_plan: '60/40',
        completion_date: 'Q1 2026',
        status: 'Off Plan',
        property_types: ['Apartment', 'Penthouse'],
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200'],
        description: 'Four 270-meter towers with multi-level plaza and premium dining. Branded residences by Paramount Hotels.',
        amenities: ['Infinity Pool', 'Spa', 'Gym', 'Cinema', 'Valet Parking', 'Concierge Service'],
        unit_types: [
          { type: '1BR', size: '750 sqft', price: 'AED 1.1M' },
          { type: '2BR', size: '1100 sqft', price: 'AED 1.8M' },
          { type: '3BR', size: '1600 sqft', price: 'AED 2.9M' }
        ],
        match_score: 90
      },
      {
        slug: 'emaar-creek-tower-residences',
        name: 'Creek Tower Residences',
        developer_id: emaarId,
        area_slug: 'dubai-creek-harbour',
        location: 'Dubai Creek Harbour, Dubai',
        price_from: 'AED 1.8M',
        payment_plan: '80/20',
        completion_date: 'Q4 2027',
        status: 'Off Plan',
        property_types: ['Apartment', 'Penthouse'],
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200'],
        description: 'Iconic waterfront living at Dubai Creek Harbour with views of the upcoming Dubai Creek Tower.',
        amenities: ['Waterfront', 'Infinity Pool', 'Gym', 'Spa', 'Concierge', 'Marina Access'],
        unit_types: [
          { type: '1BR', size: '800 sqft', price: 'AED 1.8M' },
          { type: '2BR', size: '1200 sqft', price: 'AED 2.8M' },
          { type: '3BR', size: '1800 sqft', price: 'AED 4.2M' }
        ],
        match_score: 94
      },
      {
        slug: 'emaar-downtown-views',
        name: 'Downtown Views',
        developer_id: emaarId,
        area_slug: 'downtown-dubai',
        location: 'Downtown Dubai, Dubai',
        price_from: 'AED 2.5M',
        payment_plan: '70/30',
        completion_date: 'Q3 2026',
        status: 'Off Plan',
        property_types: ['Apartment'],
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200'],
        description: 'Premium residences in the heart of Downtown Dubai with Burj Khalifa and Dubai Fountain views.',
        amenities: ['Burj Khalifa View', 'Fountain View', 'Infinity Pool', 'Gym', 'Spa', 'Concierge'],
        unit_types: [
          { type: '1BR', size: '850 sqft', price: 'AED 2.5M' },
          { type: '2BR', size: '1300 sqft', price: 'AED 3.8M' },
          { type: '3BR', size: '2000 sqft', price: 'AED 5.5M' }
        ],
        match_score: 96
      }
    ];

    for (const p of projects) {
      await pool.query(`
        INSERT INTO projects (slug, name, developer_id, area_id, location, price_from, payment_plan, completion_date, status, property_types, images, description, amenities, unit_types, match_score)
        VALUES (
          $1, $2, $3,
          (SELECT id FROM areas WHERE slug = $4),
          $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        )
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          developer_id = EXCLUDED.developer_id,
          price_from = EXCLUDED.price_from,
          payment_plan = EXCLUDED.payment_plan,
          completion_date = EXCLUDED.completion_date,
          property_types = EXCLUDED.property_types,
          images = EXCLUDED.images,
          description = EXCLUDED.description,
          amenities = EXCLUDED.amenities,
          unit_types = EXCLUDED.unit_types,
          match_score = EXCLUDED.match_score
      `, [
        p.slug, p.name, p.developer_id, p.area_slug,
        p.location, p.price_from, p.payment_plan, p.completion_date, p.status,
        JSON.stringify(p.property_types), JSON.stringify(p.images),
        p.description, JSON.stringify(p.amenities), JSON.stringify(p.unit_types),
        p.match_score
      ]);
      console.log(`   Added: ${p.name}`);
    }

    console.log('\nSeed completed successfully!');

    // Verify by counting projects
    const result = await pool.query('SELECT COUNT(*) FROM projects');
    console.log(`Total projects in database: ${result.rows[0].count}`);

    // Show some of the projects
    const projectList = await pool.query('SELECT name, location, price_from FROM projects ORDER BY created_at DESC LIMIT 5');
    console.log('\nLatest projects:');
    projectList.rows.forEach(proj => {
      console.log(`  - ${proj.name} (${proj.location}) - ${proj.price_from}`);
    });

  } catch (error) {
    console.error('Error running seed:', error.message);
    if (error.detail) console.error('Detail:', error.detail);
  } finally {
    await pool.end();
  }
}

runSeed();
