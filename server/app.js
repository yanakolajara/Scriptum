//* Core dependencies
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { createServer } from 'node:http';

//* Setup config
import { config } from './shared/config/config.js';

//* Setup middlewares
import { corsMiddleware } from './shared/middlewares/cors.middleware.js';
import { errorHandler } from './shared/middlewares/error.middleware.js';

//* Setup modules
import { createUsersRouter } from './services/user-service/index.js';
import { createEntriesRouter } from './services/entry-service/entries.routes.js';
import { createUserContextRouter } from './routes/userContext.routes.js';
import { initializeChatSockets } from './services/chat-service/sockets.service.js';

export const createApp = (models) => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());

  const corsOptions = {
    credentials: true,

    origin: [
      'https://www.scriptum-app.vercel.app',
      'https://scriptum-app.vercel.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie'],
  };
  app.use(cors(corsOptions));
  app.options('*', (req, res) => {
    res.sendStatus(200);
  });

  // Middleware to check auth
  app.use((req, res, next) => {
    req.session = { user: null };
    const token =
      req.cookies.access_token ||
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return next();
    }

    try {
      const data = jwt.verify(token, config.jwt.secret);
      req.session = { user: data };
    } catch (error) {
      req.session = { user: null };
    }
    next();
  });

  app.use('/users', createUsersRouter(models.userModel));
  app.use('/entries', createEntriesRouter(models.entryModel));
  // app.use('/comments', createCommentsRouter({ commentModel }))
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
