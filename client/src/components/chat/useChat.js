import { useEffect, useState } from 'react';
import { isStringEmpty } from './validations.js';
import { chatTranscriptFormat } from './formatting.js';
import {
  chatCreate,
  cleanupListeners,
  genaiRequest,
  initializeListeners,
} from './useSocket.js';

export const useChat = () => {
  // TODO: Replace with real user id
  const userID = '550e8400-e29b-41d4-a716-446655440000';
  const [chatID, setChatID] = useState('');
  const [chatArr, setChatArr] = useState([]);
  const [streaming, setStreaming] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleChatCreated = (chatID) => setChatID(chatID);

  const handleSendMessage = () => {
    if (isStringEmpty(userInput)) return;
    const updatedChat = [...chatArr, { role: 'user', text: userInput }];
    setChatArr(updatedChat);
    setStreaming('');
    genaiRequest(chatID, userInput, chatTranscriptFormat(updatedChat));
    setUserInput('');
  };

  const handleGenaiStream = (chunk) => {
    setStreaming(streaming + chunk);
  };

  const handleGenaiFinalized = () => {
    const updatedChat = [...chatArr, { role: 'FINALai', text: streaming }];
    setChatArr(updatedChat);
  };

  const handleError = (error) => {
    console.error('[useChat.js > handleError] Chat error:', error);
    setStreaming(`Error: ${error}`);
  };

  useEffect(() => {
    initializeListeners({
      onChatCreated: handleChatCreated,
      onGenaiStream: handleGenaiStream,
      onGenaiFinalized: handleGenaiFinalized,
      onError: handleError,
    });
    return () => cleanupListeners;
  }, [streaming]);

  useEffect(() => {
    if (!chatID) chatCreate(userID);
  }, [chatID]);

  return {
    userInput,
    chatArr,
    streaming,
    handleChatCreated,
    handleSendMessage,
    handleGenaiStream,
    handleGenaiFinalized,
    handleError,
    setUserInput,
    setChatArr,
    setStreaming,
  };
};
