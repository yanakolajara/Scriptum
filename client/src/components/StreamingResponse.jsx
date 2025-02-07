import React from 'react';
import { useStreamResponse } from '../hooks/useStreamResponse';

export const StreamingResponse = ({ transcript }) => {
  const response = useStreamResponse(transcript);

  return (
    <p>{response}</p>
  );
};

// Usage example:
const App = () => {
  return (
    <div>
      <StreamingResponse transcript="Your prompt here" />
    </div>
  );
};