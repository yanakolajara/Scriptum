import { Server } from 'socket.io';
import { GenaiChat } from './genai.service.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import db from '../models/db/dbConfig.js';

export const initializeChatSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
    credentials: true,
  });

  io.use((socket, next) => {
    const rawCookies = socket.handshake.headers.cookie || '';

    const token = cookies?.split(';')[0]?.split('=')[1];
    socket.token = token;
    next();
  });

  io.use((socket, next) => {
    const cookies = socket.handshake.headers.cookie;
    const token = cookies?.split(';');
    // const accessToken = cookies?.split('')
    // const token = socket.handshake;

    console.log('🚀 ~ io.use ~ token:', token);

    try {
      const payload = jwt.verify(token, config.jwt.secret);
      socket.user = payload; // attach decoded user
      next();
    } catch (err) {
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', async (socket) => {
    console.log(
      `✅ Socket connected: ${socket.id} (userId: ${socket.user?.id})`
    );

    if (token) {
      const data = jwt.verify(token, config.jwt.secret);
      userContext = await db.oneOrNone(
        'SELECT * FROM user_contexts WHERE user_id = $1',
        [data.id]
      );

      if (!userContext) {
        userContext = await db.one(
          'INSERT INTO user_contexts (user_id, context) VALUES ($1, $2) RETURNING *',
          [data.id, '']
        );
      }
    } else {
      console.error('No token provided');
      // Handle the case where no token is provided
    }
    const genaiChat = new GenaiChat(userContext);

    socket.on('message', async ({ message }) => {
      try {
        const res = await genaiChat.sendMessage(message);
        socket.emit('response', { response: res });
      } catch (error) {
        console.error('Error in message:', error.message);
        socket.emit('error', { error: error.message });
      }
    });

    socket.on('message-stream', async ({ message }) => {
      try {
        const res = await genaiChat.sendMessageStream(message);
        for await (const chunk of res.stream) {
          socket.emit('stream', {
            messageId: res.messageId,
            chunk: chunk.text(),
          });
        }
        socket.emit('stream-fulfilled', { messageId: res.messageId });
      } catch (error) {
        console.error('Error in message:', error.message);
        socket.emit('error', { error: error.message });
      }
    });

    socket.on('connect', () => {
      console.log(`Socket connected: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};
