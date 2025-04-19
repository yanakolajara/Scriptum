import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { UsersController } from '../controllers/users.controller.js';

export const createUsersRouter = ({ userModel }) => {
  const router = Router();
  const usersController = new UsersController({ userModel });

  router.post('/register', usersController.register);
  router.post('/login', usersController.login);
  router.post('/verify-email', usersController.verifyEmail);
  router.get('/check-auth', usersController.checkAuth);
  router.post('/logout', usersController.logout);
  return router;
};
