import { Router } from 'express';
import { UserContextController } from '../controllers/userContext.controller.js';

const router = Router();
const userContextController = new UserContextController();
router.get('/:id', userContextController.getUserContext);
// router.post('/' );
router.put('/', userContextController.updateUserContext);
// router.delete('/:id');

export default router;
