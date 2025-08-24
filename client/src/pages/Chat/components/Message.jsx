export const Message = ({ role, text }) => {
  return (
    <div className={`message-bubble ${role}-message`}>
      <div className='message-content'>
        <p>{text}</p>
      </div>
    </div>
  );
};
