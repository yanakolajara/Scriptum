import { Server } from 'socket.io';
import { GenaiChat } from './genai.service.js';
import { userContext } from '../genaiFakeContext.js';

export const initializeChatSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', async (socket) => {
    const genaiChat = new GenaiChat(userContext);

    socket.on('chat:message', async ({ message }) => {
      try {
        const res = await genaiChat.sendMessage(message);
        socket.emit('chat:response', { response: res });
      } catch (error) {
        console.error('Error in chat:message:', error.message);
        socket.emit('chat:error', { error: error.message });
      }
    });

    socket.on('chat:message-stream', async ({ message }) => {
      try {
        const res = await genaiChat.sendMessageStream(message);
        for await (const chunk of res.stream) {
          socket.emit('chat:stream', {
            messageId: res.messageId,
            chunk: chunk.text(),
          });
        }
        socket.emit('chat:stream-fulfilled', { messageId: res.messageId });
      } catch (error) {
        console.error('Error in chat:message:', error.message);
        socket.emit('chat:error', { error: error.message });
      }
    });

    socket.on('chat:end', async (data) => {
      console.log(`Chat ended for chatId: ${data.chatId}`);
      const entry = await genaiChat.generateEntry(
        socket.chat,
        userContext,
        socket.cacheName
      );
      socket.emit('chat:entry', { entry });
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};
