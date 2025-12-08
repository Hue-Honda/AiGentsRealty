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

// Comprehensive list of Dubai developers
const developers = [
  { name: 'Emaar Properties', slug: 'emaar-properties', description: 'Leading real estate developer in Dubai, known for iconic projects like Burj Khalifa, Dubai Mall, and Dubai Marina.' },
  { name: 'Nakheel', slug: 'nakheel', description: 'Master developer behind Palm Jumeirah, The World Islands, and other iconic Dubai developments.' },
  { name: 'DAMAC Properties', slug: 'damac-properties', description: 'Luxury property developer specializing in high-end residential and commercial projects across Dubai.' },
  { name: 'Dubai Properties', slug: 'dubai-properties', description: 'Major developer known for Jumeirah Beach Residence (JBR), Business Bay, and Culture Village.' },
  { name: 'Azizi Developments', slug: 'azizi-developments', description: 'Fast-growing developer with projects in Al Furjan, Palm Jumeirah, and Dubai Healthcare City.' },
  { name: 'Meraas', slug: 'meraas', description: 'Dubai-based holding company creating lifestyle destinations including City Walk, Bluewaters, and La Mer.' },
  { name: 'Sobha Realty', slug: 'sobha-realty', description: 'Premium real estate developer known for Sobha Hartland and quality craftsmanship.' },
  { name: 'Aldar Properties', slug: 'aldar-properties', description: 'Abu Dhabi-based developer expanding into Dubai with premium residential projects.' },
  { name: 'Binghatti Developers', slug: 'binghatti-developers', description: 'Innovative developer known for unique architectural designs and affordable luxury.' },
  { name: 'Ellington Properties', slug: 'ellington-properties', description: 'Boutique developer focused on design-led residential projects in prime Dubai locations.' },
  { name: 'Nshama', slug: 'nshama', description: 'Developer of Town Square Dubai, offering affordable community living.' },
  { name: 'Deyaar Development', slug: 'deyaar-development', description: 'Publicly listed developer with projects in Business Bay, Dubai Marina, and Al Barsha.' },
  { name: 'MAG Property Development', slug: 'mag-property-development', description: 'Developer known for MBL Residence and MAG City projects.' },
  { name: 'Dubai South Properties', slug: 'dubai-south-properties', description: 'Developer of the Dubai South master community near Al Maktoum International Airport.' },
  { name: 'Majid Al Futtaim', slug: 'majid-al-futtaim', description: 'Developer behind Tilal Al Ghaf and Mall of the Emirates.' },
  { name: 'Danube Properties', slug: 'danube-properties', description: 'Known for affordable luxury with flexible 1% monthly payment plans.' },
  { name: 'Meydan Group', slug: 'meydan-group', description: 'Developer of Meydan One, Mohammed Bin Rashid City, and the Meydan Racecourse.' },
  { name: 'Samana Developers', slug: 'samana-developers', description: 'Developer of boutique residential projects with private pools.' },
  { name: 'Select Group', slug: 'select-group', description: 'Developer of premium projects in Dubai Marina and JLT.' },
  { name: 'Dubai Holding', slug: 'dubai-holding', description: 'Government-owned holding company with diverse real estate portfolio including Jumeirah Group.' },
  { name: 'Al Barari', slug: 'al-barari', description: 'Ultra-luxury residential development known for green living and botanical gardens.' },
  { name: 'Omniyat', slug: 'omniyat', description: 'Luxury developer known for One Palm, Dorchester Collection, and The Opus by Zaha Hadid.' },
  { name: 'Wasl Properties', slug: 'wasl-properties', description: 'Government-owned developer with extensive portfolio across Dubai.' },
  { name: 'Jumeirah Golf Estates', slug: 'jumeirah-golf-estates', description: 'Premium golf community developer with championship courses.' },
  { name: 'Meydan Sobha', slug: 'meydan-sobha', description: 'Joint venture developing District One in Mohammed Bin Rashid City.' },
  { name: 'Imtiaz Developments', slug: 'imtiaz-developments', description: 'Developer focused on JVC and other emerging Dubai communities.' },
  { name: 'Tiger Group', slug: 'tiger-group', description: 'Developer of residential and commercial projects in Dubai and Sharjah.' },
  { name: 'Arada', slug: 'arada', description: 'Sharjah-based developer expanding with projects across UAE.' },
  { name: 'Reportage Properties', slug: 'reportage-properties', description: 'Developer of residential projects in JVC and other Dubai areas.' },
  { name: 'The First Group', slug: 'the-first-group', description: 'Developer of hotel apartments and hospitality projects.' },
  { name: 'Seven Tides', slug: 'seven-tides', description: 'Developer of waterfront projects on Palm Jumeirah.' },
  { name: 'Sobha Group', slug: 'sobha-group', description: 'Parent company of Sobha Realty with projects across GCC.' },
  { name: 'Union Properties', slug: 'union-properties', description: 'Publicly listed developer known for Motor City and DIFC Living.' },
  { name: 'Object One', slug: 'object-one', description: 'Developer of premium residential projects in Dubai.' },
  { name: 'Palma Holding', slug: 'palma-holding', description: 'Developer of residential communities in Dubai.' },
  { name: 'Vincitore Realty', slug: 'vincitore-realty', description: 'Developer of affordable luxury projects in Arjan and Dubai Science Park.' },
  { name: 'Prescott', slug: 'prescott', description: 'Developer of residential and commercial properties.' },
  { name: 'ORO24 Developments', slug: 'oro24-developments', description: 'Developer of boutique residential projects.' },
  { name: 'Pantheon Development', slug: 'pantheon-development', description: 'Developer of premium residential projects in JVC.' },
  { name: 'Signature Developers', slug: 'signature-developers', description: 'Developer of signature residential projects in Dubai.' }
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function seedDevelopers() {
  console.log('🏗️ Seeding developers...\n');

  let created = 0;
  let skipped = 0;

  for (const dev of developers) {
    try {
      // Check if developer already exists
      const existing = await pool.query(
        'SELECT id FROM developers WHERE slug = $1 OR name = $2',
        [dev.slug, dev.name]
      );

      if (existing.rows.length > 0) {
        console.log(`  ⏭️ Skipped: ${dev.name} (already exists)`);
        skipped++;
        continue;
      }

      // Insert new developer
      await pool.query(
        `INSERT INTO developers (slug, name, description, logo)
         VALUES ($1, $2, $3, $4)`,
        [
          dev.slug,
          dev.name,
          dev.description,
          `https://ui-avatars.com/api/?name=${encodeURIComponent(dev.name)}&size=200&background=1a365d&color=fff&bold=true`
        ]
      );

      console.log(`  ✅ Created: ${dev.name}`);
      created++;
    } catch (error) {
      console.log(`  ❌ Error with ${dev.name}: ${error.message}`);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${developers.length}`);

  // Show all developers
  const allDevs = await pool.query('SELECT id, name FROM developers ORDER BY name');
  console.log(`\n📋 All developers in database: ${allDevs.rows.length}`);

  await pool.end();
}

seedDevelopers();
