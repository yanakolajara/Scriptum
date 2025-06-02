import { Server } from 'socket.io';
import { GenaiChat } from './genai.service.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import db from '../models/db/dbConfig.js';
import { parseCookies } from '../utils/cookieUtils.js';

export const initializeChatSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
    credentials: true,
  });

  io.use((socket, next) => {
    try {
      const cookies = parseCookies(socket.handshake.headers.cookie || '');
      const token = cookies.access_token;

      if (token) {
        const data = jwt.verify(token, config.jwt.secret);
        socket.user = data;
        next();
      } else {
        next(new Error('Authentication error'));
      }
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    let userContext;
    userContext = await db.oneOrNone(
      'SELECT * FROM user_contexts WHERE user_id = $1',
      [socket.user.id]
    );

    if (!userContext) {
      userContext = await db.one(
        'INSERT INTO user_contexts (user_id, context) VALUES ($1, $2) RETURNING *',
        [socket.user.id, '']
      );
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
