import React from 'react';

export default function ChatInput({
  message,
  loading,
  setMessage,
  sendMessage,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
  };

  //TODO: Add loading skelleton while waiting for response
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type your message...'
          disabled={loading}
          required
        />
        <input type='submit' value='Send' />
      </form>
    </div>
  );
}
