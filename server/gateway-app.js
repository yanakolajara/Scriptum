import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

config();

// Import configuration
import { CORS_CONFIG } from './gateway/config/services.js';

// Import gateway routes
import usersRouter from './gateway/routes/users.routes.js';
import entriesRouter from './gateway/routes/entries.routes.js';
import userContextRouter from './gateway/routes/user-context.routes.js';
import chatRouter from './gateway/routes/chat.routes.js';
import emailRouter from './gateway/routes/email.routes.js';
import axios from 'axios';

// Create the Express application
const app = express();

// ===== GLOBAL MIDDLEWARES =====

// CORS - Allow requests from the frontend
app.use(cors(CORS_CONFIG));

// Cookie Parser - To handle cookies (needed for JWT in cookies)
app.use(cookieParser());

// Body Parser - To parse JSON in requests
app.use(express.json());

// Morgan - HTTP request logger (useful for debugging)
app.use(morgan('dev'));

// ===== GATEWAY ROUTES =====
/**
 * Health check route for the gateway
 * Useful to verify the gateway is working
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    message: '🌐 API Gateway working properly',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

/**
 * Root route - Basic gateway information
 */
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Scriptum API Gateway',
    services: {
      users: '/users',
      entries: '/entries',
      userContext: '/user-context',
      chat: '/chat',
      email: '/email',
    },
    health: '/health',
  });
});

// app.use('/users', (req, res, next) => {
//   const method = req.method;
//   const url = req.url;

//   createProxyMiddleware({
//     target: 'http://localhost:4010',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/users': '',
//     },
//   })(req, res, next);
// });

// ===== REGISTER MICROSERVICE ROUTES =====

/**
 * User routes - /users/*
 * These requests will be routed to the users microservice
//  */
app.use('/users', usersRouter);

// /**
//  * Entries routes - /entries/*
//  * These requests will be routed to the entries microservice
//  */
// app.use('/entries', entriesRouter);

// /**
//  * User context routes - /user-context/*
//  * These requests will be routed to the user context microservice
//  */
// app.use('/user-context', userContextRouter);

// /**
//  * Chat routes - /chat/*
//  * These requests will be routed to the chat microservice
//  */
// app.use('/chat', chatRouter);

// /**
//  * Email routes - /email/*
//  * These requests will be routed to the email microservice
//  */
// app.use('/email', emailRouter);

// ===== ERROR HANDLING =====

/**
 * Error-handling middleware
 * Catches all unhandled errors and returns a consistent response
 */
app.use((err, req, res, next) => {
  // Log the error for debugging
  console.error('❌ Error in the gateway:', err);

  // Consistent error response
  const status = err.status || err.response?.status || 500;
  const message =
    err.message || err.response?.data?.message || 'Internal server error';

  res.status(status).json({
    message,
    timestamp: new Date().toISOString(),
  });
});

/**
 * 404 Route - For routes not found
 */
app.use('*', (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found in the API Gateway`,
    availableRoutes: [
      '/users',
      '/entries',
      '/user-context',
      '/chat',
      '/email',
      '/health',
    ],
  });
});

export default app;
