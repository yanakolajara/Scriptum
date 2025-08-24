import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  // 9. Connect to Socket.IO server
  connect(url) {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(url, {
        transports: ['websocket'],
        withCredentials: true,
      });

      // 10. Setup default listeners
      this.socket.on('connect', () => {
        this.notifyListeners('connect', 'connected');
      });

      this.socket.on('response', (message) => {
        this.notifyListeners('response', message);
      });

      this.socket.on('disconnect', () => {
        this.notifyListeners('disconnect', 'disconnected');
      });
    }
    return this;
  }

  // 11. Disconnect from server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // 12. Send message to server
  send(message) {
    if (this.socket?.connected) {
      this.socket.emit('message', message);
    }
  }

  // 13. Add event listener
  addListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.removeListener(event, callback);
  }

  // 14. Remove event listener
  removeListener(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  // 15. Notify all listeners of an event
  notifyListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((cb) => cb(data));
    }
  }
}

export const socketService = new SocketService();
