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

/**
 * Generate AI response using OpenAI
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Optional configuration
 * @returns {Promise<string>} AI response
 */
export async function generateChatResponse(messages, options = {}) {
  try {
    const {
      model = 'gpt-4o-mini', // Using GPT-4o-mini for best cost/performance ratio
      temperature = 0.7,
      max_tokens = 1000
    } = options;

    console.log('Calling OpenAI with model:', model);

    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Handle specific OpenAI errors
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
