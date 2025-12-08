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

// Areas that were incorrectly skipped - add with exact match check
const areasToAdd = [
  { name: 'Jumeirah Village Triangle', slug: 'jumeirah-village-triangle', description: 'Family-friendly community with villas and apartments, known as JVT.' },
  { name: 'Dubai Sports City', slug: 'dubai-sports-city', description: 'Sports-themed community with world-class facilities and residential options.' },
  { name: 'Dubai Production City', slug: 'dubai-production-city', description: 'Mixed-use development formerly known as IMPZ.' },
  { name: 'City of Arabia', slug: 'city-of-arabia', description: 'Large-scale development in Dubailand featuring themed attractions.' },
  { name: 'Dubai Studio City', slug: 'dubai-studio-city', description: 'Media production hub with residential apartments.' },
  { name: 'Dubai Land Residence Complex', slug: 'dubai-land-residence-complex', description: 'Residential community in Dubailand with affordable options.' },
  { name: 'Dubai Silicon Oasis', slug: 'dubai-silicon-oasis', description: 'Tech hub with integrated residential and commercial spaces.' },
  { name: 'Dubai Industrial City', slug: 'dubai-industrial-city', description: 'Industrial zone with some residential developments.' },
  { name: 'Town Square Dubai', slug: 'town-square-dubai', description: 'Affordable community by Nshama with parks and retail.' },
  { name: 'Jumeirah Golf Estates', slug: 'jumeirah-golf-estates', description: 'Premium golf community with championship courses.' },
  { name: 'International City', slug: 'international-city', description: 'Themed residential community with affordable options.' },
  { name: 'The Springs', slug: 'the-springs', description: 'Villa community by Emaar near Emirates Hills.' },
  { name: 'The Meadows', slug: 'the-meadows', description: 'Villa community by Emaar with lake views.' },
  { name: 'The Lakes', slug: 'the-lakes', description: 'Villa community by Emaar around scenic lakes.' },
  { name: 'Living Legends', slug: 'living-legends', description: 'Luxury villa development in Dubailand.' },
  { name: 'Dubai Waterfront', slug: 'dubai-waterfront', description: 'Waterfront development by Nakheel.' },
  { name: 'Jumeirah Heights', slug: 'jumeirah-heights', description: 'Low-rise villa and townhouse community in JLT area.' },
  { name: 'Al Sufouh', slug: 'al-sufouh', description: 'Upscale area near Dubai Marina and Knowledge Village.' },
  { name: 'DAMAC Hills 2', slug: 'damac-hills-2', description: 'Affordable golf community by DAMAC Properties.' },
  { name: 'Dubai Golf City', slug: 'dubai-golf-city', description: 'Golf-themed community with lagoon living.' },
  { name: 'Barsha Heights', slug: 'barsha-heights', description: 'High-rise community formerly known as TECOM.' },
  { name: 'Al Khail Heights', slug: 'al-khail-heights', description: 'Residential community near Al Quoz.' }
];

async function addMissingAreas() {
  console.log('🏘️ Adding missing areas with exact match check...\n');

  let added = 0;
  let skipped = 0;

  for (const area of areasToAdd) {
    try {
      // Check if area exists with EXACT name match
      const existing = await pool.query(
        `SELECT id, name FROM areas WHERE LOWER(name) = LOWER($1)`,
        [area.name]
      );

      if (existing.rows.length > 0) {
        console.log(`  ⏭️ Exists: ${area.name}`);
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
