import { Router } from 'express';
import { EntryController } from '../controllers/entry.controller.js';

export const createUserContextRouter = ({ userContextModel }) => {
  const router = Router();
  const userContextController = new EntryController({ userContextModel });
  router.get('/', (req, res) => {
    //TODO: implement
    res.status(200).json({ message: 'User context retrieved successfully' });
  });
  // router.get('/:id', entryController.getEntry);
  // router.post('/', entryController.createEntry);
  // router.put('/:id', entryController.updateEntry);
  // router.delete('/:id', entryController.deleteEntry);
  return router;
};
