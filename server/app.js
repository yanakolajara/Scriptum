import express from 'express';
import morgan from 'morgan';
import { createUsersRouter } from './routes/users.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { config } from './config/config.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import { createEntriesModel } from './routes/chat.routes.js';

export const createApp = ({ userModel, entriesModel }) => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(corsMiddleware(config.security.corsAllowedOrigins));

  //* Auth routes
  app.use('/users', createUsersRouter({ userModel }));

  //* Protected routes
  app.use('/entries', createEntriesModel({ entriesModel }));
  // app.use('/comments', createCommentsRouter({ commentModel }));

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Scriptum API' });
  });
  app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use(errorHandler);

  return app;
};
