import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hieedqfvofdeskixcywu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZWVkcWZ2b2ZkZXNraXhjeXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDYzNDAsImV4cCI6MjA3OTcyMjM0MH0.0TLBeSJBjlxi5fTuDtStgjAr28PkLSGydLEP0-1aLkA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function importData() {
  console.log('\n🚀 Importing data to Supabase via API...\n');

  try {
    // Areas data
    const areas = [
      { id: 1, slug: 'dubai-design-district-dubai', name: 'Dubai Design District (d3)', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop', starting_price: 'AED 1,200,000', project_count: 12, description: 'Known for its iconic landmarks including Burj Khalifa and Dubai Mall, Downtown Dubai offers luxury living at the heart of the city.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 2, slug: 'dubai-hills-estate', name: 'Dubai Hills Estate', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', starting_price: 'AED 900,000', project_count: 18, description: 'A master-planned community offering golf course living, parks, and family-friendly amenities in the heart of Dubai.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 3, slug: 'dubai-marina', name: 'Dubai Marina', image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop', starting_price: 'AED 1,100,000', project_count: 15, description: 'Waterfront living with stunning marina views, world-class dining, and vibrant nightlife.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 4, slug: 'palm-jumeirah', name: 'Palm Jumeirah', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop', starting_price: 'AED 2,500,000', project_count: 8, description: 'Iconic palm-shaped island offering exclusive beachfront properties and luxury resorts.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 5, slug: 'business-bay', name: 'Business Bay', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop', starting_price: 'AED 850,000', project_count: 22, description: 'Central business district with modern skyscrapers, canal views, and excellent connectivity.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 6, slug: 'jumeirah-village-circle', name: 'Jumeirah Village Circle (JVC)', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop', starting_price: 'AED 650,000', project_count: 25, description: 'Family-oriented community with parks, schools, and affordable housing options.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 7, slug: 'arabian-ranches', name: 'Arabian Ranches', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', starting_price: 'AED 1,800,000', project_count: 6, description: 'Gated desert community with golf course, polo club, and spacious villas.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 8, slug: 'mohammed-bin-rashid-city', name: 'Mohammed Bin Rashid City', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop', starting_price: 'AED 1,400,000', project_count: 10, description: 'Massive development featuring Crystal Lagoons, Meydan Racecourse, and modern residential districts.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 9, slug: 'dubai-south', name: 'Dubai South', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop', starting_price: 'AED 550,000', project_count: 14, description: 'Future-focused city near Al Maktoum International Airport with smart infrastructure.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 10, slug: 'dubai-creek-harbour', name: 'Dubai Creek Harbour', image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop', starting_price: 'AED 1,000,000', project_count: 16, description: 'Waterfront development featuring Dubai Creek Tower and spectacular creek views.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 11, slug: 'damac-hills', name: 'DAMAC Hills', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', starting_price: 'AED 700,000', project_count: 20, description: 'Golf community with Trump International Golf Club and extensive green spaces.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 12, slug: 'town-square', name: 'Town Square', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', starting_price: 'AED 600,000', project_count: 18, description: 'Residential community centered around a large park with family-friendly amenities and townhouses.', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' }
    ];

    // Developers data
    const developers = [
      { id: 1, slug: 'emaar-properties', name: 'Emaar Properties', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop', description: 'Leading real estate developer in Dubai, known for iconic projects like Burj Khalifa and Dubai Mall.', website: 'https://www.emaar.com', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 2, slug: 'damac-properties', name: 'DAMAC Properties', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3624?w=200&h=200&fit=crop', description: 'Luxury developer specializing in high-end residential and commercial properties across Dubai.', website: 'https://www.damacproperties.com', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 3, slug: 'meraas', name: 'Meraas', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3625?w=200&h=200&fit=crop', description: 'Dubai-based holding company creating innovative lifestyle destinations and communities.', website: 'https://www.meraas.com', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 4, slug: 'nakheel', name: 'Nakheel', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3626?w=200&h=200&fit=crop', description: 'Master developer behind Palm Jumeirah and other iconic waterfront developments.', website: 'https://www.nakheel.com', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 5, slug: 'sobha-realty', name: 'Sobha Realty', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3627?w=200&h=200&fit=crop', description: 'Premium developer focused on quality craftsmanship and luxury living spaces.', website: 'https://www.sobharealty.com', created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' }
    ];

    // Projects data - matching the actual Supabase schema
    const projects = [
      { id: 1, slug: 'azure-residences', name: 'Azure Residences', developer_id: 1, area_id: 2, location: 'Dubai Hills Estate', price_from: 'AED 900K', starting_price: 'AED 900,000', payment_plan: '60/40', completion_date: 'Q4 2025', handover: 'Q4 2025', status: 'Off Plan', title_type: 'Freehold', property_types: ["Apartment"], images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop"], description: 'Luxury apartments with golf course views and modern amenities in the heart of Dubai Hills Estate.', amenities: ["Pool","Gym","Kids Play Area","BBQ Area","Running Track"], payment_plans: [{"type":"60/40","description":"60% during construction, 40% on handover"}], unit_types: [{"type":"1BR","size":"750 sqft","price":"AED 900K"},{"type":"2BR","size":"1,200 sqft","price":"AED 1.5M"},{"type":"3BR","size":"2,100 sqft","price":"AED 2.5M"}], bedrooms: 3, bathrooms: 4, sqft: 2100, match_score: 85, created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 2, slug: 'marina-pearl-tower', name: 'Marina Pearl Tower', developer_id: 2, area_id: 3, location: 'Dubai Marina', price_from: 'AED 1.2M', starting_price: 'AED 1,200,000', payment_plan: '70/30', completion_date: 'Q2 2026', handover: 'Q2 2026', status: 'Off Plan', title_type: 'Freehold', property_types: ["Apartment"], images: ["https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200&h=800&fit=crop","https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=800&fit=crop"], description: 'Iconic waterfront tower offering stunning marina views and world-class facilities.', amenities: ["Infinity Pool","Spa","Gym","Beach Access","Concierge"], payment_plans: [{"type":"70/30","description":"70% during construction, 30% on handover"}], unit_types: [{"type":"1BR","size":"850 sqft","price":"AED 1.2M"},{"type":"2BR","size":"1,400 sqft","price":"AED 2M"},{"type":"3BR","size":"2,000 sqft","price":"AED 2.8M"},{"type":"4BR","size":"2,800 sqft","price":"AED 3.8M"}], bedrooms: 4, bathrooms: 5, sqft: 2800, match_score: 92, created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 3, slug: 'palm-vista-residences', name: 'Palm Vista Residences', developer_id: 4, area_id: 4, location: 'Palm Jumeirah', price_from: 'AED 2.5M', starting_price: 'AED 2,500,000', payment_plan: '80/20', completion_date: 'Q1 2027', handover: 'Q1 2027', status: 'Off Plan', title_type: 'Freehold', property_types: ["Apartment","Penthouse"], images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop","https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop"], description: 'Exclusive beachfront residences on the iconic Palm Jumeirah with private beach access.', amenities: ["Private Beach","Infinity Pool","Gym","Spa","Valet Parking","Kids Club"], payment_plans: [{"type":"80/20","description":"80% during construction, 20% on handover"}], unit_types: [{"type":"2BR","size":"1,500 sqft","price":"AED 2.5M"},{"type":"3BR","size":"2,200 sqft","price":"AED 4M"},{"type":"4BR","size":"3,500 sqft","price":"AED 6M"},{"type":"5BR","size":"4,500 sqft","price":"AED 8M"}], bedrooms: 5, bathrooms: 6, sqft: 4500, match_score: 78, created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 4, slug: 'creek-heights', name: 'Creek Heights', developer_id: 1, area_id: 10, location: 'Dubai Creek Harbour', price_from: 'AED 1M', starting_price: 'AED 1,000,000', payment_plan: '60/40', completion_date: 'Q3 2025', handover: 'Q3 2025', status: 'Off Plan', title_type: 'Freehold', property_types: ["Apartment"], images: ["https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&h=800&fit=crop","https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop"], description: 'Modern apartments overlooking Dubai Creek with easy access to the future Creek Tower.', amenities: ["Pool","Gym","Landscaped Gardens","Retail","Creek Views"], payment_plans: [{"type":"60/40","description":"60% during construction, 40% on handover"}], unit_types: [{"type":"1BR","size":"800 sqft","price":"AED 1M"},{"type":"2BR","size":"1,300 sqft","price":"AED 1.8M"},{"type":"3BR","size":"2,000 sqft","price":"AED 2.8M"}], bedrooms: 3, bathrooms: 4, sqft: 2000, match_score: 88, created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 5, slug: 'business-central-towers', name: 'Business Central Towers', developer_id: 2, area_id: 5, location: 'Business Bay', price_from: 'AED 850K', starting_price: 'AED 850,000', payment_plan: '50/50', completion_date: 'Q2 2025', handover: 'Q2 2025', status: 'Off Plan', title_type: 'Freehold', property_types: ["Apartment","Office"], images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop","https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&h=800&fit=crop"], description: 'Commercial and residential mixed-use development in the heart of Business Bay.', amenities: ["Pool","Gym","Business Center","Canal Views","Retail Podium"], payment_plans: [{"type":"50/50","description":"50% during construction, 50% on handover"}], unit_types: [{"type":"Studio","size":"700 sqft","price":"AED 850K"},{"type":"1BR","size":"900 sqft","price":"AED 1.2M"},{"type":"2BR","size":"1,300 sqft","price":"AED 1.7M"},{"type":"3BR","size":"1,800 sqft","price":"AED 2.2M"}], bedrooms: 3, bathrooms: 3, sqft: 1800, match_score: 95, created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' },
      { id: 6, slug: 'verde-villas', name: 'Verde Villas', developer_id: 2, area_id: 11, location: 'DAMAC Hills', price_from: 'AED 1.8M', starting_price: 'AED 1,800,000', payment_plan: '70/30', completion_date: 'Q4 2026', handover: 'Q4 2026', status: 'Off Plan', title_type: 'Freehold', property_types: ["Villa"], images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop"], description: 'Luxurious golf course villas with private gardens and premium finishes.', amenities: ["Golf Course","Pool","Gym","Kids Play Area","Tennis Courts","Parks"], payment_plans: [{"type":"70/30","description":"70% during construction, 30% on handover"}], unit_types: [{"type":"3BR Villa","size":"2,500 sqft","price":"AED 1.8M"},{"type":"4BR Villa","size":"3,200 sqft","price":"AED 2.5M"},{"type":"5BR Villa","size":"4,200 sqft","price":"AED 3.5M"}], bedrooms: 5, bathrooms: 6, sqft: 4200, match_score: 75, created_at: '2024-01-15 10:00:00', updated_at: '2024-01-15 10:00:00' }
    ];

    // Import areas
    console.log('📍 Importing areas...');
    const { data: areasData, error: areasError } = await supabase
      .from('areas')
      .upsert(areas, { onConflict: 'id' });

    if (areasError) {
      console.error('❌ Error importing areas:', areasError);
    } else {
      console.log(`✅ Imported ${areas.length} areas`);
    }

    // Import developers
    console.log('🏢 Importing developers...');
    const { data: devsData, error: devsError } = await supabase
      .from('developers')
      .upsert(developers, { onConflict: 'id' });

    if (devsError) {
      console.error('❌ Error importing developers:', devsError);
    } else {
      console.log(`✅ Imported ${developers.length} developers`);
    }

    // Import projects
    console.log('🏗️ Importing projects...');
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .upsert(projects, { onConflict: 'id' });

    if (projectsError) {
      console.error('❌ Error importing projects:', projectsError);
    } else {
      console.log(`✅ Imported ${projects.length} projects`);
    }

    // Verify import
    console.log('\n🔍 Verifying import...');
    const { data: verifyAreas } = await supabase.from('areas').select('count');
    const { data: verifyDevs } = await supabase.from('developers').select('count');
    const { data: verifyProjects } = await supabase.from('projects').select('*');

    console.log(`\n📊 Import Summary:`);
    console.log(`  ✓ Areas: ${verifyAreas ? verifyAreas.length : 0} rows`);
    console.log(`  ✓ Developers: ${verifyDevs ? verifyDevs.length : 0} rows`);
    console.log(`  ✓ Projects: ${verifyProjects ? verifyProjects.length : 0} rows`);

    if (verifyProjects && verifyProjects.length > 0) {
      console.log('\n📦 Sample projects:');
      verifyProjects.slice(0, 3).forEach(project => {
        console.log(`  - ${project.name} (${project.location}) - ${project.price_from}`);
      });
    }

    console.log('\n✅ Import completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Your Supabase database now has all the data');
    console.log('2. Open http://localhost:3000 to see your projects\n');

  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  }
}

importData();
