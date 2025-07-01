import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';

export const createUserRouter = ({ UserModel }) => {
  const router = Router();
  const usersController = new UsersController({ UserModel });

  // router.get('/check-auth', usersController.checkAuth);

  router.get('/email/:email', usersController.getByEmail);
  router.get('/:id', usersController.get);
  router.post('/', usersController.create);
  router.put('/:id', usersController.edit);
  router.delete('/:id', usersController.delete);

  return router;
};
