import { useEffect } from 'react';
import { socket } from '../../../socket';

export const useSocket = (handlers) => {
  const { onStreamStart, onStream, onStreamFulfilled, onChatEnd } = handlers;
  useEffect(() => {
    socket.on('connect', () => console.log('WS Connected:', socket.id));
    socket.on('disconnect', () => console.log('WS Disconnected:', socket.id));
    socket.on('chat:stream-start', onStreamStart);
    socket.on('chat:stream', onStream);
    socket.on('chat:stream-fulfilled', onStreamFulfilled);
    socket.on('chat:entry', onChatEnd);
    // socket.on('genai:error', onError);
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat:stream-start');
      socket.off('chat:stream');
      socket.off('chat:stream-fulfilled');
      socket.off('chat:end');
    };
  }, [handlers]);
};
