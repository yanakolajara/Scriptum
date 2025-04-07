import React from 'react';
import { useChat } from './hooks/useChat.js';
import { createEntry } from 'api/entries';

export default function Chat() {
  const { loading, chat, message, setMessage, sendMessage, generateEntry } =
    useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    // sendMessageStream(message);
    sendMessage(message);
  };

  return (
    <main className='flex flex-col justify-between w-full bg-[#dedede] rounded-xl shadow-lg p-4 overflow-hidden'>
      <header>
        <h2 className='text-center text-xl text-[#333]'>Chat</h2>
      </header>
      <section className='flex-grow overflow-y-auto p-4 flex flex-col gap-2.5'>
        {chat.map((msg, index) => (
          <p
            key={index}
            className={`p-4 rounded-xl max-w-[75%] ${
              msg.role === 'user'
                ? 'bg-[#fffbcc] self-end'
                : 'bg-[#f0f0f0] self-start'
            }`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'Ai'}:</strong> {msg.text}
          </p>
        ))}
      </section>
      <section className='flex items-center p-2.5 border-t-2 border-[#ddd]'>
        <form onSubmit={handleSubmit} className='flex w-full items-center'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type your message...'
            required
            className='flex-grow p-2 rounded-full border border-[#ccc] text-base'
          />
          <input
            type='submit'
            value='Send'
            disabled={loading}
            className='ml-2.5 bg-[#4a90e2] text-white p-2.5 rounded-full cursor-pointer text-lg hover:bg-[#357abf] disabled:opacity-50'
          />
        </form>
        <button
          onClick={generateEntry}
          className='ml-2.5 bg-[#4a90e2] text-white p-2.5 rounded-full cursor-pointer text-lg hover:bg-[#357abf]'
        >
          Generate entry
        </button>
      </section>
    </main>
  );
}
