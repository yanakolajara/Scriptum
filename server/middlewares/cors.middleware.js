import cors from 'cors';
import { config } from '../config/config.js';

export const corsMiddleware = ({ acceptedOrigins } = {}) =>
  cors({
    credentials: true,
    origin:
      config.app.environment === 'development'
        ? 'http://localhost:3000'
        : acceptedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });
