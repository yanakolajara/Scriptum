import { Router } from 'express';
import { EntryController } from '../controllers/entry.controller.js';

export const createUserContextRouter = ({ userContextModel }) => {
  const router = Router();
  const userContextController = new EntryController({ userContextModel });
  router.get('/:id', userContextController.getEntry);
  // router.post('/', entryController.createEntry);
  // router.put('/:id', entryController.updateEntry);
  // router.delete('/:id', entryController.deleteEntry);
  return router;
};
