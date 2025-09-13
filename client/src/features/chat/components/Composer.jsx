import { useState } from 'react';
import '../styles/Composer.scss';

export default function Composer({
  sendMessage,
  isConnected,
  waitingResponse,
  generateEntry,
  messages,
}) {
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className='chat-input-area'>
      <form onSubmit={handleSubmit} className='composer-form'>
        <div className='input-container'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!isConnected || waitingResponse}
            placeholder='Type a message...'
            className='input-field'
            autoFocus
          />
          <button
            type='submit'
            className='send-button'
            disabled={!isConnected || !message.trim()}
            aria-label='Send'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              width={22}
              height={22}
            >
              <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
            </svg>
          </button>
        </div>
      </form>
      <button
        onClick={generateEntry}
        className='generate-button'
        disabled={!messages.length}
      >
        Generate Entry
      </button>
    </div>
  );
}
