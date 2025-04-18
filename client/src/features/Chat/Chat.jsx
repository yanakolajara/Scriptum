import React, { useEffect } from 'react';
import { useChat } from './hooks/useChat.js';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider.js';
import Container from 'components/Container/Container.jsx';
import './Chat.scss';

export default function Chat() {
  const { loading, chat, message, setMessage, sendMessage, generateEntry } =
    useChat();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // sendMessageStream(message);
    sendMessage(message);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <Container className='chat-window'>
      <header>
        <h2 className='text-center text-xl text-[#333]'>Chat</h2>
      </header>
      <section className='chat'>
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
    </Container>
  );
}

const ChatMessage = ({ message, role }) => {
  return (
    <article className={`message-container message-container__${role}`}>
      <p
        className={`message-text message-${role} ${
          role === 'user' ? 'bg-[#fffbcc] self-end' : 'bg-[#f0f0f0] self-start'
        }`}
      >
        <strong style={{ paddingRight: '0.5rem' }}>
          {role === 'user' ? 'You' : 'Ai'}:{' '}
        </strong>{' '}
        {message}
      </p>
    </article>
  );
};
