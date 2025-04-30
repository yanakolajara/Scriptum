import React from 'react';

const MessageBubble = ({ message }) => {
  const { role, text, fulfilled } = message;
  const isAi = role === 'ai';

  return (
    <div className={`message-bubble ${isAi ? 'ai-message' : 'user-message'}`}>
      <div className='message-content'>
        <p>{text}</p>
      </div>

      {isAi && !fulfilled && (
        <div className='typing-indicator'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
