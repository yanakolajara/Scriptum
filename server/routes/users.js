import { Router } from 'express';
import { UserController } from '../controllers/users.js';

export const createUsersRouter = ({ userModel }) => {
  const usersRouter = Router();
  const userController = new UserController({ userModel });

  usersRouter.get('/', userController.getAll);
  usersRouter.get('/:id', userController.getById);

  usersRouter.post('/create', userController.create);
  usersRouter.put('/:id', userController.update);
  usersRouter.delete('/:id', userController.delete);
  // usersRouter.post('/login', userController.login);
  // usersRouter.post('/verify', userController.verify);

  return usersRouter;
};
