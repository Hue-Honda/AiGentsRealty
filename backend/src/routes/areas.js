import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/areas - Get all areas
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM areas ORDER BY name ASC'
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch areas'
    });
  }
});

// GET /api/areas/:slug - Get area by slug with projects
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Get area details
    const areaResult = await query(
      'SELECT * FROM areas WHERE slug = $1',
      [slug]
    );

    if (areaResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Area not found'
      });
    }

    const area = areaResult.rows[0];

    // Get projects in this area
    const projectsResult = await query(
      `SELECT
        p.*,
        d.name as developer_name,
        d.logo as developer_logo
       FROM projects p
       LEFT JOIN developers d ON p.developer_id = d.id
       WHERE p.area_id = $1
       ORDER BY p.name ASC`,
      [area.id]
    );

    res.json({
      success: true,
      data: {
        ...area,
        projects: projectsResult.rows
      }
    });
  } catch (error) {
    console.error('Error fetching area:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch area details'
    });
  }
});

// GET /api/areas/:areaSlug/projects/:projectSlug - Get specific project
router.get('/:areaSlug/projects/:projectSlug', async (req, res) => {
  try {
    const { areaSlug, projectSlug } = req.params;

    const result = await query(
      `SELECT
        p.*,
        d.name as developer_name,
        d.logo as developer_logo,
        d.description as developer_description,
        a.name as area_name,
        a.slug as area_slug
       FROM projects p
       LEFT JOIN developers d ON p.developer_id = d.id
       LEFT JOIN areas a ON p.area_id = a.id
       WHERE p.slug = $1 AND a.slug = $2`,
      [projectSlug, areaSlug]
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
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project details'
    });
  }
});

export default router;
