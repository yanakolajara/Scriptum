import React from 'react';
import { Mic, MessageCircle, Sparkles } from 'lucide-react';
import '../styles/ChatModeSelector.scss';

export default function ChatModeSelector({ setChatMode }) {
  return (
    <section className='mode-selector'>
      <div className='mode-selector__container'>
        <header className='mode-selector__header'>
          <div className='logo-container'>
            <Sparkles className='logo-icon' />
            <h1 className='logo-title'>ScriptumAI</h1>
          </div>
          <p className='mode-selector__subtitle'>
            Choose your preferred interaction mode
          </p>
        </header>
        <div className='mode-options'>
          <button
            type='button'
            onClick={() => setChatMode('voice')}
            className='mode-button voice-mode'
          >
            <Mic className='mode-icon' />
            <div className='mode-content'>
              <h3>Voice Mode</h3>
              <p>Speak naturally and interact with AI through voice</p>
            </div>
          </button>
          <button
            type='button'
            onClick={() => setChatMode('text')}
            className='mode-button text-mode'
          >
            <MessageCircle className='mode-icon' />
            <div className='mode-content'>
              <h3>Text Mode</h3>
              <p>Type your messages and chat with AI through text</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
