import { Router } from 'express';
import { ContextController } from '../controllers/context.controller.js';

export const createContextRouter = ({ ContextModel, GeminiService }) => {
  const router = Router();
  const userContextController = new ContextController({
    ContextModel,
    GeminiService,
  });

  router.get('/', userContextController.getContext);
  router.post('/', userContextController.createContext);
  router.put('/', userContextController.updateContext);
  router.delete('/', userContextController.deleteContext);

  return router;
};
