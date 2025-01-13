import React from 'react';

export default function Message({ msg, index }) {
  return (
    <p key={index}>
      <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
    </p>
  );
}
