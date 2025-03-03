import { Router } from 'express';
import { UserController } from '../controllers/users.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  validateLoginData,
  validatePartialUserData,
  validateUserData,
} from '../middlewares/validate.middleware.js';
import { TempUserController } from '../controllers/tempUsers.controller.js';

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

export const createUsersRouter = ({ userModel }) => {
  const router = Router();
  const userController = new TempUserController({ userModel });

  router.post('/register', validateUserData, userController.register);
  router.post('/login', validateLoginData, userController.login);
  return router;
};
