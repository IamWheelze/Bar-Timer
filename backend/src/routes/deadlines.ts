import { Router } from 'express';
import {
  calculateDeadline,
  createDeadline,
  getDeadlines,
  getDeadline,
  updateDeadline,
  deleteDeadline,
  completeDeadline
} from '../controllers/deadlineController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/calculate', calculateDeadline);
router.post('/', createDeadline);
router.get('/', getDeadlines);
router.get('/:id', getDeadline);
router.put('/:id', updateDeadline);
router.delete('/:id', deleteDeadline);
router.post('/:id/complete', completeDeadline);

export default router;
