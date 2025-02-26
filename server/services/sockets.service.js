import { Server } from 'socket.io';
import { getGenaiResponse } from './genai.service.js';

export const initializeChatSockets = (httpServer, corsConfig) => {
  const io = new Server(httpServer, corsConfig);

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('chat:start', (data) => {
      console.log(`Chat started for user: ${data.userId}`);
      createChatEvent(socket, data.userId);
    });

    socket.on('chat:response', async (socket, data) => {
      const { chatTranscript, currMessage } = data;
      let aiResponse = '';
      const stream = await getGenaiResponse(chatTranscript, currMessage);
      for await (const chunk of stream) {
        aiResponse += chunk.text();
        socket.emit('chat:stream', text);
      }
      socket.emit('chat:stream-end', aiResponse);
    });

    socket.on('chat:end', async (data) => {
      console.log(`Chat ended for chatId: ${data.chatId}`);

      const summary = 'This is your generated summary.'; //TODO: Generate summary with genai
      // TODO: store the summary in the database.
      socket.emit('chat:summary', { summary });
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
