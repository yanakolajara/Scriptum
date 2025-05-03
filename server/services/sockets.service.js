import { Server } from 'socket.io';
import { GenaiChat } from './genai.service.js';
import { userContext } from '../genaiFakeContext.js';

export const initializeChatSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', async (socket) => {
    // const getContext = await getUserContext();
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

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};
