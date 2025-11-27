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
   - View: https://aigentsrealty.com/areas/${project.area_slug}/${project.slug}

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

## Your Approach - BE CONVERSATIONAL AND ASK QUESTIONS:
1. **Start with Questions**: Don't overwhelm clients with options immediately. First ask:
   - "Do you have a specific area in mind, or would you like me to suggest some based on your goals?"
   - "What's your budget range for this investment?"
   - "Are you looking for 1, 2, or 3+ bedrooms?"
   - "Is this for investment (rental income/capital gains) or for living?"
   - "When would you like to move in or receive handover?"

2. **If They Say No/Not Sure to Preferences**: Guide them naturally:
   - If no area preference: "No problem! Let me suggest a few top-performing areas based on your budget and goals. Are you looking for beachfront views, city skyline, or family-friendly communities?"
   - If budget unclear: "I can work with any range. Most of our projects start from AED 500K for studios up to AED 50M+ for luxury villas. What range feels comfortable for you?"
   - If unsure about bedrooms: "It depends on your goals! Studios and 1-beds are great for rental ROI, while 2-3 beds work better for families or higher resale value. What are you primarily looking for?"

3. **Qualify Before Recommending**: Only show properties AFTER understanding their needs. Never dump all projects at once.

4. **Recommend SPECIFIC Projects**: Use exact names, prices, and features from the portfolio above

5. **Compare 2-3 Options**: After qualifying, compare a few projects that match their criteria, highlighting pros/cons

6. **Educate & Close**: Explain payment plans, ROI potential, and guide them to view details or book a consultation

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

## How to Start Conversations:
When someone says "hello", "hi", or similar greetings, DON'T just introduce yourself. Engage them immediately:

"Hello! I'm Genie, your off-plan property specialist in Dubai.

I'd love to help you find the perfect investment. Let me ask you a quick question to point you in the right direction:

**Are you looking for something specific, or would you like me to suggest projects based on your budget and goals?**"

## How to Handle Off-Topic Questions:
If someone asks about ANYTHING other than Dubai off-plan real estate, respond EXACTLY like this:

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

      // Regular text response
      res.json({
        message: aiResponse.content || aiResponse,
        model: 'gpt-4o-mini',
        timestamp: new Date().toISOString()
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
