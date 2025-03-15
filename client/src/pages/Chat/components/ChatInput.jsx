import React, { useEffect } from 'react';

export default function ChatInput({
  message,
  loading,
  setMessage,
  sendMessage,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // sendMessageStream(message);
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
          required
        />
        <input type='submit' value='Send' disabled={loading} />
      </form>
    </div>
  );
}
