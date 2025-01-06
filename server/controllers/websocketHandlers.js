import { getGeminiResponse } from '../services/geminiService.js';
import { createConversation, createMessage } from './chatController.js';

export const handleStartConversation = async (socket, userId) => {
  try {
    const newConversation = await createConversation(userId);
    socket.emit('conversation_started', newConversation);
  } catch (error) {
    console.error('Error starting conversation:', error);
    socket.emit('conversation_error', 'Error starting conversation');
  }
};

export const handleChatMessage = async (
  socket,
  { conversationId, message }
) => {
  console.log(`Received message from user: ${message}`);

  await createMessage(conversationId, message, 'user');

  try {
    const stream = await getGeminiResponse(message);
    let aiResponse = '';

    for await (const chunk of stream) {
      const text = chunk.text();
      aiResponse += text;
      socket.emit('chat_response', text);
    }

    await createMessage(conversationId, aiResponse, 'ai');
    socket.emit('chat_done');
  } catch (error) {
    console.error('Error:', error);
    socket.emit('chat_error', 'Streaming error');
  }
};

export const handleDisconnect = (socket) => {
  console.log(`User disconnected: ${socket.id}`);
};
