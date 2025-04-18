import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { createUsersRouter } from './routes/users.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { config } from './config/config.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import { createEntriesRouter } from './routes/entries.routes.js';

export const createApp = ({ userModel, entryModel }) => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(corsMiddleware(config.security.corsAllowedOrigins));
  app.use(cookieParser());

  app.use((req, res, next) => {
    const token = req.cookies.access_token;
    let data = null;
    req.session = { user: null };
    try {
      data = jwt.verify(token, config.jwt.secret);
      //todo: Validate if token is actually valid (if user exists or token has been blacklisted)
      req.session.user = data;
    } catch (error) {
      req.session.user = null;
    }
    next();
  });

  // fixme: Avoid server error messages in production

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
