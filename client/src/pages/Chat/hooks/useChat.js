import { useEffect, useState } from 'react';
import { isStringEmpty } from '../utils/validations.js';
import { chatTranscriptFormat } from '../utils/formatting.js';
import { useSocket } from './useSocket.js';
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../../../socket.js';

export const useChat = () => {
  const token = '550e8400-e29b-41d4-a716-446655440000'; // FIXME: Replace with real user id
  const [chat, setChat] = useState([]); // TODO: Turn messages into objects with ID, role, text, fulfilled
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // FIXME: Socket not working

  useSocket({
    onStreamStart: ({ messageId }) => {
      console.log('Stream started');
      console.log('messageId:', messageId);

      setChat((prev) => [
        ...prev,
        { role: 'ai', text: '', fulfilled: false, id: messageId },
      ]);
    },
    onStream: ({ messageId, chunk }) => {
      console.log('Stream:', chunk);
      console.log('Chat:', chat);
      const updatedChat = chat.map((message) => {
        if (message.id === messageId) {
          return { ...message, text: message.text + chunk };
        }
        return message;
      });
      setChat(updatedChat);
      //* if stream paused for x seconds, throw timeout error
    },
    onStreamFulfilled: ({ messageId }) => {
      console.log('Stream fulfilled');
      const updatedChat = chat.map((message) => {
        if (message.id === messageId) {
          return { ...message, fulfilled: true };
        }
        return message;
      });
      setChat(updatedChat);
      setLoading(false);
    },
    onChatEnd: (summary) => {
      console.log('Chat ended, summary:', summary);
    },
    onError: (e) => {
      console.error('Error:', e);
      setLoading(false);
    },
  });

  const sendMessage = (message, token = 'tokentesting') => {
    try {
      // validateMessage(message); TODO
      // validateUserToken(userToken); TODO
      setLoading(true);
      setChat((prevChat) => [
        ...prevChat,
        {
          id: uuidv4(),
          role: 'user',
          text: message,
          fulfilled: null,
        },
      ]);
      setMessage('');
      //! Delete chat after cache is implemented
      socket.emit('chat:message', { message, token, chat });
    } catch (err) {
      //TODO: Handle errors (server, network, validations, etc)
      console.error(err);
    }
  };

  // Ends the chat and waits for the AI generated entry
  const endChat = (userToken) => {
    //? Use session ID as entry ID
    socket.emit('chat:ends');
  };

  useEffect(() => {
    // TODO: If last message is loading, disable input field
    // TODO: If last message is not loading, enable input field
  }, [useSocket]);

  return {
    loading,
    chat,
    message,
    setChat,
    setMessage,
    sendMessage,
  };
};
