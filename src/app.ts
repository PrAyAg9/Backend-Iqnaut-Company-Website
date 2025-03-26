// src/app.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes';
import courseRoutes from './routes/courseRoutes';

dotenv.config(); // Load environment variables

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Mount routes
app.use('/api/chat', chatRoutes);
app.use('/api/courses', courseRoutes);

// Global error handling middleware can be added here

export default app;
