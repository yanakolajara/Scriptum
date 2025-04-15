import cors from 'cors';
import { config } from '../config/config';

export const corsMiddleware = ({ acceptedOrigins } = {}) =>
  cors({
    credentials: true,
    origin: config.app.environment === 'development' ? '*' : acceptedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });
