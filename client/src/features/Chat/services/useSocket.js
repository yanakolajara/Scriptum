import { useEffect } from 'react';
import { socket } from './socket.js';

export const useSocket = (handlers) => {
  const { onStreamStart, onStream, onStreamFulfilled, onChatEnd, onResponse } =
    handlers;
  // todo: create an object with "socket actions" to avoid repetition in socket.on
  // todo: use sockets.on to listen unknown events (blackbox), events will be given by eventHandler object
  /**
   * Example:
   * {
   *    connect: {
   *      event: '...'
   *      callback: () => {}
   *    }
   * }
   */
  useEffect(() => {
    socket.on('connect', () => console.log('ws-connected:', socket.id));
    socket.on('disconnect', () => console.log('ws-disconnected:', socket.id));
    socket.on('chat:response', onResponse);
    socket.on('chat:stream-start', onStreamStart);
    socket.on('chat:stream', onStream);
    socket.on('chat:stream-fulfilled', onStreamFulfilled);
    socket.on('chat:entry', onChatEnd);
    // socket.on('genai:error', onError);
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat:response');
      socket.off('chat:stream-start');
      socket.off('chat:stream');
      socket.off('chat:stream-fulfilled');
      socket.off('chat:end');
    };
  }, [handlers]);
};
