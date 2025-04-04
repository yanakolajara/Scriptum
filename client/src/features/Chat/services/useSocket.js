import { useEffect } from 'react';
import { socket } from './socket.js';

export const useSocket = (handlers) => {
  const { onStreamStart, onStream, onStreamFulfilled, onEntry, onResponse } =
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
    socket.on('response', onResponse);
    socket.on('stream-start', onStreamStart);
    socket.on('stream', onStream);
    socket.on('stream-fulfilled', onStreamFulfilled);
    socket.on('entry', onEntry);
    // socket.on('genai:error', onError);
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('response');
      socket.off('stream-start');
      socket.off('stream');
      socket.off('stream-fulfilled');
      socket.off('end');
    };
  }, [handlers]);
};
