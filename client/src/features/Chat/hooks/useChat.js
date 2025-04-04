import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '../services/useSocket.js';
import { socket } from '../services/socket.js';
import { createEntry } from 'api/entries.js';
import { useNavigate } from 'react-router-dom';

export const useChat = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      // todo: if stream paused for x seconds, throw timeout error
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
    onEntry: async ({ entry }) => {
      try {
        const res = await createEntry(entry);
        navigate(`/entry?id=${res.data.id}`);
      } catch (error) {
        console.error('Error in entry:', error.message);
      }
    },
    onError: (e) => {
      console.error('Error:', e);
      setLoading(false);
    },
  });

  const sendMessage = (message, token = 'tokentesting') => {
    //todo: validateMessage(message)
    //todo: validateUserToken(userToken)
    //todo: Handle errors (server, network, validations, etc)
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
      socket.emit('message', { message });
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
  //     socket.emit('message', { message });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const endChat = () => {
    socket.emit('end');
  };

  useEffect(() => {}, [useSocket]);

  return {
    loading,
    chat,
    message,
    setChat,
    setMessage,
    sendMessage,
    endChat,
  };
};
