import cors from 'cors';
import { config } from '../config/config.js';

export const corsMiddleware = ({ acceptedOrigins } = {}) => {
  // Define default origins
  const defaultOrigins = [
    'http://localhost:3000',
    'https://scriptum-app.netlify.app',
  ];

  // Use provided origins, config origins, or default to localhost
  let allowedOrigins =
    acceptedOrigins || config.security.corsAllowedOrigins || defaultOrigins;

  return cors({
    credentials: true,
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      // Check if origin is allowed
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        return callback(null, true);
      } else {
        console.log('Origin blocked by CORS:', origin);
        return callback(null, false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });
};
