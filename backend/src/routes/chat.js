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
 * Query database for projects matching user requirements
 */
async function findMatchingProjects(userMessage) {
  try {
    // Extract keywords and requirements from user message
    const messageLower = userMessage.toLowerCase();

    // Build dynamic query based on user requirements
    let queryText = `
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
    `;

    const params = [];
    let paramCount = 1;

    // Filter by area keywords
    const areaKeywords = ['marina', 'downtown', 'hills', 'creek', 'business bay', 'jumeirah', 'palm', 'dubai south'];
    for (const area of areaKeywords) {
      if (messageLower.includes(area)) {
        queryText += ` AND (LOWER(a.name) LIKE $${paramCount} OR LOWER(p.location) LIKE $${paramCount})`;
        params.push(`%${area}%`);
        paramCount++;
        break;
      }
    }

    // Filter by developer
    const developerKeywords = ['emaar', 'damac', 'nakheel', 'meraas', 'sobha', 'azizi'];
    for (const dev of developerKeywords) {
      if (messageLower.includes(dev)) {
        queryText += ` AND LOWER(d.name) LIKE $${paramCount}`;
        params.push(`%${dev}%`);
        paramCount++;
        break;
      }
    }

    // Filter by budget (extract numbers)
    const budgetMatch = messageLower.match(/(\d+(?:\.\d+)?)\s*(?:m|million|k|thousand)/i);
    if (budgetMatch) {
      let budget = parseFloat(budgetMatch[1]);
      if (messageLower.includes('k') || messageLower.includes('thousand')) {
        budget = budget * 1000;
      } else if (messageLower.includes('m') || messageLower.includes('million')) {
        budget = budget * 1000000;
      }
      // Price is stored as text like "AED 900K", so we'll order by match_score instead
      // and filter in application logic
    }

    // Order by relevance
    queryText += ` ORDER BY p.match_score DESC NULLS LAST, p.created_at DESC LIMIT 5`;

    const result = await query(queryText, params);
    return result.rows;
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

I found ${projects.length} excellent projects for you:

${projects.slice(0, 3).map((p, i) => `${i + 1}. **${p.name}** - ${p.location}
   💰 Starting from ${p.price_from}
   📅 Payment Plan: ${p.payment_plan}
   🏗️ Handover: ${p.completion_date || 'Q2 2027'}
   ✨ By ${p.developer_name}`).join('\n\n')}

Would you like detailed ROI projections for any of these?`;
    }
  }

  // Location queries
  if (messageLower.includes('location') || messageLower.includes('where') || messageLower.includes('area')) {
    if (projects.length > 0) {
      return `I found some excellent properties in prime Dubai locations:

${projects.slice(0, 3).map((p, i) => `${i + 1}. **${p.name}** in ${p.location}
   Starting from ${p.price_from}
   Payment Plan: ${p.payment_plan}`).join('\n\n')}

Each location offers unique benefits. Which area interests you most?`;
    }
  }

  // Default response with projects
  if (projects.length > 0) {
    return `I found ${projects.length} properties that match your criteria:

${projects.slice(0, 3).map((p, i) => `**${i + 1}. ${p.name}** by ${p.developer_name}
📍 ${p.location}
💰 From ${p.price_from}
📊 Payment: ${p.payment_plan}
🏗️ Completion: ${p.completion_date || 'Q2 2027'}`).join('\n\n')}

${projects.length > 3 ? `\n...and ${projects.length - 3} more properties.\n` : ''}

Would you like more details about any of these properties?`;
  }

  // No projects found
  return "I understand you're looking for off-plan properties in Dubai. Could you tell me more about:\n\n1. Your preferred location?\n2. Budget range?\n3. Property type (apartment, villa, townhouse)?\n4. Bedrooms needed?\n\nThis will help me find the perfect match for you!";
}

// Ollama configuration from env
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama2';

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

    // Query database for matching projects based on user message
    const matchingProjects = await findMatchingProjects(message);
    console.log(`Found ${matchingProjects.length} matching projects for query`);

    // Build project context for AI
    let projectContext = '';
    if (matchingProjects.length > 0) {
      projectContext = '\n\n## AVAILABLE PROJECTS IN OUR PORTFOLIO:\n\n';
      matchingProjects.forEach((project, index) => {
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
   - View: https://aigentsrealty.com/areas/${project.area_slug}/${project.slug}

`;
      });

      projectContext += `\n**IMPORTANT**: These are REAL projects from our current portfolio. You MUST recommend from these specific projects based on the client's requirements. Discuss their features, benefits, payment plans, and ROI potential. Use the exact project names, prices, and details provided above.\n`;
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

## Your Approach:
1. **Understand First**: Ask about budget, purpose (investment vs. end-use), preferred areas, and timeline
2. **Retrieve & Match**: When client shares requirements, I provide you with matching projects from our database above
3. **Recommend SPECIFIC Projects**: You MUST recommend the actual projects listed above - use their exact names, prices, and features
4. **Compare Options**: Compare 2-3 projects from the list, highlighting pros/cons of each
5. **Educate**: Explain payment plans, ROI calculations, and why each project fits their needs
6. **Close**: Provide the project URL and guide them to view details or book a consultation

## STRICT BOUNDARIES - YOU MUST FOLLOW THESE RULES:
❌ **NEVER answer questions about:**
- General knowledge, trivia, or world events
- Programming, coding, or technical help
- Health, medical, or legal advice
- Politics, religion, or controversial topics
- Math problems, homework, or academic questions
- Recipes, travel, entertainment, or lifestyle
- Any topic NOT related to Dubai real estate

✅ **ONLY discuss:**
- Dubai off-plan properties (pre-construction and under-construction ONLY)
- Properties from our portfolio listed above
- Dubai real estate market trends and investment opportunities
- Payment plans, ROI calculations, and financing options
- Developers, areas, and property features in Dubai
- RERA regulations and Dubai property laws
- Property viewing appointments and consultation booking

## How to Handle Off-Topic Questions:
If someone asks about ANYTHING other than Dubai off-plan real estate, respond EXACTLY like this:

"I appreciate your question, but I'm specialized exclusively in Dubai off-plan properties. I can help you find the perfect investment opportunity in Dubai's real estate market.

Would you like to know about:
• High-ROI projects under 2M AED?
• Best areas for capital appreciation?
• Payment plans that fit your budget?
• Our current off-plan portfolio?

Let me know your budget and preferences, and I'll recommend the best properties for you!"

## Important Guidelines:
- ONLY recommend properties from the portfolio provided above
- Provide realistic ROI expectations (typically 7-12% annually for Dubai off-plan)
- Mention both opportunities AND risks (market cycles, developer delays, oversupply concerns)
- Use AED (Arab Emirates Dirham) for all pricing
- Always redirect to Dubai real estate if asked about other topics
- Typical payment plans: 10-20% down, 60-70% during construction, 20-30% on handover

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

    // Call OpenAI API
    try {
      const aiResponse = await generateChatResponse(messages, {
        model: 'gpt-4o-mini', // Using GPT-4o-mini for best cost/performance ratio
        temperature: 0.7,
        max_tokens: 1000
      });

      res.json({
        message: aiResponse,
        model: 'gpt-4o-mini',
        timestamp: new Date().toISOString()
      });
    } catch (aiError) {
      console.error('OpenAI API error:', aiError);

      // Fallback response when OpenAI is not available
      return res.json({
        message: generateFallbackResponse(message, matchingProjects),
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
