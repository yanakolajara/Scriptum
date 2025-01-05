import { useEffect, useState } from 'react';
import { socket } from './socket';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected:', socket.id);
      console.log('Status:', socket.connected);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected' + socket.id);
    });

    socket.on('chat_response', (data) => {
      setAiResponse((prev) => prev + data);
    });

    socket.on('chat_done', () => {
      setChat((prev) => [...prev, { role: 'ai', text: aiResponse }]);
      setLoading(false);
      setAiResponse('');
    });

    socket.on('chat_error', (error) => {
      setAiResponse(`Error: ${error}`);
      setLoading(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat_response');
      socket.off('chat_done');
      socket.off('chat_error');
    };
  }, [aiResponse]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { role: 'user', text: message }]);
    setAiResponse('');
    setLoading(true);
    socket.emit('chat_message', message);
    setMessage('');
  };

  return (
    <div className='App'>
      <h1>Chat</h1>

      <div className='chat-container'>
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
          </p>
        ))}
        {loading && (
          <p>
            <strong>IA:</strong> {aiResponse}{' '}
            <span className='blinking-cursor'>|</span>
          </p>
        )}
      </div>

      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={loading}>
        Send
      </button>
    </div>
  );
}

export default App;
