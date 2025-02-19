import { getGenaiResponse } from './genaiService.js';
import {
  createConversation,
  createMessage,
} from '../controllers/chat.controller.js';

export const createChatEvent = async (socket, userID) => {
  const newChat = await createConversation(userID);
  console.log('chat.sockets:', newChat);
  socket.emit('chat:created', newChat.id);
};

export const genaiMessageEvent = async (socket, data) => {
  console.log('genaiMessageEvent:', data);
  const { chatID, userInput, chatTranscript } = data;
  await createMessage(chatID, userInput, 'user');
  let aiResponse = '';
  const stream = await getGenaiResponse(chatTranscript);
  for await (const chunk of stream) {
    const text = chunk.text();
    aiResponse += text;
    socket.emit('genai:stream', text);
  }

  await createMessage(chatID, aiResponse, 'ai');
  socket.emit('genai:finalized');
};
