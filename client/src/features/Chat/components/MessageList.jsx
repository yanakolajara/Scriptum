import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages, loading }) => {
  const chatContainerRef = useRef(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='chat-messages' ref={chatContainerRef}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {loading &&
        messages.length > 0 &&
        messages[messages.length - 1]?.role === 'user' && (
          <div className='message-bubble ai-message'>
            <div className='typing-indicator'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
    </div>
  );
};

export default MessageList;
