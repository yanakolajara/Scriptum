import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';

export const createUsersRouter = (userModel) => {
  const router = Router();
  const usersController = new UsersController({ userModel });

  router.post('/register', usersController.register);
  router.post('/verify-email', usersController.verifyEmail);
  return router;
};
