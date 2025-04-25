import React, { useEffect } from 'react';
import { useChat } from './hooks/useChat.js';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider.js';
import Container from 'components/Container/Container.jsx';
import './Chat.scss';
import { CTA } from '@/components/CTA/CTA.jsx';

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

  // todo: input should be a text area box
  // todo: input should have a scroll bar
  // todo: chat should scroll to the bottom when a new message is added

  return (
    <Container className='chat-window'>
      <section>
        <h2 className='chat-header-text'>Chat</h2>
      </section>
      <section className='chat'>
        {chat.map((msgData, index) => (
          <ChatMessage key={index} role={msgData.role} message={msgData.text} />
        ))}
      </section>
      <section className='chat-input-container'>
        <form onSubmit={handleSubmit} className='chat-input-container__form'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type your message...'
            required
            className='input-field'
          />
          <input
            type='submit'
            value='Send'
            disabled={loading}
            className='submit-button'
          />
        </form>
        <CTA
          variant='ai-generation'
          onClick={generateEntry}
          className='generate-button'
        >
          Generate
        </CTA>
      </section>
    </Container>
  );
}

const ChatMessage = ({ message, role }) => {
  return (
    <article className={`message-container message-container__${role}`}>
      <p className={`message-text message-${role}`}>
        <strong className='sender-name'>
          {role === 'user' ? 'You' : 'Ai'}:
        </strong>
        {message}
      </p>
    </article>
  );
};
