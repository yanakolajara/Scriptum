import { Router } from 'express';
import { EntryController } from '../controllers/entry.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

export const createEntriesRouter = (entryModel) => {
  const router = Router();
  const entryController = new EntryController({ entryModel });
  router.use(checkAuth);
  router.get('/', entryController.getAllEntries);
  router.get('/:id', entryController.getEntry);
  router.post('/', entryController.createEntry);
  router.put('/:id', entryController.updateEntry);
  router.delete('/:id', entryController.deleteEntry);
  return router;
};
