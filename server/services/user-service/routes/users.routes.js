import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';

export const createUserRouter = ({ UserModel }) => {
  const router = Router();
  const usersController = new UsersController({ UserModel });

  // router.post('/register', usersController.register);
  // router.post('/login', usersController.login);
  // router.post('/verify-email', usersController.verifyEmail);
  // router.get('/check-auth', usersController.checkAuth);
  // router.post('/logout', usersController.logout);

  router.get('/email/:email', usersController.getByEmail);
  router.get('/', usersController.get);
  router.post('/', usersController.create);
  router.put('/', usersController.edit);
  router.delete('/', usersController.delete);

  return router;
};
