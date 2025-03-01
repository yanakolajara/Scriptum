import React from 'react';
import { useChat } from './hooks/useChat.js';
import ChatDisplay from './components/ChatDisplay.jsx';
import ChatInput from './components/ChatInput.jsx';
import ChatHeader from './components/ChatHeader.jsx';

export default function Chat() {
  const { loading, chat, message, setMessage, sendMessage } = useChat();

  return (
    <div className='chat content'>
      <ChatHeader />
      <ChatDisplay chat={chat} loading={loading} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
}
