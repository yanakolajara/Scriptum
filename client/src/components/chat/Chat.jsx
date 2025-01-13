import React from 'react';
import { useChat } from './useChat.js';
import ChatDisplay from './ChatDisplay.jsx';
import ChatInput from './ChatInput.jsx';

export default function Chat() {
  // Importando el estado del chat y funciones desde useChat.js
  const { setUserInput, handleSendMessage, userInput, chatArr, streaming } =
    useChat();

  return (
    <div className='chat'>
      <h1>Chat</h1>
      <ChatDisplay chatArr={chatArr} streaming={streaming} />
      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
