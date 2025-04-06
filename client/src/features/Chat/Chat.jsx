import React from 'react';
import { useChat } from './hooks/useChat.js';
import { createEntry } from 'api/entries';

export default function Chat() {
  const { loading, chat, message, setMessage, sendMessage, endChat } =
    useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    // sendMessageStream(message);
    sendMessage(message);
  };

  //todo: Add loading skelleton while waiting for response
  return (
    <main className='chat content'>
      <header>
        <h2>Chat</h2>
      </header>
      <section className='chat-container'>
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role === 'user' ? 'You' : 'Ai'}:</strong> {msg.text}
          </p>
        ))}
      </section>
      <section className='chat-input'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type your message...'
            required
          />
          <input type='submit' value='Send' disabled={loading} />
        </form>
        <button onClick={endChat}>Generate entry</button>
      </section>
    </main>
  );
}
