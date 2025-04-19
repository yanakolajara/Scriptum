import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    name: process.env.APP_NAME,
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    clientUrl: process.env.CLIENT_URL,
  },
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    access: process.env.JWT_ACCESS_SECRET,
    refresh: process.env.JWT_REFRESH_SECRET,
    accessTokenExpiration: process.env.JWT_ACCESS_EXPIRATION,
    refreshTokenExpiration: process.env.JWT_REFRESH_EXPIRATION,
    algorithm: process.env.JWT_ALGORITHM,
  },
  security: {
    corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS
      ? process.env.CORS_ALLOWED_ORIGINS.split(',')
      : ['http://localhost:8080'],
    rateLimitWindowMs: 15 * 60 * 1000,
    rateLimitMax: 100,
  },
  email: {
    host: process.env.EMAIL_HOST,
    user: process.env.EMAIL_USER,

    password: process.env.EMAIL_PASSWORD,
    fromName: process.env.EMAIL_FROM_NAME,
    fromEmail: process.env.EMAIL_FROM_EMAIL,
  },
  externalServices: {
    genaiApiKey: process.env.GEMINI_API_KEY,
  },
  logging: {
    level: process.env.LOG_LEVEL,
    logToFile: process.env.LOG_TO_FILE === 'true',
  },
};
