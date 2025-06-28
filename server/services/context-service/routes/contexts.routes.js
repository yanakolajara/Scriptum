import { Router } from 'express';
import { ContextController } from '../controllers/context.controller.js';

export const createContextRouter = ({ ContextModel, GeminiService }) => {
  const router = Router();
  const userContextController = new ContextController({
    ContextModel,
    GeminiService,
  });

  router.get('/:id', userContextController.getContextById);
  router.get('/user/:userId', userContextController.getContextByUserId);
  router.post('/', userContextController.createContext);
  router.put('/', userContextController.updateContext);
  // router.delete('/:id');

  return router;
};
