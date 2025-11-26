import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function definitions for OpenAI function calling
const leadCaptureFunctions = [
  {
    type: 'function',
    function: {
      name: 'save_lead',
      description: 'Save a potential client\'s contact information and property preferences when they express interest in being contacted, provide contact details, or show strong buying intent. Call this function when you have at least a phone number OR email.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The client\'s name if provided'
          },
          phone: {
            type: 'string',
            description: 'The client\'s phone number (e.g., 050-123-4567, +971501234567)'
          },
          email: {
            type: 'string',
            description: 'The client\'s email address'
          },
          budget: {
            type: 'string',
            description: 'The client\'s budget range (e.g., "1.5M AED", "under 2 million")'
          },
          interested_project: {
            type: 'string',
            description: 'The specific project they are interested in (e.g., "Marina Gate", "Creek Waters")'
          },
          preferred_area: {
            type: 'string',
            description: 'Their preferred area in Dubai (e.g., "Dubai Marina", "Downtown", "Business Bay")'
          },
          bedrooms: {
            type: 'string',
            description: 'Number of bedrooms they want (e.g., "2", "2-3", "studio")'
          },
          timeline: {
            type: 'string',
            description: 'When they plan to buy (e.g., "this year", "next 6 months", "Q1 2025")'
          },
          investment_purpose: {
            type: 'string',
            enum: ['investment', 'end-use', 'both'],
            description: 'Whether they are buying for investment, personal use, or both'
          },
          notes: {
            type: 'string',
            description: 'Any additional notes or requirements mentioned by the client'
          }
        },
        required: []
      }
    }
  }
];

/**
 * Generate AI response using OpenAI with optional function calling
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Optional configuration
 * @returns {Promise<Object>} AI response with potential function call
 */
export async function generateChatResponse(messages, options = {}) {
  try {
    const {
      model = 'gpt-4o-mini',
      temperature = 0.7,
      max_tokens = 1000,
      enableFunctions = false
    } = options;

    console.log('Calling OpenAI with model:', model, 'functions:', enableFunctions);

    const requestOptions = {
      model,
      messages,
      temperature,
      max_tokens
    };

    // Add function calling if enabled
    if (enableFunctions) {
      requestOptions.tools = leadCaptureFunctions;
      requestOptions.tool_choice = 'auto';
    }

    const response = await openai.chat.completions.create(requestOptions);

    const message = response.choices[0].message;

    // Check if the model wants to call a function
    if (message.tool_calls && message.tool_calls.length > 0) {
      return {
        type: 'function_call',
        function_name: message.tool_calls[0].function.name,
        arguments: JSON.parse(message.tool_calls[0].function.arguments),
        content: message.content
      };
    }

    // Regular text response
    return {
      type: 'message',
      content: message.content
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);

    if (error.status === 401) {
      throw new Error('Invalid OpenAI API key');
    } else if (error.status === 429) {
      throw new Error('OpenAI rate limit exceeded');
    } else if (error.status === 500) {
      throw new Error('OpenAI service error');
    }

    throw error;
  }
}

/**
 * Generate property recommendations using OpenAI
 * @param {Object} userPreferences - User preferences for property search
 * @returns {Promise<string>} Property recommendations
 */
export async function generatePropertyRecommendations(userPreferences) {
  try {
    const messages = [
      {
        role: 'system',
        content: 'You are a Dubai real estate expert helping users find their perfect off-plan property.'
      },
      {
        role: 'user',
        content: `Based on these preferences: ${JSON.stringify(userPreferences)}, recommend suitable properties.`
      }
    ];

    return await generateChatResponse(messages, {
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 500
    });
  } catch (error) {
    console.error('Error generating property recommendations:', error);
    throw error;
  }
}

export default {
  generateChatResponse,
  generatePropertyRecommendations
};
