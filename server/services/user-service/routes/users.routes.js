import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';

const router = Router();
const usersController = new UsersController();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.post('/verify-email', usersController.verifyEmail);
router.get('/check-auth', usersController.checkAuth);
router.post('/logout', usersController.logout);

export default router;
