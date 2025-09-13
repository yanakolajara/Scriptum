import '../styles/Text.scss';

export default function TextMode({ children }) {
  return (
    <div className='text-chat'>
      <header className='chat-header'>
        <h2>ScriptumAI</h2>
      </header>
      <main className='chat-main'>{children}</main>
    </div>
  );
}
