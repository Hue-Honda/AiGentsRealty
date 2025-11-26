import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hieedqfvofdeskixcywu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZWVkcWZ2b2ZkZXNraXhjeXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDYzNDAsImV4cCI6MjA3OTcyMjM0MH0.0TLBeSJBjlxi5fTuDtStgjAr28PkLSGydLEP0-1aLkA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyData() {
  console.log('\n🔍 Verifying Supabase Data...\n');

  try {
    // Check areas
    const { data: areas, error: areasError } = await supabase
      .from('areas')
      .select('*');

    if (areasError) {
      console.error('❌ Error fetching areas:', areasError);
    } else {
      console.log(`✅ Areas: ${areas.length} rows`);
      if (areas.length > 0) {
        console.log('   Sample areas:');
        areas.slice(0, 3).forEach(area => {
          console.log(`   - ${area.name} (${area.starting_price})`);
        });
      }
    }

    console.log('');

    // Check developers
    const { data: developers, error: devsError } = await supabase
      .from('developers')
      .select('*');

    if (devsError) {
      console.error('❌ Error fetching developers:', devsError);
    } else {
      console.log(`✅ Developers: ${developers.length} rows`);
      if (developers.length > 0) {
        console.log('   Sample developers:');
        developers.slice(0, 3).forEach(dev => {
          console.log(`   - ${dev.name}`);
        });
      }
    }

    console.log('');

    // Check projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*');

    if (projectsError) {
      console.error('❌ Error fetching projects:', projectsError);
    } else {
      console.log(`✅ Projects: ${projects.length} rows`);
      if (projects.length > 0) {
        console.log('   All projects:');
        projects.forEach(project => {
          console.log(`   - ${project.name} (${project.location}) - ${project.price_from}`);
        });
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Total Areas: ${areas?.length || 0}`);
    console.log(`   Total Developers: ${developers?.length || 0}`);
    console.log(`   Total Projects: ${projects?.length || 0}`);

    if (projects && projects.length > 0) {
      console.log('\n✅ Supabase is ready for production!');
      console.log('   Your backend can now connect to Supabase and serve projects.\n');
    } else {
      console.log('\n⚠️  No projects found in Supabase');
      console.log('   Run: node import-via-api.js to import data\n');
    }

  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    process.exit(1);
  }
}

verifyData();
