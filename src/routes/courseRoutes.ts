// src/routes/courseRoutes.ts
import { Router } from 'express';
import { listCourses, buyCourse } from '../controllers/courseController';

const router = Router();

// GET endpoint to list available courses
router.get('/', listCourses);

// POST endpoint to process course purchases
router.post('/buy', buyCourse);

export default router;
