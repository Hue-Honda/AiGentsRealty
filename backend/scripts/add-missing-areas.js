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

// Areas found on fäm Properties that might be missing
const areasToCheck = [
  // From off-plan listings
  { name: 'Jumeirah Village Triangle', slug: 'jumeirah-village-triangle', description: 'Family-friendly community with villas and apartments, known as JVT.' },
  { name: 'Dubai Sports City', slug: 'dubai-sports-city', description: 'Sports-themed community with world-class facilities and residential options.' },
  { name: 'JLT - Jumeirah Lake Towers', slug: 'jumeirah-lake-towers', description: 'Waterfront community with high-rise towers around scenic lakes.' },
  { name: 'Majan', slug: 'majan', description: 'Emerging residential community in Dubailand.' },
  { name: 'Dubai Production City', slug: 'dubai-production-city', description: 'Mixed-use development formerly known as IMPZ.' },
  { name: 'City of Arabia', slug: 'city-of-arabia', description: 'Large-scale development in Dubailand.' },
  { name: 'Arjan', slug: 'arjan', description: 'Affordable residential community in Al Barsha South.' },
  { name: 'Dubai Studio City', slug: 'dubai-studio-city', description: 'Media-focused community with residential areas.' },
  { name: 'Dubai Land Residence Complex', slug: 'dubai-land-residence-complex', description: 'Residential community in Dubailand.' },
  { name: 'DAMAC Hills 2', slug: 'damac-hills-2', description: 'Affordable golf community by DAMAC Properties.' },
  { name: 'Dubai Golf City', slug: 'dubai-golf-city', description: 'Golf-themed community with lagoon living.' },
  { name: 'Dubai Silicon Oasis', slug: 'dubai-silicon-oasis', description: 'Tech hub with integrated residential and commercial spaces.' },
  { name: 'Barsha Heights', slug: 'barsha-heights', description: 'High-rise community formerly known as TECOM.' },
  { name: 'Al Khail Heights', slug: 'al-khail-heights', description: 'Residential community near Al Quoz.' },
  { name: 'Dubai Industrial City', slug: 'dubai-industrial-city', description: 'Industrial zone with some residential developments.' },
  { name: 'Mohammed Bin Rashid City', slug: 'mohammed-bin-rashid-city', description: 'Mega development with District One and other communities.' },
  { name: 'Dubailand', slug: 'dubailand', description: 'Large entertainment and residential development.' },
  { name: 'Town Square Dubai', slug: 'town-square-dubai', description: 'Affordable community by Nshama with parks and retail.' },
  { name: 'Jumeirah Golf Estates', slug: 'jumeirah-golf-estates', description: 'Premium golf community with championship courses.' },
  { name: 'Motor City', slug: 'motor-city', description: 'Motorsport-themed community with residential areas.' },
  { name: 'Green Community', slug: 'green-community', description: 'Eco-friendly villa community in DIP.' },
  { name: 'Discovery Gardens', slug: 'discovery-gardens', description: 'Affordable apartment community near Ibn Battuta.' },
  { name: 'International City', slug: 'international-city', description: 'Themed residential community with affordable options.' },
  { name: 'Remraam', slug: 'remraam', description: 'Affordable community in Dubailand by Dubai Properties.' },
  { name: 'Liwan', slug: 'liwan', description: 'Residential community in Dubailand.' },
  { name: 'Mudon', slug: 'mudon', description: 'Family-focused community by Dubai Properties.' },
  { name: 'Serena', slug: 'serena', description: 'Spanish-inspired townhouse community in Dubailand.' },
  { name: 'Reem', slug: 'reem', description: 'Townhouse community in Arabian Ranches area.' },
  { name: 'The Springs', slug: 'the-springs', description: 'Villa community by Emaar near Emirates Hills.' },
  { name: 'The Meadows', slug: 'the-meadows', description: 'Villa community by Emaar with lake views.' },
  { name: 'The Lakes', slug: 'the-lakes', description: 'Villa community by Emaar around scenic lakes.' },
  { name: 'Emirates Hills', slug: 'emirates-hills', description: 'Ultra-luxury villa community often called Beverly Hills of Dubai.' },
  { name: 'Victory Heights', slug: 'victory-heights', description: 'Villa community in Dubai Sports City.' },
  { name: 'Falcon City of Wonders', slug: 'falcon-city-of-wonders', description: 'Themed development in Dubailand.' },
  { name: 'Akoya Oxygen', slug: 'akoya-oxygen', description: 'Green golf community by DAMAC.' },
  { name: 'Living Legends', slug: 'living-legends', description: 'Luxury development in Dubailand.' },
  { name: 'Dubai Waterfront', slug: 'dubai-waterfront', description: 'Waterfront development by Nakheel.' },
  { name: 'Jumeirah Heights', slug: 'jumeirah-heights', description: 'Low-rise villa and townhouse community in JLT area.' },
  { name: 'Al Sufouh', slug: 'al-sufouh', description: 'Upscale area near Dubai Marina and Knowledge Village.' },
  { name: 'Tecom', slug: 'tecom', description: 'Business and residential hub near Internet City.' },
  { name: 'Knowledge Village', slug: 'knowledge-village', description: 'Education hub with nearby residential options.' },
  { name: 'Media City', slug: 'media-city', description: 'Media hub with residential developments.' },
  { name: 'Internet City', slug: 'internet-city', description: 'Tech hub near Dubai Marina.' }
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function addMissingAreas() {
  console.log('🏘️ Checking and adding missing areas...\n');

  let added = 0;
  let skipped = 0;

  for (const area of areasToCheck) {
    try {
      // Check if area exists (by name similarity)
      const existing = await pool.query(
        `SELECT id, name FROM areas
         WHERE LOWER(name) = LOWER($1)
            OR LOWER(name) LIKE LOWER($2)
            OR slug = $3`,
        [area.name, `%${area.name.split(' ')[0]}%`, area.slug]
      );

      if (existing.rows.length > 0) {
        console.log(`  ⏭️ Exists: ${area.name} (found as: ${existing.rows[0].name})`);
        skipped++;
        continue;
      }

      // Insert new area
      await pool.query(
        `INSERT INTO areas (slug, name, image, starting_price, project_count, description)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          area.slug,
          area.name,
          'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
          'Contact for Price',
          0,
          area.description
        ]
      );

      console.log(`  ✅ Added: ${area.name}`);
      added++;
    } catch (error) {
      console.log(`  ❌ Error with ${area.name}: ${error.message}`);
    }
  }

  // Get final count
  const countResult = await pool.query('SELECT COUNT(*) as count FROM areas');

  console.log('\n📊 Summary:');
  console.log(`   Added: ${added}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total areas now: ${countResult.rows[0].count}`);

  await pool.end();
}

addMissingAreas();
