import { Request, Response, NextFunction, RequestHandler } from 'express';
import { processGeminiChat } from '../services/geminiService';
import { courseDetails } from '../data/courseDetails'; // Ensure this file exists and exports courseDetails

export const processChat: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    // If the message indicates course interest, respond with enrollment options.
    if (message.toLowerCase().includes('course')) {
      const coursesList = courseDetails.map(course => `${course.id}: ${course.title}`).join('\n');
      res.json({
        response: `Are you interested in enrolling in one of our courses? Our available courses are:\n${coursesList}`
      });
      return;
    }

    // Otherwise, process with Gemini.
    const geminiResponse = await processGeminiChat(message);
    res.json({ response: geminiResponse.reply });
  } catch (error) {
    next(error);
  }
};
