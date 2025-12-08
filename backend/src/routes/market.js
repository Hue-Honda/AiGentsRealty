import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Get market stats for a specific area
router.get('/area/:areaName', async (req, res) => {
  try {
    const { areaName } = req.params;

    // Try to match by slug or name
    const result = await query(`
      SELECT * FROM area_market_stats
      WHERE area_slug = $1 OR LOWER(area_name) = LOWER($2)
      LIMIT 1
    `, [areaName, areaName.replace(/-/g, ' ')]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Area not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching area market stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all area stats (for comparison pages)
router.get('/areas', async (req, res) => {
  try {
    const { limit = 20, sort = 'total_transactions_12m', order = 'DESC' } = req.query;

    const validSorts = ['total_transactions_12m', 'avg_price_sqft', 'total_transactions_6m', 'area_name'];
    const sortColumn = validSorts.includes(sort) ? sort : 'total_transactions_12m';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const result = await query(`
      SELECT area_name, area_slug, avg_price_sqft, median_price_sqft,
             total_transactions_6m, total_transactions_12m,
             top_property_type, yoy_price_change
      FROM area_market_stats
      ORDER BY ${sortColumn} ${sortOrder}
      LIMIT $1
    `, [parseInt(limit)]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching area stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get monthly trends (for charts)
router.get('/trends', async (req, res) => {
  try {
    const { months = 12 } = req.query;

    const result = await query(`
      SELECT month, year, total_transactions, total_volume_aed,
             avg_price_sqft, median_price_sqft, top_area, top_area_transactions
      FROM market_trends
      ORDER BY year DESC, month DESC
      LIMIT $1
    `, [parseInt(months)]);

    res.json(result.rows.reverse()); // Return in chronological order
  } catch (error) {
    console.error('Error fetching market trends:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get area monthly history (for area-specific charts)
router.get('/area/:areaName/history', async (req, res) => {
  try {
    const { areaName } = req.params;
    const { months = 12 } = req.query;

    const result = await query(`
      SELECT month, year, transactions_count, avg_price_sqft,
             total_volume, avg_unit_size, villa_count, apartment_count, land_count
      FROM area_monthly_stats
      WHERE LOWER(area_name) = LOWER($1) OR area_name = $2
      ORDER BY year DESC, month DESC
      LIMIT $3
    `, [areaName.replace(/-/g, ' '), areaName, parseInt(months)]);

    res.json(result.rows.reverse());
  } catch (error) {
    console.error('Error fetching area history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get market overview (dashboard stats)
router.get('/overview', async (req, res) => {
  try {
    // Get latest month stats
    const latestTrend = await query(`
      SELECT * FROM market_trends
      ORDER BY year DESC, month DESC
      LIMIT 1
    `);

    // Get top areas by transaction volume
    const topAreas = await query(`
      SELECT area_name, area_slug, avg_price_sqft, total_transactions_6m
      FROM area_market_stats
      ORDER BY total_transactions_6m DESC
      LIMIT 5
    `);

    // Get overall stats
    const totalStats = await query(`
      SELECT
        COUNT(*) as total_areas,
        SUM(total_transactions_12m) as total_transactions,
        AVG(avg_price_sqft) as overall_avg_price_sqft
      FROM area_market_stats
    `);

    res.json({
      latestMonth: latestTrend.rows[0] || null,
      topAreas: topAreas.rows,
      totalStats: totalStats.rows[0]
    });
  } catch (error) {
    console.error('Error fetching market overview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
