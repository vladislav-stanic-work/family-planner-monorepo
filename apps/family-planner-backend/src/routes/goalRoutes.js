import express from 'express';
import { protect }  from './../middleware/authMiddleware';
import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goalController';

const router = express.Router();

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

export {
    router
}
