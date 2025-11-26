#!/bin/bash

echo "🚀 Migrating AiGentsRealty Database to Supabase"
echo "================================================"
echo ""

# Step 1: Export schema from Docker
echo "📦 Step 1: Exporting database schema from Docker..."
docker exec aigentsrealty-postgres pg_dump -U postgres -d aigentsrealty --schema-only --no-owner --no-acl > backup/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema exported successfully to backup/schema.sql"
else
    echo "❌ Failed to export schema"
    exit 1
fi

echo ""

# Step 2: Export data from Docker
echo "📦 Step 2: Exporting database data from Docker..."
docker exec aigentsrealty-postgres pg_dump -U postgres -d aigentsrealty --data-only --no-owner --no-acl > backup/data.sql

if [ $? -eq 0 ]; then
    echo "✅ Data exported successfully to backup/data.sql"
else
    echo "❌ Failed to export data"
    exit 1
fi

echo ""

# Step 3: Import schema to Supabase
echo "📤 Step 3: Importing schema to Supabase..."
PGPASSWORD=y5yRaO2kK9dtkrXc psql -h db.hieedqfvofdeskixcywu.supabase.co -U postgres -d postgres -p 5432 -f backup/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema imported successfully to Supabase"
else
    echo "❌ Failed to import schema to Supabase"
    exit 1
fi

echo ""

# Step 4: Import data to Supabase
echo "📤 Step 4: Importing data to Supabase..."
PGPASSWORD=y5yRaO2kK9dtkrXc psql -h db.hieedqfvofdeskixcywu.supabase.co -U postgres -d postgres -p 5432 -f backup/data.sql

if [ $? -eq 0 ]; then
    echo "✅ Data imported successfully to Supabase"
else
    echo "❌ Failed to import data to Supabase"
    exit 1
fi

echo ""
echo "🎉 Migration completed successfully!"
echo ""
echo "Next steps:"
echo "1. Restart your backend server to connect to Supabase"
echo "2. Test the connection with: cd backend && node test-supabase.js"
