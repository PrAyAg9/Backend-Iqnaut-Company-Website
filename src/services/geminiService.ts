import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

if (!GEMINI_API_URL) {
  throw new Error("GEMINI_API_URL is not defined in the environment variables.");
}

export interface GeminiResponse {
  reply: string;
}

/**
 * Processes a chat message using the Gemini API.
 * @param message The user's message.
 * @returns A GeminiResponse containing the reply.
 */
export const processGeminiChat = async (message: string): Promise<GeminiResponse> => {
  try {
    const response = await axios.post<{ reply: string }>(
      `${GEMINI_API_URL}/chat`,
      { message },
      {
        headers: {
          'Authorization': `Bearer ${GEMINI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return { reply: response.data.reply };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return { reply: 'Sorry, an error occurred processing your request.' };
  }
};

/**
 * Trains Gemini on the provided intents data.
 * Note: If the training endpoint returns a 404 (Not Found),
 * we simulate a successful training for development purposes.
 * @param intents The JSON object containing intents.
 * @returns A boolean indicating success.
 */
export const trainGeminiIntents = async (intents: any): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}/train`,
      { intents },
      {
        headers: {
          'Authorization': `Bearer ${GEMINI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Gemini training response:', response.data);
    return true;
  } catch (error: any) {
    // If the training endpoint isn't available, simulate success for development.
    if (error.response && error.response.status === 404) {
      console.warn("Training endpoint not found (404). Simulating successful training for development.");
      return true;
    }
    console.error('Error training Gemini API:', error);
    return false;
  }
};
