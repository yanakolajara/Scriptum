export function TextMode({ children }) {
  return (
    <div className='text-mode'>
      <div className='chat-header'>
        <h2>ScriptumAI</h2>
      </div>
      {children}
    </div>
  );
}
