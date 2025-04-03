import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '../services/useSocket.js';
import { socket } from '../services/socket.js';

export const useChat = () => {
  const userToken = '550e8400-e29b-41d4-a716-446655440000'; // FIXME: Replace with real user id
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useSocket({
    onResponse: ({ response }) => {
      setChat((prev) => [
        ...prev,
        { role: 'ai', text: response.text, fulfilled: true, id: uuidv4() },
      ]);
      setLoading(false);
    },
    onStreamStart: ({ messageId }) => {
      setChat((prev) => [
        ...prev,
        { role: 'ai', text: '', fulfilled: false, id: messageId },
      ]);
    },
    onStream: ({ messageId, chunk }) => {
      const updatedChat = chat.map((message) => {
        if (message.id === messageId) {
          return { ...message, text: message.text + chunk };
        }
        return message;
      });
      setChat(updatedChat);
    },
    onStreamFulfilled: ({ messageId }) => {
      console.log(String(chat));
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
      socket.emit('chat:message', { message, userToken });
    } catch (err) {
      console.error(err);
    }
  };

  // const sendMessageStream = (message, token = 'tokentesting') => {
  //   try {
  //     setLoading(true);
  //     setChat((prevChat) => [
  //       ...prevChat,
  //       {
  //         id: uuidv4(),
  //         role: 'user',
  //         text: message,
  //         fulfilled: null,
  //       },
  //     ]);
  //     setMessage('');
  //     socket.emit('chat:message', { message, userToken });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const endChat = (userToken) => {
    //? Use session ID as entry ID
    socket.emit('chat:ends');
  };

  useEffect(() => {}, [useSocket]);

  return {
    loading,
    chat,
    message,
    setChat,
    setMessage,
    sendMessage,
  };
};
