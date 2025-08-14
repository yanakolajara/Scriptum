//* Core dependencies
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createServer } from 'node:http';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { createUsersRouter } from './routes/users.routes.js';
import { createEntriesRouter } from './routes/entries.routes.js';
import { createUserContextRouter } from './routes/userContext.routes.js';
import { initializeChatSockets } from './services/sockets.service.js';
import { createAuthRouter } from './routes/auth.routes.js';
import db from './models/db/dbConfig.js';

export const createApp = (models) => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(corsMiddleware());

  // Middleware to check auth
  app.use('/auth', createAuthRouter(models.userModel));
  app.use('/users', createUsersRouter(models.userModel));
  app.use('/entries', createEntriesRouter(models.entryModel));
  app.use('/user-context', createUserContextRouter(models.userContextModel));
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Scriptum API' });
  });
  app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });
  app.use(errorHandler);

  const httpServer = createServer(app);
  initializeChatSockets(httpServer, corsMiddleware);
  return httpServer;
};
