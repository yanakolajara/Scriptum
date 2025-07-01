import express from 'express';
import { login, logout, verifyEmail } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email/:token', verifyEmail);

export default router;
