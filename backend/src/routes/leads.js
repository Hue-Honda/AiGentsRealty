import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

/**
 * POST /api/leads
 * Create a new lead from the contact form
 */
router.post('/', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      budget,
      interested_project,
      preferred_area,
      bedrooms,
      timeline,
      investment_purpose,
      notes
    } = req.body;

    // Validate - need at least phone or email
    if (!phone && !email) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Please provide a phone number or email address'
      });
    }

    // Insert lead into database
    const queryText = `
      INSERT INTO leads (
        name, phone, email, budget, interested_project,
        preferred_area, bedrooms, timeline, investment_purpose, notes,
        source
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, created_at
    `;

    const params = [
      name || null,
      phone || null,
      email || null,
      budget || null,
      interested_project || null,
      preferred_area || null,
      bedrooms || null,
      timeline || null,
      investment_purpose || null,
      notes || null,
      'canvas_form' // Source identifier
    ];

    const result = await query(queryText, params);

    console.log('Lead saved from canvas form:', result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Thank you! Our team will contact you within 24 hours.',
      leadId: result.rows[0].id
    });

  } catch (error) {
    console.error('Error saving lead:', error);

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to save your details. Please try again.'
    });
  }
});

/**
 * GET /api/leads
 * Get all leads (for admin dashboard - should be protected in production)
 */
router.get('/', async (req, res) => {
  try {
    const queryText = `
      SELECT
        id, name, phone, email, budget, interested_project,
        preferred_area, bedrooms, timeline, investment_purpose,
        notes, source, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 100
    `;

    const result = await query(queryText);

    res.json({
      success: true,
      count: result.rows.length,
      leads: result.rows
    });

  } catch (error) {
    console.error('Error fetching leads:', error);

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch leads'
    });
  }
});

export default router;
