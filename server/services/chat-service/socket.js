import { Server } from 'socket.io';
// import { getUserContext } from './services/userContext.service.js';
import { initializeGenaiChat } from './services/gemini.service.js';
import registerConnectionHandlers from './handlers/connection.handler.js';
import registerMessageHandlers from './handlers/message.handler.js';

export const initializeChatSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', async (socket) => {
    // Look for user id from handshake headers
    const userId = socket.handshake.headers['x-user-id'];

    // Force socket to disconnect if x-user-id not present in headers
    if (!userId) {
      socket.disconnect(true);
      return;
    }

    // Add userId in socket object to use it in future events
    socket.userId = userId;

    // Fetch user context from user-context-service
    // const userContext = await getUserContext({ userId });
    const userContext = '';

    // Initialize gemini chat session
    const geminiChat = initializeGenaiChat({ userContext });

    // Store a Gemini instance chat in socket
    socket.geminiChat = geminiChat;

    // Register handlers
    registerConnectionHandlers(io, socket);
    registerMessageHandlers(io, socket);
  });

  return io;
};
