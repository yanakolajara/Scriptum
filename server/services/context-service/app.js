import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createContextRouter } from './routes/contexts.routes.js';

export const createApp = ({ ContextModel, GeminiService }) => {
  const app = express();
  app.use(cors({ origin: '*', credentials: true }));
  app.use(morgan('dev'));
  app.use(express.json());

  app.use('/health', (_, res) => {
    res.status(200).json({ message: 'Entry service is healthy' });
  });

  app.use('/', createContextRouter({ ContextModel, GeminiService }));

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  // todo: hide server error message (500)
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.status === 500 ? 'Internal server error' : err.message,
      error: err.message,
    });
  });

  return app;
};
