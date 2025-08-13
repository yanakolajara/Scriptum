import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      credentials: true,
      // origin: [
      //   'http://localhost:3000',
      //   'https://scriptum-app.netlify.app',
      //   'https://www.scriptum-app.vercel.app',
      //   'https://scriptum-app.vercel.app'
      // ],
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
      exposedHeaders: ['set-cookie'],
    })
  );
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/', authRoutes);

  app.get('/health', (req, res) => {
    res.json({ status: 'Auth service is healthy ✅' });
  });

  return app;
};
