import { Server } from 'socket.io';
import { getGenaiResponse } from './genai.service.js';
import { v4 as uuidv4 } from 'uuid';

export const initializeChatSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    let chatCache = '';
    socket.on('chat:message', async ({ message, userToken }) => {
      chatCache += `User: ${message}\n\n`;
      const messageId = uuidv4();
      socket.emit('chat:stream-start', { messageId });
      let response = '';
      const stream = await getGenaiResponse(chatCache);
      for await (const chunk of stream) {
        response += chunk.text();
        socket.emit('chat:stream', { messageId, chunk: chunk.text() });
      }

      chatCache += `AI: ${response}\n\n`;
      socket.emit('chat:stream-fulfilled', { messageId });
    });

    socket.on('chat:end', async (data) => {
      console.log(`Chat ended for chatId: ${data.chatId}`);
      const entry = 'This is your generated summary.';
      socket.emit('chat:entry', { entry });
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
