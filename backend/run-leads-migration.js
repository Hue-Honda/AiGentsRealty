import { query } from './src/config/database.js';

async function createLeadsTable() {
  try {
    console.log('Creating leads table...');

    await query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(255),
        budget VARCHAR(100),
        interested_project VARCHAR(255),
        preferred_area VARCHAR(255),
        bedrooms VARCHAR(50),
        timeline VARCHAR(100),
        investment_purpose VARCHAR(50),
        notes TEXT,
        source VARCHAR(50) DEFAULT 'genie_chat',
        status VARCHAR(50) DEFAULT 'new',
        conversation_summary TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Leads table created');

    // Create indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);`);
    console.log('✅ Indexes created');

    // Verify table exists
    const result = await query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'leads'
      ORDER BY ordinal_position;
    `);

    console.log('\n📋 Leads table columns:');
    result.rows.forEach(row => {
      console.log(`   - ${row.column_name}: ${row.data_type}`);
    });

    console.log('\n✅ Migration complete!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createLeadsTable();
