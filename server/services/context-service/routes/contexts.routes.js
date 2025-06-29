import { Router } from 'express';
import { ContextController } from '../controllers/context.controller.js';

export const createContextRouter = ({ ContextModel, GeminiService }) => {
  const router = Router();
  const contextController = new ContextController({
    ContextModel,
    GeminiService,
  });

  router.get('/', contextController.getContext);
  router.post('/', contextController.createContext);
  router.put('/', contextController.updateContext);
  router.delete('/', contextController.deleteContext);

  return router;
};
