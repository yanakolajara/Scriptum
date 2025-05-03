import React from 'react';
import { VoiceAnimation } from '../VoiceControls';

const ChatInput = ({
  message,
  setMessage,
  sendMessage,
  voiceMode,
  generateEntry,
  loading,
  hasMessages,
  isListening,
  speaking,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
    }
  };

  return (
    <div className='chat-input-area'>
      {voiceMode ? (
        <div className='voice-input-container'>
          <VoiceAnimation isListening={isListening} speaking={speaking} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <input
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Type a message...'
              className='input-field'
            />
            <button
              type='submit'
              className='send-button'
              disabled={!message.trim()}
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
      )}

      <button
        onClick={generateEntry}
        className='generate-button'
        disabled={loading || !hasMessages}
      >
        Generate Entry
      </button>
    </div>
  );
};

export default ChatInput;
