import React from 'react';
import Message from './Message';

export default function ChatDisplay({ chatArr, streaming }) {
  return (
    <div className='chat-container'>
      <p>AIRESPONSE: {streaming}</p>

      {chatArr.map((msg, index) => (
        <Message key={index} msg={msg} />
      ))}
      {/* <p>
        <strong>CHATIA:</strong> {aiResponse}{' '}
        <span className='blinking-cursor'>|</span>
      </p> */}
    </div>
  );
}
