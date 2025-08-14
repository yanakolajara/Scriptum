import cors from 'cors';

export const corsMiddleware = (
  acceptedOrigins = [
    'https://www.scriptum-app.vercel.app',
    'https://scriptum-client-n4f89nqz9-yanakolajaras-projects.vercel.app',
    'https://scriptum-client-git-fix-mobile-au-b65c00-yanakolajaras-projects.vercel.app',
    'https://scriptum-app.vercel.app',
    'http://localhost:3000',
  ]
) =>
  cors({
    credentials: true,
    origin: acceptedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie'],
  });
