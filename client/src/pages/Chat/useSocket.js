import { socket } from '../../socket';

export const initializeListeners = ({
  onChatCreated,
  onGenaiStream,
  onGenaiFinalized,
  onError,
}) => {
  socket.on('connect', () => console.log('WS Connected:', socket.id));
  socket.on('disconnect', () => console.log('WS Disconnected:', socket.id));
  socket.on('chat:created', onChatCreated);
  socket.on('genai:stream', onGenaiStream);
  socket.on('genai:finalized', onGenaiFinalized);
  socket.on('genai:error', onError);
  console.log('[socketManager.js] WebSocket listeners initialized');
};

export const cleanupListeners = () => {
  socket.off('connect');
  socket.off('disconnect');
  socket.off('chat:created');
  socket.off('genai:stream');
  socket.off('genai:finalized');
  socket.off('genai:error');
  console.log('[socketManager.js] WebSocket listeners removed');
};

export const genaiRequest = (chatID, userInput, chatTranscript) => {
  socket.emit('genai:request', {
    chatID,
    userInput,
    chatTranscript,
  });
};

export const chatCreate = (userID) => socket.emit('chat:create', userID);
