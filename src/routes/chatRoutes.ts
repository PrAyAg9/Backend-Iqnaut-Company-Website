// src/routes/chatRoutes.ts
import { Router } from 'express';
import { processChat } from '../controllers/chatController';

const router = Router();

// POST endpoint to handle chat messages.
router.post('/', processChat);

export default router;
