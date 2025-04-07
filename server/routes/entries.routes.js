import { Router } from 'express';
import { EntryController } from '../controllers/entry.controller.js';

// export const createUsersRouter = ({ userModel }) => {
//   const router = Router();
//   const userController = new UserController({ userModel });

//   router.post('/register', validateUserData, userController.register);
//   router.post('/verify', userController.verify);
//   router.post('/resend-code', userController.resendCode);
//   router.post('/refresh-token', userController.refreshToken);
//   router.post('/login', validateLoginData, userController.login);
//   router.put(
//     '/:id',
//     validatePartialUserData,
//     authenticateToken,
//     userController.edit
//   );
//   router.delete('/:id', authenticateToken, userController.delete);

//   return router;
// };

export const createEntriesRouter = ({ entryModel }) => {
  const router = Router();
  const entryController = new EntryController({ entryModel });
  router.get('/', entryController.getAllEntries);
  router.get('/:id', entryController.getEntry);
  router.post('/', entryController.createEntry);
  router.put('/:id', entryController.updateEntry);
  router.delete('/:id', entryController.deleteEntry);
  return router;
};
