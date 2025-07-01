import express from 'express';
import cookieParser from 'cookie-parser';
import { createUserRouter } from './routes/users.routes.js';
import cors from 'cors';
import morgan from 'morgan';

export const createApp = ({ UserModel }) => {
  const app = express();

  app.use(cors({ origin: '*', credentials: true }));

  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.get('/health', (_, res) => {
    res.status(200).json({ message: 'User service is running' });
  });

  app.use('/', createUserRouter({ UserModel }));

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.status === 500 ? 'Internal server error' : err.message,
      error: err.message,
    });
  });

  return app;
};
