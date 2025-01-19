import React from 'react';
import Message from './Message';

export default function ChatDisplay({ chatArr, streaming, loading }) {
  return (
    <div className='chat-container'>
      {chatArr.map((msg, index) => (
        <Message key={index} msg={msg} />
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
