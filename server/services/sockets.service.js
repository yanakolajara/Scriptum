import { Server } from 'socket.io';
import { GenaiChat } from './genai.service.js';
import { userContext } from '../genaiFakeContext.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import db from '../models/db/dbConfig.js';

export const initializeChatSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', async (socket) => {
    let userContext = null;
    const cookies = socket.request.headers.cookie;
    const token = cookies
      ? cookies
          .split(';')
          .find((c) => c.trim().startsWith('access_token='))
          .split('=')[1]
      : null;

    if (token) {
      socket.request.headers.authorization = `Bearer ${token}`;
    }
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
