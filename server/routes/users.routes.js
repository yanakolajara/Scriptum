import { Router } from 'express';
import { UserController } from '../controllers/users.controller.js';

export const createUsersRouter = ({ userModel }) => {
  const router = Router();
  const userController = new UserController({ userModel });

  router.post('/register', userController.register);
  router.post('/verify', userController.verify);
  router.post('/login', userController.login);
  router.put('/:id', userController.edit);
  router.delete('/:id', userController.delete);

  return router;
};
