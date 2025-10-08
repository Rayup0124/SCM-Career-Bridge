import express from 'express';
import {
  registerStudent,
  registerCompany,
  login,
  getCurrentUser
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register/student', registerStudent);
router.post('/register/company', registerCompany);
router.post('/login', login);

// Protected routes
router.get('/me', authenticate, getCurrentUser);

export default router;

