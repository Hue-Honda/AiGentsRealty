import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/developers - Get all developers with project counts
router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT
        d.*,
        COUNT(p.id) as project_count,
        ROUND(AVG(p.match_score)::numeric, 1) as avg_roi
       FROM developers d
       LEFT JOIN projects p ON d.id = p.developer_id
       GROUP BY d.id
       ORDER BY project_count DESC, d.name ASC`
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching developers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch developers'
    });
  }
});

// GET /api/developers/featured - Get top developers for homepage
router.get('/featured', async (req, res) => {
  try {
    const result = await query(
      `SELECT
        d.*,
        COUNT(p.id) as project_count,
        ROUND(AVG(p.match_score)::numeric, 1) as avg_roi
       FROM developers d
       LEFT JOIN projects p ON d.id = p.developer_id
       GROUP BY d.id
       ORDER BY project_count DESC
       LIMIT 6`
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching featured developers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured developers'
    });
  }
});

// GET /api/developers/:slug - Get developer by slug with their projects
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Get developer details
    const devResult = await query(
      'SELECT * FROM developers WHERE slug = $1',
      [slug]
    );

    if (devResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Developer not found'
      });
    }

    const developer = devResult.rows[0];

    // Get projects by this developer
    const projectsResult = await query(
      `SELECT
        p.*,
        a.name as area_name,
        a.slug as area_slug
       FROM projects p
       LEFT JOIN areas a ON p.area_id = a.id
       WHERE p.developer_id = $1
       ORDER BY p.created_at DESC`,
      [developer.id]
    );

    res.json({
      success: true,
      data: {
        ...developer,
        projects: projectsResult.rows,
        project_count: projectsResult.rows.length
      }
    });
  } catch (error) {
    console.error('Error fetching developer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch developer details'
    });
  }
});

export default router;
