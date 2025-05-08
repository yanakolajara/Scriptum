import { io } from 'socket.io-client';

export const socket = io(
  import.meta.env.VITE_API_URL || 'http://localhost:8080',
  {
    transports: ['websocket'],
    withCredentials: true,
  }
);
