const registerMessageHandlers = (io, socket) => {
  socket.on('client:send-message', async (message) => {
    try {
      const res = await socket.geminiChat.sendMessage({
        message,
      });
      socket.emit('response', { response: res });
    } catch (error) {
      socket.emit('error', { error: error.message });
    }
  });

  socket.on('client:end-chat', async () => {});
};

export default registerMessageHandlers;
