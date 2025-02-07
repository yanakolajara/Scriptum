import React from 'react';

export default function ChatInput({
  userInput,
  setUserInput,
  handleSendMessage,
}) {
  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <input
        type='text'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        required
      />

      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
