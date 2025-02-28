import { useEffect } from 'react';
import { socket } from '../../../socket';

export const useSocket = ({ handlers = {} }) => {
  useEffect(() => {
    socket.on('connect', () => console.log('WS Connected:', socket.id));
    socket.on('disconnect', () => console.log('WS Disconnected:', socket.id));
    // socket.on('chat:created', onChatCreated);
    // socket.on('genai:stream', onGenaiStream);
    // socket.on('genai:finalized', onGenaiFinalized);
    // socket.on('genai:error', onError);
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      // socket.off('chat:created');
      // socket.off('genai:stream');
      // socket.off('genai:finalized');
      // socket.off('genai:error');
      // console.log('[socketManager.js] WebSocket listeners removed');
    };
  }, handlers);
};
