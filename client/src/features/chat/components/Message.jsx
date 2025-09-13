import '../styles/Message.scss';

export default function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`message-row ${isUser ? 'right' : 'left'}`}>
      <div
        className={`message-bubble ${isUser ? 'user-message' : 'ai-message'}`}
      >
        <div className='message-content'>
          <p>{msg.parts[0].text}</p>
        </div>
      </div>
    </div>
  );
}
