export const Feed = ({ messages, renderMessage }) => {
  return (
    <div
      className='chat-messages'
      // ref={chatContainerRef}
    >
      {messages.map((data) => renderMessage(data))}
    </div>
  );
};
