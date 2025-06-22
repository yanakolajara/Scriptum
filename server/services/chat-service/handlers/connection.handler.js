// Este handler recibe la instancia de 'io' y del 'socket' actual desde socket.js
const registerConnectionHandlers = (io, socket) => {
  socket.on('connect', () => {
    console.log(`Socket connected: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};

export default registerConnectionHandlers;
