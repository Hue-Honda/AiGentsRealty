import fs from 'fs';
import readline from 'readline';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// CSV file path
const CSV_PATH = path.join(__dirname, '../../Transactions.csv');

// Filter: No year filter - include ALL areas
const MIN_YEAR = 1990; // Include all historical data to get all 258 areas

// Data structures for aggregation
const areaStats = {};          // area_name -> { transactions, prices, volumes, etc }
const monthlyTrends = {};      // "YYYY-MM" -> { transactions, volume, prices }
const areaMonthlyStats = {};   // "area_YYYY-MM" -> { count, prices, volume }

function parseDate(dateStr) {
  // Format: DD-MM-YYYY
  const [day, month, year] = dateStr.split('-').map(Number);
  return { day, month, year, date: new Date(year, month - 1, day) };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function processCSV() {
  console.log('📊 Starting DLD data processing...');
  console.log(`📁 Reading from: ${CSV_PATH}`);

  const fileStream = fs.createReadStream(CSV_PATH, { encoding: 'utf8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let headers = [];
  let lineCount = 0;
  let processedCount = 0;
  let skippedCount = 0;

  for await (const line of rl) {
    lineCount++;

    // Parse header
    if (lineCount === 1) {
      headers = parseCSVLine(line);
      console.log(`📋 Found ${headers.length} columns`);
      continue;
    }

    // Parse data row
    const values = parseCSVLine(line);
    if (values.length < headers.length) continue;

    const row = {};
    headers.forEach((h, i) => row[h] = values[i]);

    // Extract fields
    const instanceDate = row['instance_date'];
    const areaName = row['area_name_en'];
    const propertyType = row['property_type_en'];
    const actualWorth = parseFloat(row['actual_worth']) || 0;
    const meterSalePrice = parseFloat(row['meter_sale_price']) || 0;
    const procedureArea = parseFloat(row['procedure_area']) || 0;

    // Skip if missing critical data
    if (!instanceDate || !areaName) {
      skippedCount++;
      continue;
    }

    // Parse date and filter
    const { month, year } = parseDate(instanceDate);
    if (year < MIN_YEAR) {
      skippedCount++;
      continue;
    }

    processedCount++;

    // Aggregate by area
    if (!areaStats[areaName]) {
      areaStats[areaName] = {
        prices: [],
        volumes: [],
        sizes: [],
        propertyTypes: {},
        transactions: 0,
        transactions6m: 0,
        transactions12m: 0
      };
    }

    const area = areaStats[areaName];
    area.transactions++;
    if (meterSalePrice > 0) area.prices.push(meterSalePrice);
    if (actualWorth > 0) area.volumes.push(actualWorth);
    if (procedureArea > 0) area.sizes.push(procedureArea);
    if (propertyType) {
      area.propertyTypes[propertyType] = (area.propertyTypes[propertyType] || 0) + 1;
    }

    // Check if within last 6/12 months (from Nov 2025)
    const txDate = new Date(year, month - 1, 1);
    const now = new Date(2025, 10, 1); // Nov 2025
    const monthsAgo = (now.getFullYear() - txDate.getFullYear()) * 12 + (now.getMonth() - txDate.getMonth());
    if (monthsAgo <= 6) area.transactions6m++;
    if (monthsAgo <= 12) area.transactions12m++;

    // Aggregate monthly trends
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    if (!monthlyTrends[monthKey]) {
      monthlyTrends[monthKey] = {
        transactions: 0,
        totalVolume: 0,
        prices: [],
        areas: {}
      };
    }
    monthlyTrends[monthKey].transactions++;
    monthlyTrends[monthKey].totalVolume += actualWorth;
    if (meterSalePrice > 0) monthlyTrends[monthKey].prices.push(meterSalePrice);
    monthlyTrends[monthKey].areas[areaName] = (monthlyTrends[monthKey].areas[areaName] || 0) + 1;

    // Aggregate area monthly stats
    const areaMonthKey = `${areaName}_${monthKey}`;
    if (!areaMonthlyStats[areaMonthKey]) {
      areaMonthlyStats[areaMonthKey] = {
        areaName,
        month,
        year,
        count: 0,
        prices: [],
        volume: 0,
        sizes: [],
        villa: 0,
        apartment: 0,
        land: 0
      };
    }
    const ams = areaMonthlyStats[areaMonthKey];
    ams.count++;
    if (meterSalePrice > 0) ams.prices.push(meterSalePrice);
    ams.volume += actualWorth;
    if (procedureArea > 0) ams.sizes.push(procedureArea);

    // Property type counts
    if (propertyType === 'Villa') ams.villa++;
    else if (propertyType === 'Unit' || propertyType === 'Flat') ams.apartment++;
    else if (propertyType === 'Land') ams.land++;

    // Progress log
    if (lineCount % 100000 === 0) {
      console.log(`  Processed ${lineCount.toLocaleString()} lines...`);
    }
  }

  console.log(`\n✅ CSV Processing Complete!`);
  console.log(`   Total lines: ${lineCount.toLocaleString()}`);
  console.log(`   Processed: ${processedCount.toLocaleString()}`);
  console.log(`   Skipped (old/invalid): ${skippedCount.toLocaleString()}`);
  console.log(`   Unique areas: ${Object.keys(areaStats).length}`);
  console.log(`   Monthly periods: ${Object.keys(monthlyTrends).length}`);

  return { areaStats, monthlyTrends, areaMonthlyStats };
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function median(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function average(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// Safe min/max for large arrays (avoid stack overflow)
function safeMin(arr) {
  if (!arr.length) return 0;
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}

function safeMax(arr) {
  if (!arr.length) return 0;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

function safeSum(arr) {
  if (!arr.length) return 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

async function importToDatabase(data) {
  const { areaStats, monthlyTrends, areaMonthlyStats } = data;

  console.log('\n📤 Importing to Supabase...');

  // Run migration first
  console.log('  Running migration...');
  const migrationSQL = fs.readFileSync(
    path.join(__dirname, '../migrations/003_market_stats.sql'),
    'utf8'
  );
  await pool.query(migrationSQL);
  console.log('  ✅ Migration complete');

  // Clear existing data
  await pool.query('TRUNCATE area_market_stats, market_trends, area_monthly_stats RESTART IDENTITY');

  // Import area_market_stats
  console.log('  Importing area_market_stats...');
  let areaCount = 0;
  for (const [areaName, stats] of Object.entries(areaStats)) {
    const topPropertyType = Object.entries(stats.propertyTypes)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    // Calculate YoY change (compare last 12 months avg to previous 12 months)
    // For simplicity, we'll leave this null for now - can be calculated from monthly data

    await pool.query(`
      INSERT INTO area_market_stats (
        area_name, area_slug, avg_price_sqft, median_price_sqft,
        min_price, max_price, avg_transaction_value,
        total_transactions_6m, total_transactions_12m, total_volume_12m,
        top_property_type, avg_unit_size, data_from_date, data_to_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `, [
      areaName,
      slugify(areaName),
      average(stats.prices).toFixed(2),
      median(stats.prices).toFixed(2),
      safeMin(stats.volumes),
      safeMax(stats.volumes),
      average(stats.volumes).toFixed(2),
      stats.transactions6m,
      stats.transactions12m,
      safeSum(stats.volumes),
      topPropertyType,
      average(stats.sizes).toFixed(2),
      '1990-01-01',
      '2025-11-30'
    ]);
    areaCount++;
  }
  console.log(`  ✅ Imported ${areaCount} areas`);

  // Import market_trends
  console.log('  Importing market_trends...');
  let trendCount = 0;
  for (const [monthKey, stats] of Object.entries(monthlyTrends)) {
    const [year, month] = monthKey.split('-').map(Number);

    // Find top area
    const topArea = Object.entries(stats.areas)
      .sort((a, b) => b[1] - a[1])[0];

    await pool.query(`
      INSERT INTO market_trends (
        month, year, total_transactions, total_volume_aed,
        avg_price_sqft, median_price_sqft, top_area, top_area_transactions
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      month,
      year,
      stats.transactions,
      stats.totalVolume,
      average(stats.prices).toFixed(2),
      median(stats.prices).toFixed(2),
      topArea?.[0] || null,
      topArea?.[1] || 0
    ]);
    trendCount++;
  }
  console.log(`  ✅ Imported ${trendCount} monthly trends`);

  // Import area_monthly_stats
  console.log('  Importing area_monthly_stats...');
  let areaMonthCount = 0;
  for (const stats of Object.values(areaMonthlyStats)) {
    await pool.query(`
      INSERT INTO area_monthly_stats (
        area_name, month, year, transactions_count,
        avg_price_sqft, total_volume, avg_unit_size,
        villa_count, apartment_count, land_count
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      stats.areaName,
      stats.month,
      stats.year,
      stats.count,
      average(stats.prices).toFixed(2),
      stats.volume,
      average(stats.sizes).toFixed(2),
      stats.villa,
      stats.apartment,
      stats.land
    ]);
    areaMonthCount++;

    if (areaMonthCount % 1000 === 0) {
      console.log(`    Imported ${areaMonthCount.toLocaleString()} area-month records...`);
    }
  }
  console.log(`  ✅ Imported ${areaMonthCount} area-monthly stats`);

  console.log('\n🎉 All data imported successfully!');
}

async function main() {
  try {
    const data = await processCSV();
    await importToDatabase(data);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

main();
