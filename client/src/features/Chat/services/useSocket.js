import { useEffect } from 'react';
import { socket } from './socket.js';

export const useSocket = (handlers) => {
  const { onStreamStart, onStream, onStreamFulfilled, onResponse } = handlers;

  useEffect(() => {
    socket.on('connect', () => console.log('ws-connected:', socket.id));
    socket.on('disconnect', () => console.log('ws-disconnected:', socket.id));
    socket.on('response', onResponse);
    socket.on('stream-start', onStreamStart);
    socket.on('stream', onStream);
    socket.on('stream-fulfilled', onStreamFulfilled);
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('response');
      socket.off('stream-start');
      socket.off('stream');
      socket.off('stream-fulfilled');
    };
  }, [handlers]);
};
