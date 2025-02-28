import { useEffect, useState } from 'react';
import { isStringEmpty } from '../utils/validations.js';
import { chatTranscriptFormat } from '../utils/formatting.js';
import { useSocket } from './useSocket.js';

export const useChat = () => {
  const userID = '550e8400-e29b-41d4-a716-446655440000'; // FIXME: Replace with real user id
  const [chat, setChat] = useState([]); // TODO: Turn messages into objects with ID, role, text, isComplete
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // FIXME: Socket not working

  useSocket({
    onStreamStart: () => {
      setLoading(true);
      // TODO: Create new message with message ID
    },
    onStream: (chunk) => {
      // TODO: Update message text by adding new chunk using message ID
      // TODO: if stream paused for x seconds, throw timeout error
      setStreaming((prev) => `${prev}${chunk}`);
    },
    onStreamEnd: () => {
      // TODO: Set last message as complete
      const updatedChat = [...chat, { role: 'ai', text: streaming }];
      setChat(updatedChat);
      setLoading(false);
    },
    onChatEnd: () => {},
    onError: () => {},
  });

  const sendMessage = (message, userToken) => {
    //TODO: Validate message format
    //TODO: Validate userToken format
    //TODO: Add message to chat
    //TODO: Clean input field
    //TODO: Format message for server
    //TODO: Send message to server (server will save message on cache)
    //TODO: Handle errors (server, network, validations, etc)
  };

  useEffect(() => {
    // TODO: If last message is loading, disable input field
    // TODO: If last message is not loading, enable input field
  }, [useSocket]);

  useEffect(() => {
    // TODO: Connect to socket
  }, []);

  return {
    chat,
    loading,
    message,
    setMessage,
  };
};
