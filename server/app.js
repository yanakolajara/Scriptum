import express from 'express';
import morgan from 'morgan';
import { createUsersRouter } from './routes/users.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { config } from './config/config.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';
// import { Server } from 'socket.io';
// import { createServer } from 'node:http';
// import { createChatEvent, genaiMessageEvent } from './sockets/chat.sockets.js';

export const createApp = ({ userModel }) => {
  const app = express();
  // const server = createServer(app);
  // const io = new Server(server, {
  //   cors: {
  //     origin: process.env.CLIENT_URL,
  //     methods: ['GET', 'POST'],
  //   },
  // });

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(corsMiddleware(config.security.corsAllowedOrigins));

  app.use('/users', createUsersRouter({ userModel }));
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Scriptum API' });
  });
  app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use(errorHandler);

  // io.on('connection', (socket) => {
  //   socket.on('chat:create', (userID) => createChatEvent(socket, userID));
  //   socket.on('genai:request', (data) => genaiMessageEvent(socket, data));
  //   socket.on('disconnect', () => console.log('WS Disconnected:', socket.id));
  // });
  return app;
};
