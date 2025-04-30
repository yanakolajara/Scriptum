import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { createUsersRouter } from './routes/users.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { config } from './config/config.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import { createEntriesRouter } from './routes/entries.routes.js';
import cors from 'cors';

export const createApp = ({ userModel, entryModel }) => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());

  // Apply CORS middleware first to handle preflight requests
  // app.use(corsMiddleware({ acceptedOrigins: config.security.corsAllowedOrigins }));

  const corsOptions = {
    credentials: true,
    origin: [
      'https://scriptum-app.vercel.app',
      'https://www.scriptum-app.vercel.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie'],
  };

  app.use(cors(corsOptions));

  // Add explicit OPTIONS handler for preflight requests
  app.options('*', (req, res) => {
    res.sendStatus(200);
  });

  app.use(cookieParser());

  // Middleware to check auth
  app.use((req, res, next) => {
    const token =
      req.cookies.access_token ||
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      req.session = { user: null };
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

  //* Auth routes
  app.use('/users', createUsersRouter({ userModel }));

  //* Protected routes
  app.use('/entries', createEntriesRouter({ entryModel }));
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
