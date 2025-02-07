import { useState, useEffect } from 'react';
import { streamResponse } from '../services/stream.service';

export const useStreamResponse = (transcript) => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchStream = async () => {
      const stream = streamResponse(transcript);
      for await (const chunk of stream) {
        setResponse(prev => prev + chunk);
      }
    };

    if (transcript) {
      fetchStream();
    }
  }, [transcript]);

  return response;
};