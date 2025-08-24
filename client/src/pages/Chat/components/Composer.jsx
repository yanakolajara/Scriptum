import { useState } from 'react';

export const Composer = ({
  sendMessage,
  isConnected,
  waitingResponse,
  generateEntry,
  hasMessages,
}) => {
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
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!isConnected || waitingResponse}
            placeholder='Type a message...'
            className='input-field'
          />
          <button
            type='submit'
            className='send-button'
            disabled={!isConnected || !message.trim()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
            </svg>
          </button>
        </div>
      </form>
      <button
        onClick={generateEntry}
        className='generate-button'
        disabled={hasMessages}
      >
        Generate Entry
      </button>
    </div>
  );
};
