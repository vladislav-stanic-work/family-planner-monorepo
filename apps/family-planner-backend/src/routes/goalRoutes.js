import express from 'express';

import {
  deleteGoal,
  getGoals,
  setGoal,
  updateGoal,
} from '../controllers/goalController';
import { protect } from './../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

export { router };
