import cors from 'cors';

export const corsMiddleware = ({ acceptedOrigins } = {}) =>
  cors({
    credentials: true,
    origin: acceptedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
  });
