import React from 'react';
import ChatMessage from './ChatMessage';

export default function ChatDisplay({ chatArr, streaming, loading }) {
  return (
    <div className='chat-container'>
      {chatArr.map((msg, index) => (
        <ChatMessage key={index} msg={msg} />
      ))}
      {loading && (
        <p>
          <strong>IA:</strong> {streaming}{' '}
          <span className='blinking-cursor'>|</span>
        </p>
      )}
    </div>
  );
}
