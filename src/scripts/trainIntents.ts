import { trainGeminiIntents } from '../services/geminiService';
import * as fs from 'fs';
import * as path from 'path';

const intentsPath = path.join(__dirname, '../data/intents.json');

const trainIntents = async (): Promise<void> => {
  try {
    const intentsData = fs.readFileSync(intentsPath, 'utf-8');
    const intents = JSON.parse(intentsData);
    const success = await trainGeminiIntents(intents);
    if (success) {
      console.log('Gemini intents trained successfully (or simulated).');
    } else {
      console.error('Gemini intents training failed.');
    }
  } catch (error) {
    console.error('Error reading intents file:', error);
  }
};

trainIntents();
