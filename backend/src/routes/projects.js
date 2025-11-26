import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/projects/suggestions - Get AI property suggestions
router.get('/suggestions', async (req, res) => {
  try {
    // Get projects ordered by match_score (for AI suggestions)
    const result = await query(
      `SELECT
        p.*,
        d.name as developer_name,
        d.logo as developer_logo,
        a.slug as area_slug
       FROM projects p
       LEFT JOIN developers d ON p.developer_id = d.id
       LEFT JOIN areas a ON p.area_id = a.id
       ORDER BY p.match_score DESC, p.created_at DESC
       LIMIT 6`
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching project suggestions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project suggestions'
    });
  }
});

// GET /api/projects/featured - Get featured off-plan projects
router.get('/featured', async (req, res) => {
  try {
    const result = await query(
      `SELECT
        p.*,
        d.name as developer_name,
        d.logo as developer_logo,
        a.slug as area_slug
       FROM projects p
       LEFT JOIN developers d ON p.developer_id = d.id
       LEFT JOIN areas a ON p.area_id = a.id
       WHERE p.status = 'Off Plan'
       ORDER BY p.created_at DESC
       LIMIT 6`
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured projects'
    });
  }
});

// GET /api/projects - Get all projects with optional filters
router.get('/', async (req, res) => {
  try {
    const { area, developer, status, min_price, max_price, limit = 20 } = req.query;

    let queryText = `
      SELECT
        p.*,
        d.name as developer_name,
        d.logo as developer_logo,
        a.name as area_name,
        a.slug as area_slug
      FROM projects p
      LEFT JOIN developers d ON p.developer_id = d.id
      LEFT JOIN areas a ON p.area_id = a.id
      WHERE 1=1
    `;

    const queryParams = [];
    let paramCount = 1;

    if (area) {
      queryText += ` AND a.slug = $${paramCount}`;
      queryParams.push(area);
      paramCount++;
    }

    if (developer) {
      queryText += ` AND d.slug = $${paramCount}`;
      queryParams.push(developer);
      paramCount++;
    }

    if (status) {
      queryText += ` AND p.status = $${paramCount}`;
      queryParams.push(status);
      paramCount++;
    }

    queryText += ` ORDER BY p.created_at DESC LIMIT $${paramCount}`;
    queryParams.push(limit);

    const result = await query(queryText, queryParams);

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    });
  }
});

export default router;
