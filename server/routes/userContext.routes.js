import { Router } from 'express';
import { UserContextController } from '../controllers/userContext.controller.js';

export const createUserContextRouter = ({ userContextModel }) => {
  const router = Router();
  const userContextController = new UserContextController({ userContextModel });
  router.get('/:id', userContextController.getUserContext);
  // router.post('/' );
  router.put('/', userContextController.updateUserContext);
  // router.delete('/:id');
  return router;
};
