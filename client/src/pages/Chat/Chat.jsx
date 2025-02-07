import React from 'react';
import { useChat } from './hooks/useChat.js';
import ChatDisplay from './components/ChatDisplay.jsx';
import ChatInput from './components/ChatInput.jsx';
import ChatHeader from './components/ChatHeader.jsx';

export default function Chat() {
  const {
    setUserInput,
    handleSendMessage,
    loading,
    userInput,
    chatArr,
    streaming,
  } = useChat();

  return (
    <div className='chat content'>
      <ChatHeader />
      <ChatDisplay chatArr={chatArr} streaming={streaming} loading={loading} />
      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
