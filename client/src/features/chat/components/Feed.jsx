import { useEffect, useRef } from 'react';
import '../styles/Feed.scss';

export default function Feed({ messages, renderMessage }) {
  const feedRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: feedRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className='chat-feed' ref={feedRef}>
      {messages.map((msg, idx) => (
        <div key={idx} className='chat-message'>
          {renderMessage(msg)}
        </div>
      ))}
    </div>
  );
}
