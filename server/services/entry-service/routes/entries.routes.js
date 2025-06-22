import { Router } from 'express';
import { EntryController } from '../controllers/entry.controller.js';

const router = Router();
const entryController = new EntryController();
router.get('/', entryController.getAllEntriesFromUser);
router.get('/:entryId', entryController.getEntry);
router.post('/', entryController.createEntry);
router.put('/:entryId', entryController.updateEntry);
router.delete('/:entryId', entryController.deleteEntry);

// router.post('/generate-from-chat', EntryController.generateFromChat);

export default router;
