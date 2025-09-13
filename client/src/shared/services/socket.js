import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  // Connect to Socket.IO server
  connect(url) {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(url, {
        transports: ['websocket'],
        withCredentials: true,
      });

      // Setup default listeners
      this.socket.on('connected', () => {
        this.notifyListeners('connected', 'connected');
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

  /**
   *  Starts conversation with initial history
   * @param {Array} [initialConversation = []] - Initial conversation history
   * @returns {void}
   */
  startChat(initialConversation = []) {
    if (this.socket?.connected) {
      this.socket.emit('start-chat', initialConversation);
    }
  }

  // Disconnect from server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Send message to server
  send(message) {
    if (this.socket?.connected) {
      this.socket.emit('message', message);
    }
  }

  // Add event listener
  addListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.removeListener(event, callback);
  }

  // Remove event listener
  removeListener(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  // Notify all listeners of an event
  notifyListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((cb) => cb(data));
    }
  }
}

export const socketService = new SocketService();
