import express from 'express';

import {
  getUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/userController';
import { protect } from './../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getUsers);
router.get('/:id', protect, getUser);
router.patch('/:id', protect, updateUser);
router.post('/', registerUser);
router.post('/login', loginUser);

export { router };
