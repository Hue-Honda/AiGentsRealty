import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Real 2025 Developer Data based on market research
const developerUpdates = [
  {
    slug: 'emaar-properties',
    name: 'Emaar Properties',
    description: 'Dubai\'s largest developer with AED 51B in sales (Jan-Aug 2025). Founded 1997, built Burj Khalifa, Dubai Mall. Market cap AED 120B with 118,400+ units delivered worldwide. Known for The Oasis, Dubai Creek Harbour, Emaar Beachfront, and Dubai Hills Estate.',
    founded_year: 1997,
    headquarters: 'Dubai, UAE',
    total_projects: 200,
    units_delivered: 118400,
    on_time_delivery: 96,
    rating: 4.9,
    website: 'https://www.emaar.com'
  },
  {
    slug: 'damac-properties',
    name: 'DAMAC Properties',
    description: 'Luxury developer led by Hussain Sajwani. Expanding globally with $20B US data center investment. Known for DAMAC Lagoons, DAMAC Hills, Seacrest, and celebrity partnerships with Trump, Versace, and Cavalli branded residences.',
    founded_year: 2002,
    headquarters: 'Dubai, UAE',
    total_projects: 100,
    units_delivered: 47000,
    on_time_delivery: 94,
    rating: 4.7,
    website: 'https://www.damacproperties.com'
  },
  {
    slug: 'nakheel',
    name: 'Nakheel',
    description: 'Government-backed developer (Dubai Holding) with AED 13B sales (Jan-Aug 2025). Creators of Palm Jumeirah, The World Islands, and Dubai Islands. Pioneers of waterfront mega-projects with 8-12% ROI range.',
    founded_year: 2000,
    headquarters: 'Dubai, UAE',
    total_projects: 80,
    units_delivered: 55000,
    on_time_delivery: 95,
    rating: 4.8,
    website: 'https://www.nakheel.com'
  },
  {
    slug: 'sobha-realty',
    name: 'Sobha Realty',
    description: 'Premium developer founded by PNC Menon in 1976, Dubai since 2003. Known for meticulous craftsmanship and luxury developments including Sobha Hartland 1 & 2, Sobha Creek Vistas, and Al Siniya Island. Backward integration for quality control.',
    founded_year: 1976,
    headquarters: 'Dubai, UAE',
    total_projects: 50,
    units_delivered: 25000,
    on_time_delivery: 97,
    rating: 4.8,
    website: 'https://www.sobharealty.com'
  },
  {
    slug: 'meraas',
    name: 'Meraas',
    description: 'Dubai Holding subsidiary known for innovative lifestyle destinations. Developers of Bluewaters Island, City Walk, La Mer, and Port de La Mer. Focus on mixed-use developments combining retail, hospitality, and residential.',
    founded_year: 2007,
    headquarters: 'Dubai, UAE',
    total_projects: 40,
    units_delivered: 15000,
    on_time_delivery: 93,
    rating: 4.6,
    website: 'https://www.meraas.com'
  },
  {
    slug: 'binghatti',
    name: 'Binghatti',
    description: 'Known for iconic architecture and unique geometric designs. Partnership with Jacob & Co for luxury branded residences. Projects include Binghatti Ghost, Binghatti Avenue, and Mercedes-Benz Places. Fast-growing developer with strong design identity.',
    founded_year: 2008,
    headquarters: 'Dubai, UAE',
    total_projects: 60,
    units_delivered: 18000,
    on_time_delivery: 92,
    rating: 4.5,
    website: 'https://www.binghatti.com'
  },
  {
    slug: 'azizi-developments',
    name: 'Azizi Developments',
    description: 'Major Dubai developer with projects across Al Furjan, Dubai Healthcare City, Palm Jumeirah, and MBR City. Known for affordable luxury and extensive project portfolio with over 40,000 units in development.',
    founded_year: 2007,
    headquarters: 'Dubai, UAE',
    total_projects: 200,
    units_delivered: 20000,
    on_time_delivery: 90,
    rating: 4.4,
    website: 'https://www.azizidevelopments.com'
  },
  {
    slug: 'ellington-properties',
    name: 'Ellington Properties',
    description: 'Design-led developer focusing on boutique residences with European aesthetics. Known for Belgravia, Wilton Terraces, and The Crestmark. Strong focus on architectural excellence and premium finishes.',
    founded_year: 2014,
    headquarters: 'Dubai, UAE',
    total_projects: 25,
    units_delivered: 5000,
    on_time_delivery: 95,
    rating: 4.7,
    website: 'https://www.ellingtonproperties.com'
  },
  {
    slug: 'dubai-properties',
    name: 'Dubai Properties',
    description: 'Part of Dubai Holding, developers of JBR, Business Bay, and Culture Village. Known for large-scale community developments with integrated amenities and waterfront living.',
    founded_year: 2002,
    headquarters: 'Dubai, UAE',
    total_projects: 60,
    units_delivered: 30000,
    on_time_delivery: 94,
    rating: 4.6,
    website: 'https://www.dp.ae'
  },
  {
    slug: 'danube-properties',
    name: 'Danube Properties',
    description: 'Known for affordable luxury and 1% monthly payment plans. Major projects include Diamondz, Elitz, Opalz, and Fashionz. Strong focus on investor-friendly payment structures.',
    founded_year: 2014,
    headquarters: 'Dubai, UAE',
    total_projects: 35,
    units_delivered: 12000,
    on_time_delivery: 91,
    rating: 4.4,
    website: 'https://www.danubeproperties.ae'
  },
  {
    slug: 'omniyat',
    name: 'Omniyat',
    description: 'Ultra-luxury developer known for One Palm, Dorchester Collection Residences, and The Opus by Zaha Hadid. Focus on architectural masterpieces and super-prime real estate.',
    founded_year: 2005,
    headquarters: 'Dubai, UAE',
    total_projects: 15,
    units_delivered: 3000,
    on_time_delivery: 96,
    rating: 4.9,
    website: 'https://www.omniyat.com'
  }
];

async function updateDevelopers() {
  console.log('Updating developers with real 2025 data...\n');

  for (const dev of developerUpdates) {
    try {
      // Check if developer exists
      const existing = await pool.query('SELECT id FROM developers WHERE slug = $1', [dev.slug]);

      if (existing.rows.length > 0) {
        // Update existing developer
        await pool.query(`
          UPDATE developers SET
            description = $1,
            website = $2,
            updated_at = NOW()
          WHERE slug = $3
        `, [dev.description, dev.website, dev.slug]);
        console.log(`✅ Updated: ${dev.name}`);
      } else {
        // Insert new developer
        await pool.query(`
          INSERT INTO developers (name, slug, description, website, logo, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        `, [
          dev.name,
          dev.slug,
          dev.description,
          dev.website,
          `https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop`
        ]);
        console.log(`✅ Inserted: ${dev.name}`);
      }
    } catch (error) {
      console.error(`❌ Error with ${dev.name}:`, error.message);
    }
  }

  // Show final count
  const count = await pool.query('SELECT COUNT(*) FROM developers');
  console.log(`\n📊 Total developers in database: ${count.rows[0].count}`);

  await pool.end();
  console.log('\n✅ Developer update complete!');
}

updateDevelopers().catch(console.error);
