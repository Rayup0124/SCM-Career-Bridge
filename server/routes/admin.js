import express from 'express';
import {
  getPendingCompanies,
  approveCompany,
  rejectCompany,
  getAllCompanies
} from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// Company management routes
router.get('/companies/pending', getPendingCompanies);
router.get('/companies', getAllCompanies);
router.put('/companies/approve/:id', approveCompany);
router.put('/companies/reject/:id', rejectCompany);

export default router;

