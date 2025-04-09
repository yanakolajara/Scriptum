import React from 'react';
import { useChat } from './hooks/useChat.js';

export default function Chat() {
  const { loading, chat, message, setMessage, sendMessage, generateEntry } =
    useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    // sendMessageStream(message);
    sendMessage(message);
  };

  return (
    <main className='flex w-[560px] h-[684px] py-[20px] px-[1px] flex-col justify-end items-center gap-[25px] rounded-2xl border border-[#DFE4EA]'>
      <header>
        <h2 className='text-center text-xl text-[#333]'>Chat</h2>
      </header>
      <section className='flex-grow overflow-y-auto p-4 flex flex-col gap-2.5'>
        {chat.map((msgData, index) => (
          <ChatMessage key={index} role={msgData.role} message={msgData.text} />
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

const ChatMessage = ({ message, role }) => {
  return (
    <p
      className={`p-4 rounded-xl max-w-[75%] ${
        role === 'user' ? 'bg-[#fffbcc] self-end' : 'bg-[#f0f0f0] self-start'
      }`}
    >
      <strong>{role === 'user' ? 'You' : 'Ai'}:</strong> {message}
    </p>
  );
};
