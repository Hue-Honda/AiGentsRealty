import express from 'express';
import dotenv from 'dotenv';
import { query } from '../config/database.js';
import { generateChatResponse } from '../services/openai.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const router = express.Router();

/**
 * Get ALL projects from database for AI context
 * The AI should always know about the full portfolio
 */
async function getAllProjects() {
  try {
    const queryText = `
      SELECT
        p.id, p.name, p.slug, p.location, p.description,
        p.price_from, p.payment_plan, p.completion_date,
        p.status, p.match_score, p.images,
        p.unit_types, p.amenities,
        d.name as developer_name,
        a.name as area_name, a.slug as area_slug
      FROM projects p
      LEFT JOIN developers d ON p.developer_id = d.id
      LEFT JOIN areas a ON p.area_id = a.id
      WHERE p.status = 'Off Plan'
      ORDER BY p.match_score DESC NULLS LAST, p.created_at DESC
    `;

    const result = await query(queryText);
    return result.rows;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
}

/**
 * Get real-time statistics from database for smarter canvas
 */
async function getDatabaseStats() {
  try {
    const stats = {};

    // Get total counts
    const countsQuery = `
      SELECT
        (SELECT COUNT(*) FROM projects WHERE status = 'Off Plan') as total_projects,
        (SELECT COUNT(*) FROM areas) as total_areas,
        (SELECT COUNT(*) FROM developers) as total_developers
    `;
    const countsResult = await query(countsQuery);
    stats.counts = countsResult.rows[0];

    // Get area statistics with project counts and price ranges
    const areasQuery = `
      SELECT
        a.name, a.slug,
        COUNT(p.id) as project_count,
        MIN(CAST(NULLIF(REGEXP_REPLACE(p.price_from, '[^0-9]', '', 'g'), '') AS NUMERIC)) as min_price,
        MAX(CAST(NULLIF(REGEXP_REPLACE(p.price_from, '[^0-9]', '', 'g'), '') AS NUMERIC)) as max_price
      FROM areas a
      LEFT JOIN projects p ON p.area_id = a.id AND p.status = 'Off Plan'
      GROUP BY a.id, a.name, a.slug
      HAVING COUNT(p.id) > 0
      ORDER BY COUNT(p.id) DESC
    `;
    const areasResult = await query(areasQuery);
    stats.areas = areasResult.rows;

    // Get top developers
    const developersQuery = `
      SELECT
        d.name,
        COUNT(p.id) as project_count
      FROM developers d
      LEFT JOIN projects p ON p.developer_id = d.id AND p.status = 'Off Plan'
      GROUP BY d.id, d.name
      HAVING COUNT(p.id) > 0
      ORDER BY COUNT(p.id) DESC
      LIMIT 5
    `;
    const developersResult = await query(developersQuery);
    stats.topDevelopers = developersResult.rows;

    return stats;
  } catch (error) {
    console.error('Error fetching database stats:', error);
    return null;
  }
}

/**
 * Get detailed area data with real statistics
 */
async function getAreaDetails(areaSlug) {
  try {
    const areaQuery = `
      SELECT
        a.id, a.name, a.slug, a.description, a.image,
        COUNT(p.id) as project_count,
        MIN(CAST(NULLIF(REGEXP_REPLACE(p.price_from, '[^0-9]', '', 'g'), '') AS NUMERIC)) as min_price,
        MAX(CAST(NULLIF(REGEXP_REPLACE(p.price_from, '[^0-9]', '', 'g'), '') AS NUMERIC)) as max_price,
        ARRAY_AGG(DISTINCT d.name) FILTER (WHERE d.name IS NOT NULL) as developers
      FROM areas a
      LEFT JOIN projects p ON p.area_id = a.id AND p.status = 'Off Plan'
      LEFT JOIN developers d ON p.developer_id = d.id
      WHERE a.slug = $1
      GROUP BY a.id, a.name, a.slug, a.description, a.image
    `;
    const result = await query(areaQuery, [areaSlug]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching area details:', error);
    return null;
  }
}

/**
 * Detect what type of canvas action to show based on user message
 * Now async to fetch real data from database
 */
async function detectCanvasAction(message, matchingProjects = [], dbStats = null) {
  const messageLower = message.toLowerCase();

  // Map intent - user wants to see location/map
  const mapKeywords = [
    'show map', 'show me map', 'show the map', 'show me the map', 'map for',
    'where is it', 'where is this', 'location map', 'show location',
    'map of', 'on the map', 'google map', 'see the map', 'see map',
    'where exactly', 'exact location', 'how to get there',
    'directions to', 'navigate to', 'find on map', 'view map'
  ];

  if (mapKeywords.some(keyword => messageLower.includes(keyword))) {
    return {
      type: 'map',
      title: 'Property Location',
      subtitle: 'Interactive map view'
    };
  }

  // Mortgage calculator intent
  const mortgageKeywords = [
    'mortgage', 'calculate mortgage', 'monthly payment', 'loan calculator',
    'home loan', 'financing', 'finance options', 'how much will i pay',
    'emi', 'installments', 'can i afford', 'affordability', 'mortgage calculator',
    'interest rate', 'down payment calculator', 'what can i afford'
  ];
  if (mortgageKeywords.some(keyword => messageLower.includes(keyword))) {
    return {
      type: 'mortgage',
      title: 'Mortgage Calculator',
      subtitle: 'Calculate your monthly payments'
    };
  }

  // Gallery / Virtual tour intent
  const galleryKeywords = [
    'gallery', 'photos', 'pictures', 'images', 'show me photos',
    'virtual tour', 'tour', '360', 'video tour', 'walkthrough',
    'see inside', 'interior', 'what does it look like', 'show images',
    'more pictures', 'property photos', 'view gallery'
  ];
  if (galleryKeywords.some(keyword => messageLower.includes(keyword))) {
    return {
      type: 'gallery',
      title: 'Property Gallery',
      subtitle: 'Photos and virtual tour'
    };
  }

  // Investment analysis intent
  const investmentKeywords = [
    'investment analysis', 'investment return', 'profit', 'profitability',
    'capital appreciation', 'rental income', 'cash flow', 'break even',
    'investment potential', 'is it worth', 'good investment', 'investment calculator',
    'projected returns', 'financial analysis', 'investment breakdown',
    'roi', 'return on investment', 'yield', 'rental yield', 'what is the roi',
    'roi calculator', 'calculate roi', 'show roi'
  ];
  if (investmentKeywords.some(keyword => messageLower.includes(keyword))) {
    return {
      type: 'investment',
      title: 'Investment Analysis',
      subtitle: 'ROI and financial projections'
    };
  }

  // Neighborhood insights intent
  const neighborhoodKeywords = [
    'neighborhood', 'nearby', 'schools nearby', 'hospitals', 'shopping',
    'restaurants', 'metro', 'transport', 'amenities nearby', 'facilities',
    'what is around', 'surroundings', 'lifestyle', 'community facilities',
    'public transport', 'schools', 'healthcare', 'supermarket'
  ];
  if (neighborhoodKeywords.some(keyword => messageLower.includes(keyword))) {
    return {
      type: 'neighborhood',
      title: 'Neighborhood Guide',
      subtitle: 'Nearby amenities and facilities'
    };
  }

  // Booking / Schedule viewing intent
  const bookingKeywords = [
    'book viewing', 'book a viewing', 'schedule visit', 'visit the property', 'see the property',
    'arrange viewing', 'site visit', 'schedule viewing', 'when can i visit',
    'available times', 'schedule tour', 'book a tour', 'visit site',
    'make appointment', 'viewing appointment', 'want to visit'
  ];
  if (bookingKeywords.some(keyword => messageLower.includes(keyword))) {
    return {
      type: 'booking',
      title: 'Schedule a Viewing',
      subtitle: 'Book your property visit'
    };
  }

  // Floor plan intent
  const floorplanKeywords = [
    'floor plan', 'floorplan', 'layout', 'unit layout', 'room layout',
    'apartment layout', 'villa layout', 'show layout', 'see layout',
    'unit plan', 'square feet', 'sqft', 'dimensions', 'room sizes',
    'how big', 'space', 'floor plans'
  ];
  if (floorplanKeywords.some(keyword => messageLower.includes(keyword))) {
    return {
      type: 'floorplan',
      title: 'Floor Plans',
      subtitle: 'Unit layouts and dimensions'
    };
  }

  // Price history intent
  const priceHistoryKeywords = [
    'price history', 'price trend', 'price change', 'historical price',
    'price over time', 'appreciation rate', 'value increase', 'price growth',
    'how much has it increased', 'past prices', 'price evolution',
    'value trend', 'market history'
  ];
  if (priceHistoryKeywords.some(keyword => messageLower.includes(keyword))) {
    return {
      type: 'price_history',
      title: 'Price History',
      subtitle: 'Historical price trends'
    };
  }

  // Lead capture intent - strong buying signals (note: viewing-related phrases are in booking section)
  const leadCaptureKeywords = [
    'contact me', 'call me', 'reach me', 'get in touch',
    'my number', 'my phone', 'my email', 'email me',
    'ready to buy', 'want to buy', 'interested in buying',
    'how do i buy', 'how to buy', 'how can i purchase',
    'talk to agent', 'speak to someone', 'speak to agent',
    'consultation', 'schedule a call',
    'i want to invest', 'ready to invest', 'serious buyer',
    'send me details', 'more information please'
  ];

  if (leadCaptureKeywords.some(keyword => messageLower.includes(keyword))) {
    return {
      type: 'lead_capture',
      title: 'Get Expert Advice',
      subtitle: 'We\'ll contact you within 24 hours'
    };
  }

  // Comparison intent - "compare X vs Y", "which is better", "difference between"
  if (messageLower.includes('compare') || messageLower.includes('vs') ||
      messageLower.includes('versus') || messageLower.includes('difference between') ||
      messageLower.includes('which is better')) {
    return {
      type: 'comparison',
      title: 'Project Comparison',
      subtitle: 'Side-by-side analysis'
    };
  }

  // Timeline/Payment plan intent
  if (messageLower.includes('payment plan') || messageLower.includes('timeline') ||
      messageLower.includes('installment') || messageLower.includes('pay') ||
      messageLower.includes('down payment') || messageLower.includes('milestone')) {
    return {
      type: 'timeline',
      title: 'Payment Timeline',
      subtitle: 'Typical off-plan payment structure'
    };
  }

  // Stats/ROI intent
  if (messageLower.includes('roi') || messageLower.includes('return') ||
      messageLower.includes('statistics') || messageLower.includes('stats') ||
      messageLower.includes('market') || messageLower.includes('trend') ||
      messageLower.includes('yield') || messageLower.includes('appreciation')) {
    return {
      type: 'stats',
      title: 'Market Statistics',
      subtitle: 'ROI and investment data'
    };
  }

  // Developer info intent
  if (messageLower.includes('developer') || messageLower.includes('emaar') ||
      messageLower.includes('damac') || messageLower.includes('nakheel') ||
      messageLower.includes('sobha') || messageLower.includes('meraas') ||
      messageLower.includes('track record') || messageLower.includes('reputation')) {
    return {
      type: 'developer',
      title: 'Developer Profile',
      subtitle: 'Track record and ongoing projects'
    };
  }

  // Area info intent - Extended mapping with more keywords
  const areaMapping = {
    'marina': { title: 'marina', slug: 'dubai-marina' },
    'dubai marina': { title: 'marina', slug: 'dubai-marina' },
    'downtown': { title: 'downtown', slug: 'downtown-dubai' },
    'downtown dubai': { title: 'downtown', slug: 'downtown-dubai' },
    'hills': { title: 'hills', slug: 'dubai-hills-estate' },
    'dubai hills': { title: 'hills', slug: 'dubai-hills-estate' },
    'creek': { title: 'creek', slug: 'dubai-creek-harbour' },
    'dubai creek': { title: 'creek', slug: 'dubai-creek-harbour' },
    'creek harbour': { title: 'creek', slug: 'dubai-creek-harbour' },
    'jvc': { title: 'jvc', slug: 'jumeirah-village-circle' },
    'jumeirah village': { title: 'jvc', slug: 'jumeirah-village-circle' },
    'jumeirah village circle': { title: 'jvc', slug: 'jumeirah-village-circle' },
    'palm': { title: 'palm', slug: 'palm-jumeirah' },
    'palm jumeirah': { title: 'palm', slug: 'palm-jumeirah' },
    'business bay': { title: 'business bay', slug: 'business-bay' },
    'jbr': { title: 'jbr', slug: 'jumeirah-beach-residence' },
    'jumeirah beach': { title: 'jbr', slug: 'jumeirah-beach-residence' },
    'emaar beachfront': { title: 'Emaar Beachfront', slug: 'emaar-beachfront' },
    'beachfront': { title: 'Emaar Beachfront', slug: 'emaar-beachfront' },
    'sobha hartland': { title: 'Sobha Hartland', slug: 'sobha-hartland' },
    'hartland': { title: 'Sobha Hartland', slug: 'sobha-hartland' },
    'damac hills': { title: 'DAMAC Hills', slug: 'damac-hills' },
    'damac lagoons': { title: 'DAMAC Lagoons', slug: 'damac-lagoons' },
    'lagoons': { title: 'DAMAC Lagoons', slug: 'damac-lagoons' },
    'al furjan': { title: 'Al Furjan', slug: 'al-furjan' },
    'furjan': { title: 'Al Furjan', slug: 'al-furjan' },
    'arabian ranches': { title: 'Arabian Ranches', slug: 'arabian-ranches' },
    'ranches': { title: 'Arabian Ranches', slug: 'arabian-ranches' },
    'meydan': { title: 'Meydan', slug: 'meydan' },
    'city walk': { title: 'City Walk', slug: 'city-walk' },
    'bluewaters': { title: 'Bluewaters', slug: 'bluewaters' },
    'tilal al ghaf': { title: 'Tilal Al Ghaf', slug: 'tilal-al-ghaf' },
    'town square': { title: 'Town Square', slug: 'town-square' },
  };

  // Check for area mentions - area info intent
  if (messageLower.includes('area') || messageLower.includes('location') ||
      messageLower.includes('neighborhood') || messageLower.includes('community') ||
      messageLower.includes('tell me about') || messageLower.includes('what is') ||
      messageLower.includes('info about') || messageLower.includes('about the')) {

    for (const [keyword, areaInfo] of Object.entries(areaMapping)) {
      if (messageLower.includes(keyword)) {
        // Fetch real data from database
        const areaData = await getAreaDetails(areaInfo.slug);

        return {
          type: 'area_info',
          title: areaInfo.title,
          slug: areaInfo.slug,
          subtitle: areaData ? `${areaData.project_count} projects available` : 'Area overview and insights',
          data: {
            title: areaInfo.title,
            slug: areaInfo.slug,
            dbData: areaData // Real database data
          }
        };
      }
    }
  }

  // Also check for direct area mentions without "tell me about" etc.
  for (const [keyword, areaInfo] of Object.entries(areaMapping)) {
    if (messageLower.includes(keyword)) {
      // Fetch real data from database
      const areaData = await getAreaDetails(areaInfo.slug);

      return {
        type: 'area_info',
        title: areaInfo.title,
        slug: areaInfo.slug,
        subtitle: areaData ? `${areaData.project_count} projects available` : 'Area overview and insights',
        data: {
          title: areaInfo.title,
          slug: areaInfo.slug,
          dbData: areaData
        }
      };
    }
  }

  // Default: Property search - if we have matching projects or search intent
  if (matchingProjects.length > 0 || hasPropertySearchIntent(message)) {
    return {
      type: 'properties',
      title: 'Matching Properties',
      subtitle: `${matchingProjects.length} properties found`
    };
  }

  // Welcome/default state
  return {
    type: 'welcome',
    title: 'Ask Genie',
    subtitle: 'Your Dubai Property Expert'
  };
}

/**
 * Check if user message indicates property search intent
 */
function hasPropertySearchIntent(message) {
  const messageLower = message.toLowerCase();
  const intentKeywords = [
    'show', 'suggest', 'find', 'search', 'looking', 'want', 'need',
    'bedroom', 'br', 'bed', 'villa', 'apartment', 'penthouse', 'townhouse',
    'property', 'properties', 'project', 'projects', 'investment', 'invest',
    'buy', 'purchase', 'roi', 'return', 'budget', 'under', 'below',
    'million', 'aed', 'price', 'cheap', 'affordable', 'luxury',
    'best', 'top', 'recommend', 'options', 'available', 'living', 'live',
    'ready', 'handover', 'move', 'personal', 'rental', 'yield'
  ];
  return intentKeywords.some(kw => messageLower.includes(kw));
}

/**
 * Query database for projects matching user requirements
 */
async function findMatchingProjects(userMessage) {
  try {
    const messageLower = userMessage.toLowerCase();

    // Check if user has property search intent
    const hasIntent = hasPropertySearchIntent(userMessage);

    // Build dynamic query based on user requirements
    let queryText = `
      SELECT
        p.id, p.name, p.slug, p.location, p.description,
        p.price_from, p.payment_plan, p.completion_date,
        p.status, p.match_score, p.images, p.bedrooms,
        p.unit_types, p.amenities,
        d.name as developer_name,
        a.name as area_name, a.slug as area_slug
      FROM projects p
      LEFT JOIN developers d ON p.developer_id = d.id
      LEFT JOIN areas a ON p.area_id = a.id
      WHERE p.status = 'Off Plan'
    `;

    const params = [];
    let paramCount = 1;
    let hasFilters = false;

    // Filter by bedrooms (detect 1BR, 2BR, 3BR, etc.)
    const bedroomMatch = messageLower.match(/(\d+)\s*(?:br|bed|bedroom)/i);
    if (bedroomMatch) {
      const bedrooms = parseInt(bedroomMatch[1]);
      queryText += ` AND (p.bedrooms = $${paramCount} OR p.bedrooms >= $${paramCount})`;
      params.push(bedrooms);
      paramCount++;
      hasFilters = true;
    }

    // Filter by area keywords
    const areaKeywords = ['marina', 'downtown', 'hills', 'creek', 'business bay', 'jumeirah', 'palm', 'dubai south', 'jvc', 'jbr', 'beachfront', 'hartland'];
    for (const area of areaKeywords) {
      if (messageLower.includes(area)) {
        queryText += ` AND (LOWER(a.name) LIKE $${paramCount} OR LOWER(p.location) LIKE $${paramCount})`;
        params.push(`%${area}%`);
        paramCount++;
        hasFilters = true;
        break;
      }
    }

    // Filter by developer
    const developerKeywords = ['emaar', 'damac', 'nakheel', 'meraas', 'sobha', 'azizi', 'binghatti', 'ellington', 'samana'];
    for (const dev of developerKeywords) {
      if (messageLower.includes(dev)) {
        queryText += ` AND LOWER(d.name) LIKE $${paramCount}`;
        params.push(`%${dev}%`);
        paramCount++;
        hasFilters = true;
        break;
      }
    }

    // Filter by property type
    if (messageLower.includes('villa')) {
      queryText += ` AND (LOWER(p.name) LIKE '%villa%' OR LOWER(p.description) LIKE '%villa%')`;
      hasFilters = true;
    } else if (messageLower.includes('apartment')) {
      queryText += ` AND (LOWER(p.name) LIKE '%apartment%' OR LOWER(p.description) LIKE '%apartment%' OR LOWER(p.name) LIKE '%residence%')`;
      hasFilters = true;
    } else if (messageLower.includes('penthouse')) {
      queryText += ` AND (LOWER(p.name) LIKE '%penthouse%' OR LOWER(p.description) LIKE '%penthouse%')`;
      hasFilters = true;
    }

    // Filter by price (detect "under X million", "below X M", "under XM AED", etc.)
    const priceMatch = messageLower.match(/(?:under|below|less than|max|maximum|budget)\s*(?:aed\s*)?(\d+(?:\.\d+)?)\s*(?:m|million|mil)?/i);
    if (priceMatch) {
      let maxPrice = parseFloat(priceMatch[1]);
      // If number is small (like 2), assume millions
      if (maxPrice < 100) {
        maxPrice = maxPrice * 1000000;
      }
      // Filter by price - extract numeric value from price_from field
      queryText += ` AND (
        CAST(REGEXP_REPLACE(REGEXP_REPLACE(p.price_from, '[^0-9.]', '', 'g'), '^$', '0') AS NUMERIC) <= $${paramCount}
        OR p.price_from IS NULL
      )`;
      params.push(maxPrice);
      paramCount++;
      hasFilters = true;
      console.log(`Price filter applied: max ${maxPrice} AED`);
    }

    // Order by relevance
    queryText += ` ORDER BY p.match_score DESC NULLS LAST, p.created_at DESC LIMIT 6`;

    const result = await query(queryText, params);

    // If user has search intent but no specific filters matched, return top projects
    if (hasIntent && result.rows.length === 0) {
      const fallbackQuery = `
        SELECT
          p.id, p.name, p.slug, p.location, p.description,
          p.price_from, p.payment_plan, p.completion_date,
          p.status, p.match_score, p.images, p.bedrooms,
          p.unit_types, p.amenities,
          d.name as developer_name,
          a.name as area_name, a.slug as area_slug
        FROM projects p
        LEFT JOIN developers d ON p.developer_id = d.id
        LEFT JOIN areas a ON p.area_id = a.id
        WHERE p.status = 'Off Plan'
        ORDER BY p.match_score DESC NULLS LAST, p.created_at DESC
        LIMIT 6
      `;
      const fallbackResult = await query(fallbackQuery);
      return fallbackResult.rows;
    }

    // If user has search intent, always return results
    if (hasIntent && result.rows.length > 0) {
      return result.rows;
    }

    // Return results if we had filters, otherwise empty (don't show cards for greetings)
    return hasFilters ? result.rows : [];
  } catch (error) {
    console.error('Error finding matching projects:', error);
    return [];
  }
}

/**
 * Generate fallback response when Ollama is not available
 */
function generateFallbackResponse(userMessage, projects) {
  const messageLower = userMessage.toLowerCase();

  // Greeting responses
  if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey')) {
    return "Hello! I'm Genie, your AI property assistant. I'm here to help you find the perfect off-plan investment in Dubai. What are you looking for today?";
  }

  // ROI queries
  if (messageLower.includes('roi') || messageLower.includes('return') || messageLower.includes('investment') || messageLower.includes('best')) {
    if (projects.length > 0) {
      return `**Great question about ROI!** Dubai off-plan properties typically offer 15-30% capital appreciation during construction.

I've loaded ${projects.length} high-ROI projects to your preview panel on the left. Here are my top picks:

${projects.slice(0, 3).map((p, i) => `${i + 1}. **${p.name}** - ${p.location}
   💰 Starting from ${p.price_from}
   📅 Payment Plan: ${p.payment_plan}
   🏗️ Handover: ${p.completion_date || 'Q2 2027'}
   ✨ By ${p.developer_name}`).join('\n\n')}

**Click any card on the left to see full details.** Would you like me to narrow down based on your budget or preferred area?`;
    }
  }

  // Location queries
  if (messageLower.includes('location') || messageLower.includes('where') || messageLower.includes('area')) {
    if (projects.length > 0) {
      return `I've loaded properties from prime Dubai locations to your preview panel 👈

${projects.slice(0, 3).map((p, i) => `${i + 1}. **${p.name}** in ${p.location}
   Starting from ${p.price_from}
   Payment Plan: ${p.payment_plan}`).join('\n\n')}

**Browse the cards on the left** to explore each property. Which area interests you most?`;
    }
  }

  // Default response with projects
  if (projects.length > 0) {
    return `I found ${projects.length} properties matching your criteria - **check out the cards on the left!**

${projects.slice(0, 3).map((p, i) => `**${i + 1}. ${p.name}** by ${p.developer_name}
📍 ${p.location}
💰 From ${p.price_from}
📊 Payment: ${p.payment_plan}
🏗️ Completion: ${p.completion_date || 'Q2 2027'}`).join('\n\n')}

${projects.length > 3 ? `\n...and ${projects.length - 3} more properties.\n` : ''}

**Click any card to view full details.** Want me to filter these further?`;
  }

  // No projects found
  return "I understand you're looking for off-plan properties in Dubai. Could you tell me more about:\n\n1. Your preferred location?\n2. Budget range?\n3. Property type (apartment, villa, townhouse)?\n4. Bedrooms needed?\n\nThis will help me find the perfect match for you!";
}

/**
 * Save a lead to the database
 */
async function saveLead(leadData) {
  try {
    const {
      name, phone, email, budget, interested_project,
      preferred_area, bedrooms, timeline, investment_purpose, notes
    } = leadData;

    // Only save if we have at least a phone or email
    if (!phone && !email) {
      console.log('Lead not saved - no contact info provided');
      return { success: false, reason: 'No contact information' };
    }

    const queryText = `
      INSERT INTO leads (
        name, phone, email, budget, interested_project,
        preferred_area, bedrooms, timeline, investment_purpose, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
      notes || null
    ];

    const result = await query(queryText, params);
    console.log('Lead saved successfully:', result.rows[0]);
    return { success: true, leadId: result.rows[0].id };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error: error.message };
  }
}

/**
 * POST /api/chat
 * Send a message to the AI and get a response
 */
router.post('/', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Message is required and must be a non-empty string'
      });
    }

    // Get ALL projects from database - AI should always know the full portfolio
    const allProjects = await getAllProjects();
    console.log(`Loaded ${allProjects.length} projects for AI context`);

    // Build project context for AI with FULL portfolio
    let projectContext = '';
    if (allProjects.length > 0) {
      projectContext = '\n\n## OUR COMPLETE OFF-PLAN PORTFOLIO:\n\n';
      allProjects.forEach((project, index) => {
        const bedrooms = project.unit_types?.map((u) => u.bedrooms).filter(Boolean).join(', ') || 'N/A';
        const amenitiesStr = project.amenities?.slice(0, 5).join(', ') || 'Premium amenities';

        projectContext += `${index + 1}. **${project.name}** by ${project.developer_name}
   - Location: ${project.location || project.area_name}
   - Starting Price: ${project.price_from || 'Contact for pricing'}
   - Payment Plan: ${project.payment_plan || 'Flexible plans available'}
   - Completion: ${project.completion_date || 'TBA'}
   - Bedrooms: ${bedrooms}
   - Key Features: ${amenitiesStr}
   - Description: ${project.description || 'Luxury off-plan development'}
   - View: /areas/${project.area_slug}/${project.slug}

`;
      });

      projectContext += `\n**CRITICAL**: These are ALL ${allProjects.length} real projects in our current portfolio. You MUST ONLY recommend from these specific projects. When a client asks about properties, recommend from this list based on their requirements. Use exact project names, prices, and details.\n`;
    } else {
      projectContext = '\n\n**NOTE**: No projects currently available in the database. Ask the client to check back later or contact the team directly.\n';
    }

    // Build the conversation context
    const systemPrompt = `You are Genie, a senior off-plan property specialist at AiGentsRealty with over 10 years of experience in Dubai's real estate market. You are a trusted advisor who speaks with confidence, professionalism, and deep industry knowledge.${projectContext}

## Your Expertise:
- **Off-Plan Properties**: You specialize exclusively in pre-construction and under-construction properties in Dubai
- **Payment Plans**: Expert in analyzing and explaining 80/20, 70/30, 60/40 payment structures and their financial implications
- **Investment Analysis**: Calculate ROI, rental yields, capital appreciation potential, and market trends
- **Developer Insights**: Deep knowledge of Emaar, DAMAC, Nakheel, Sobha, Meraas - their track records, quality standards, and delivery timelines
- **Market Intelligence**: Current prices, best-value areas, upcoming hotspots, and market cycles
- **Legal & Compliance**: RERA regulations, DLD procedures, ownership structures (freehold vs leasehold), and investor protections
- **Handover & Timeline Management**: Realistic expectations on completion dates, possession procedures, and snagging processes

## Your Communication Style:
- Speak as a knowledgeable professional, not a generic chatbot
- Use industry terminology naturally (handover, snagging, Oqood, No Objection Certificate, Title Deed)
- Provide specific numbers, percentages, and data points when discussing investments
- Share insights like "In my experience..." or "From what I've seen in the market..."
- Be honest about risks and realistic about timelines
- Guide clients through complex decisions with confidence
- Ask qualifying questions to understand their budget, timeline, and investment goals

## Your Approach - BE ACTION-ORIENTED AND SHOW PROPERTIES:
1. **SHOW PROPERTIES QUICKLY**: When a user mentions ANY property-related need (bedrooms, budget, area, type), IMMEDIATELY recommend 2-3 specific projects. Don't ask endless questions - SHOW options!

2. **Ask ONE question at a time**: If you need more info, ask ONE clarifying question while still showing some relevant options.

3. **When User Says "Suggest" or "Show"**: ALWAYS recommend properties immediately. Don't ask "what are you looking for?" - show your best picks!

4. **Use the Live Preview**: Remember that cards appear on the left automatically. Tell users: "I've loaded some options on the left - take a look!"

5. **Be Specific**: Use exact project names, prices, and locations from your portfolio. Never give vague responses.

6. **Example Flow**:
   - User: "3BR under 2M"
   - Good: "Great choice! I've loaded 3-bedroom options under AED 2M to your preview. Here are my top picks: [list 2-3 projects]. Click any card to explore!"
   - Bad: "What area are you interested in? What's your timeline? Is this for investment?"

7. **Educate While Showing**: Explain payment plans, ROI potential briefly while presenting options

## SMART CANVAS INTERACTIVE TOOLS - EMBRACE THESE FEATURES:
You have access to interactive Smart Canvas tools that appear on screen when users ask about them. ALWAYS help with these - they are core features:

📊 **MORTGAGE CALCULATOR** - When users ask "calculate mortgage", "monthly payment", "can I afford", "EMI calculator":
→ Say: "Great! I've opened the Mortgage Calculator on the right. You can adjust the loan amount, down payment %, and tenure to see your estimated monthly payments. In Dubai, typical mortgage rates are around 4-6% for residents."

🖼️ **GALLERY & VIRTUAL TOURS** - When users ask "show photos", "pictures", "virtual tour", "what does it look like":
→ Say: "I've loaded the property gallery for you! You can browse images and see what the project looks like. Want me to tell you more about the finishes and amenities?"

📈 **INVESTMENT ANALYSIS** - When users ask "investment analysis", "ROI breakdown", "is it a good investment":
→ Say: "I've opened the Investment Analysis tool showing projected returns, rental yield, and capital appreciation. Dubai off-plan typically sees 15-30% gains during construction."

🏘️ **NEIGHBORHOOD GUIDE** - When users ask "what's nearby", "schools nearby", "hospitals nearby", "amenities", "what schools", "what hospitals":
→ Say: "I've opened the Neighborhood Guide showing nearby facilities! Dubai's prime areas typically offer excellent schools (GEMS, Taaleem), healthcare (Mediclinic, NMC), malls, and metro access. Which area or property are you interested in? I can give you specific details!"

📅 **BOOKING/VIEWING** - When users ask "book viewing", "schedule visit", "want to see the property":
→ Say: "I've opened the booking form! Fill in your preferred date and time, and our team will confirm your viewing appointment."

📐 **FLOOR PLANS** - When users ask "floor plan", "layout", "room sizes", "sqft":
→ Say: "I've loaded the floor plans for you to explore. You can see the unit layouts and dimensions."

📉 **PRICE HISTORY** - When users ask "price history", "how much has it increased", "value trend":
→ Say: "Here's the price trend chart showing how values have changed. Dubai Marina, for example, has seen steady 8-12% annual appreciation."

🗺️ **MAP VIEW** - When users ask "show map", "where is it", "location on map":
→ Say: "I've loaded the map showing the exact location. You can see nearby landmarks and transit options."

These are NOT off-topic! They are essential property research tools. ALWAYS engage helpfully with these requests.

⚠️ **IMPORTANT**: Questions about "schools nearby", "hospitals nearby", "what's around", "amenities", "metro", "transport" are PROPERTY-RELATED questions about neighborhood facilities. These are ON-TOPIC and you should HELP with them using the Neighborhood Guide canvas. Do NOT deflect these as off-topic!

## STRICT BOUNDARIES - YOU MUST FOLLOW THESE RULES:
❌ **NEVER answer questions about:**
- General knowledge, trivia, or world events unrelated to Dubai real estate
- Programming, coding, or technical help
- Health, medical, or legal advice (except Dubai property law)
- Politics, religion, or controversial topics
- Math problems, homework, or academic questions (mortgage calculations ARE allowed!)
- Recipes, travel outside UAE, entertainment, or non-real-estate lifestyle
- Any topic NOT related to Dubai real estate or the canvas tools above

✅ **ONLY discuss:**
- Dubai off-plan properties (pre-construction and under-construction ONLY)
- Properties from our portfolio listed above
- Dubai real estate market trends and investment opportunities
- Payment plans, ROI calculations, and financing options
- Mortgage calculations and affordability (use the Canvas calculator!)
- Developers, areas, and property features in Dubai
- RERA regulations and Dubai property laws
- Property viewing appointments and consultation booking
- Floor plans, galleries, and property visuals
- Neighborhood amenities and area guides
- Price history and market trends

## LIVE PREVIEW FEATURE - IMPORTANT:
When you recommend properties, they will AUTOMATICALLY appear as visual cards on the left side of the screen for the user to browse. Reference this feature naturally in your responses:
- "I've added some options to your preview panel on the left..."
- "Check out the property cards I've loaded for you..."
- "Take a look at these projects appearing on the left..."
- "I'm showing you X properties that match your criteria..."

This makes the experience interactive - you talk, they see visual cards instantly!

## How to Start Conversations:
When someone says "hello", "hi", or similar greetings, DON'T just introduce yourself. Engage them immediately:

"Hello! I'm Genie, your off-plan property specialist in Dubai.

I'd love to help you find the perfect investment. As we chat, I'll show you matching properties on the left side of your screen.

**What are you looking for - a specific area, budget range, or shall I recommend based on your goals?**"

## How to Handle TRULY Off-Topic Questions:
Only use this deflection for CLEARLY unrelated topics like programming, cooking, politics, health advice, etc.
**DO NOT** deflect questions about: schools nearby, hospitals, amenities, transport, metro, neighborhoods, mortgage calculations, floor plans, price history, investment analysis, viewing appointments - these are ALL property-related!

If someone asks about something TRULY unrelated (like "how to code in Python" or "what's the capital of France"), respond like this:

"I appreciate your question, but I'm specialized exclusively in Dubai off-plan properties. I can help you find the perfect investment opportunity in Dubai's real estate market.

Let me ask you this instead - what's your budget range? I can recommend some great options:
• Under AED 1M: Studios and 1-beds with high rental yields
• AED 1-3M: Family apartments in prime areas
• AED 3M+: Villas and luxury penthouses

Which range interests you?"

## Important Guidelines:
- ONLY recommend properties from the portfolio provided above
- Provide realistic ROI expectations (typically 7-12% annually for Dubai off-plan)
- Mention both opportunities AND risks (market cycles, developer delays, oversupply concerns)
- Use AED (Arab Emirates Dirham) for all pricing
- Always redirect to Dubai real estate if asked about other topics
- Typical payment plans: 10-20% down, 60-70% during construction, 20-30% on handover

## CRITICAL - URL FORMAT:
When providing project links, ALWAYS use relative paths starting with "/areas/".
NEVER include domain names like "aigentsrealty.com" or "www.aigentsrealty.com" in any links.
✅ CORRECT: [View Project](/areas/dubai-creek-harbour/creek-heights)
❌ WRONG: [View Project](https://aigentsrealty.com/areas/dubai-creek-harbour/creek-heights)
❌ WRONG: [View Project](https://www.aigentsrealty.com/areas/dubai-creek-harbour/creek-heights)
The links must be relative paths only - no domain names!

## LEAD CAPTURE - VERY IMPORTANT:
When a client provides ANY of the following, use the save_lead function to capture their information:
- Phone number (e.g., "call me at 050-123-4567", "my number is +971...")
- Email address (e.g., "email me at...", "my email is...")
- Expresses strong buying intent (e.g., "I want to buy", "I'm ready to invest", "book a viewing")

When you capture a lead:
1. Call the save_lead function with all information you have gathered from the conversation
2. Confirm to the client that you've saved their details
3. Let them know a specialist will contact them within 24 hours
4. Continue helping them with any questions

Remember: You are a Dubai off-plan property specialist ONLY. Stay in your lane. Never provide information outside your expertise. Your ONLY job is to help clients find and invest in Dubai off-plan properties from our portfolio.`;

    // Build messages array for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Call OpenAI API with function calling enabled
    try {
      const aiResponse = await generateChatResponse(messages, {
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 1000,
        enableFunctions: true // Enable lead capture function
      });

      // Handle function call (lead capture)
      if (aiResponse.type === 'function_call' && aiResponse.function_name === 'save_lead') {
        console.log('Function call detected: save_lead', aiResponse.arguments);

        // Save the lead to database
        const leadResult = await saveLead(aiResponse.arguments);

        // Build a follow-up message to get AI's confirmation response
        const followUpMessages = [
          ...messages,
          {
            role: 'assistant',
            content: null,
            tool_calls: [{
              id: 'call_lead',
              type: 'function',
              function: {
                name: 'save_lead',
                arguments: JSON.stringify(aiResponse.arguments)
              }
            }]
          },
          {
            role: 'tool',
            tool_call_id: 'call_lead',
            content: JSON.stringify({
              success: leadResult.success,
              message: leadResult.success
                ? 'Lead saved successfully. Confirm to the client that their details have been saved and a specialist will contact them within 24 hours.'
                : 'Could not save lead. Ask the client to provide a phone number or email.'
            })
          }
        ];

        // Get the AI's confirmation response
        const confirmationResponse = await generateChatResponse(followUpMessages, {
          model: 'gpt-4o-mini',
          temperature: 0.7,
          max_tokens: 500,
          enableFunctions: false // No functions for confirmation
        });

        return res.json({
          message: confirmationResponse.content || confirmationResponse,
          model: 'gpt-4o-mini',
          timestamp: new Date().toISOString(),
          leadCaptured: leadResult.success,
          leadId: leadResult.leadId
        });
      }

      // Find projects matching the user's query to display as cards
      const matchingProjects = await findMatchingProjects(message);
      console.log(`Found ${matchingProjects.length} matching projects for: "${message}"`);

      const recommendedProjects = matchingProjects.slice(0, 4).map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        location: p.location || p.area_name,
        price_from: p.price_from,
        payment_plan: p.payment_plan,
        completion_date: p.completion_date,
        images: p.images,
        area_slug: p.area_slug,
        developer_name: p.developer_name
      }));

      // Detect what canvas action to show (now async for real-time data)
      const canvasAction = await detectCanvasAction(message, recommendedProjects);
      canvasAction.projects = recommendedProjects;

      // If comparison, use first 2 projects for comparison
      if (canvasAction.type === 'comparison' && recommendedProjects.length >= 2) {
        canvasAction.compareItems = recommendedProjects.slice(0, 2);
      }

      // Regular text response with canvas action
      console.log(`Canvas action: ${canvasAction.type}, returning ${recommendedProjects.length} projects`);

      res.json({
        message: aiResponse.content || aiResponse,
        model: 'gpt-4o-mini',
        timestamp: new Date().toISOString(),
        recommendedProjects: recommendedProjects.length > 0 ? recommendedProjects : null,
        canvas: canvasAction
      });
    } catch (aiError) {
      console.error('OpenAI API error:', aiError);

      // Fallback response when OpenAI is not available
      return res.json({
        message: generateFallbackResponse(message, allProjects),
        model: 'fallback',
        timestamp: new Date().toISOString(),
        note: 'OpenAI service unavailable, using fallback response'
      });
    }

  } catch (error) {
    console.error('Chat endpoint error:', error);

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while processing your request',
      fallback: true
    });
  }
});

export default router;
