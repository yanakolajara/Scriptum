import { handleDisconnect, handleChatMessage } from './websocketHandlers';

export const handleWebSocketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);
    socket.on('start_conversation', (userId) =>
      handleStartConversation(socket, userId)
    );
    socket.on('chat_message', (data) => handleChatMessage(socket, data));
    socket.on('disconnect', () => handleDisconnect(socket));
  });
};
