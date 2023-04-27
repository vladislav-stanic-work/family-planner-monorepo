import express from 'express';

import {
  createGroup,
  getGroup,
  getGroups,
} from '../controllers/groupController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getGroups);
router.post('/', protect, createGroup);
router.get('/:id', protect, getGroup);

// router.patch('/:id', protect, updateUser);
// router.post('/login', loginUser);

export { router };
