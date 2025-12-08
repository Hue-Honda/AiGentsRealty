import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/projects/search - Search projects by name
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json({
        success: true,
        data: []
      });
    }

    const result = await query(
      `SELECT
        p.*,
        d.name as developer_name,
        d.logo as developer_logo,
        a.name as area_name,
        a.slug as area_slug
       FROM projects p
       LEFT JOIN developers d ON p.developer_id = d.id
       LEFT JOIN areas a ON p.area_id = a.id
       WHERE LOWER(p.name) LIKE LOWER($1)
          OR LOWER(d.name) LIKE LOWER($1)
          OR LOWER(a.name) LIKE LOWER($1)
       ORDER BY
         CASE WHEN LOWER(p.name) LIKE LOWER($2) THEN 0 ELSE 1 END,
         p.name ASC
       LIMIT 8`,
      [`%${q}%`, `${q}%`]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error searching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search projects'
    });
  }
});

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

// GET /api/projects/slug/:slug - Get single project by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await query(
      `SELECT
        p.*,
        d.name as developer_name,
        d.logo as developer_logo,
        d.slug as developer_slug,
        a.name as area_name,
        a.slug as area_slug,
        a.description as area_description
       FROM projects p
       LEFT JOIN developers d ON p.developer_id = d.id
       LEFT JOIN areas a ON p.area_id = a.id
       WHERE p.slug = $1`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project'
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
