import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Area images mapping (popular areas get specific images)
const areaImages = {
  'business-bay': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
  'palm-jumeirah': 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200',
  'dubai-marina': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
  'marsa-dubai': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
  'downtown-dubai': 'https://images.unsplash.com/photo-1546412414-e1885e51148b?w=1200',
  'burj-khalifa': 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200',
  'jumeirah': 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200',
  'al-barsha': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
  'mirdif': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
  'dubai-hills': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
  'arabian-ranches': 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200',
  'jvc': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
  'default': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200'
};

// Area descriptions based on characteristics
function generateDescription(areaName, stats) {
  const avgPrice = Number(stats.avg_price_sqft);
  const transactions = stats.total_transactions_12m;
  const topType = stats.top_property_type;

  let priceCategory = 'affordable';
  if (avgPrice > 25000) priceCategory = 'premium luxury';
  else if (avgPrice > 18000) priceCategory = 'upscale';
  else if (avgPrice > 12000) priceCategory = 'mid-range';

  let activity = 'moderate';
  if (transactions > 10000) activity = 'highly active';
  else if (transactions > 5000) activity = 'very active';
  else if (transactions > 2000) activity = 'active';

  const typeDesc = topType === 'Villa' ? 'villas and townhouses' :
                   topType === 'Land' ? 'land plots and development opportunities' :
                   'apartments and residential units';

  return `${areaName} is a ${priceCategory} area in Dubai, known for its ${typeDesc}. ` +
         `With ${transactions.toLocaleString()} transactions in the past year, it's an ${activity} market. ` +
         `Average price: AED ${avgPrice.toLocaleString()}/sqft.`;
}

function getImageForArea(slug) {
  // Check for exact match
  if (areaImages[slug]) return areaImages[slug];

  // Check for partial match
  for (const [key, url] of Object.entries(areaImages)) {
    if (slug.includes(key) || key.includes(slug)) return url;
  }

  return areaImages.default;
}

async function syncAreas() {
  console.log('🔄 Syncing areas from market stats...\n');

  try {
    // Get all areas from market stats
    const marketAreas = await pool.query(`
      SELECT area_name, area_slug, avg_price_sqft, median_price_sqft,
             total_transactions_6m, total_transactions_12m, top_property_type,
             avg_transaction_value
      FROM area_market_stats
      ORDER BY total_transactions_12m DESC
    `);

    console.log(`📊 Found ${marketAreas.rows.length} areas in market stats\n`);

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const stats of marketAreas.rows) {
      const slug = stats.area_slug;
      const name = stats.area_name;

      // Calculate starting price (use avg transaction / 2 as rough estimate for entry price)
      const avgTx = Number(stats.avg_transaction_value) || 0;
      let startingPrice = 'Contact for Price';
      if (avgTx > 0) {
        const entryPrice = avgTx * 0.5; // Estimate entry at 50% of avg
        if (entryPrice >= 1000000) {
          startingPrice = `AED ${(entryPrice / 1000000).toFixed(1)}M`;
        } else {
          startingPrice = `AED ${(entryPrice / 1000).toFixed(0)}K`;
        }
      }

      const image = getImageForArea(slug);
      const description = generateDescription(name, stats);

      // Check if area exists
      const existing = await pool.query(
        'SELECT id, slug FROM areas WHERE slug = $1',
        [slug]
      );

      if (existing.rows.length > 0) {
        // Update existing area with better data
        await pool.query(`
          UPDATE areas
          SET description = $1,
              starting_price = $2,
              updated_at = NOW()
          WHERE slug = $3
        `, [description, startingPrice, slug]);
        updated++;
      } else {
        // Create new area
        await pool.query(`
          INSERT INTO areas (slug, name, image, starting_price, project_count, description)
          VALUES ($1, $2, $3, $4, 0, $5)
        `, [slug, name, image, startingPrice, description]);
        created++;
      }
    }

    console.log(`✅ Sync complete!`);
    console.log(`   Created: ${created} new areas`);
    console.log(`   Updated: ${updated} existing areas`);
    console.log(`   Total: ${marketAreas.rows.length} areas in database\n`);

    // Show top 10 areas
    const topAreas = await pool.query(`
      SELECT a.name, a.slug, a.starting_price, m.total_transactions_12m, m.avg_price_sqft
      FROM areas a
      JOIN area_market_stats m ON a.slug = m.area_slug
      ORDER BY m.total_transactions_12m DESC
      LIMIT 10
    `);

    console.log('📈 Top 10 Areas by Activity:');
    console.log('─'.repeat(70));
    topAreas.rows.forEach((area, i) => {
      console.log(`${i + 1}. ${area.name.padEnd(35)} ${area.total_transactions_12m.toLocaleString().padStart(8)} tx  AED ${Number(area.avg_price_sqft).toLocaleString(undefined, {maximumFractionDigits: 0})}/sqft`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

syncAreas();
