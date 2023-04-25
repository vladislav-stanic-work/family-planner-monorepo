import express from 'express';

import {
  getMe,
  getUsers,
  loginUser,
  registerUser,
} from '../controllers/userController';
import { protect } from './../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getUsers);
router.get('/me', protect, getMe);
router.post('/', registerUser);
router.post('/login', loginUser);

export { router };
