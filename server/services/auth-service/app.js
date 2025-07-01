import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/', authRoutes);

  app.get('/health', (req, res) => {
    res.json({ status: 'Auth service is healthy ✅' });
  });

  return app;
};
