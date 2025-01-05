import { useEffect, useState } from 'react';
import { socket } from './socket';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connecter:', socket.id);
      console.log('Status:', socket.connected);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected' + socket.id);
    });

    socket.on('message_response', (message) => {
      console.log('Received:', message);
      setLoading(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    // setChat((prev) => [...prev, { role: 'user', text: message }]);
    // setAiResponse('');
    setLoading(true);
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className='App'>
      <h1>Chat</h1>

      {/* <div className='chat-container'>
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role === 'user' ? 'You' : 'IA'}:</strong> {msg.text}
          </p>
        ))}
        {loading && (
          <p>
            <strong>IA:</strong> {aiResponse}{' '}
            <span className='blinking-cursor'>|</span>
          </p>
        )}
      </div> */}

      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={loading}>
        Enviar
      </button>
    </div>
  );
}

export default App;
