import React from 'react';
import { Mic, MessageCircle, Sparkles } from 'lucide-react';
import { useChat } from '../hooks/useChat';

export function ModeSelector({ setChatMode }) {
  return (
    <div className='mode-selector'>
      <div className='mode-selector-container'>
        <div className='mode-selector-header'>
          <div className='logo-container'>
            <Sparkles className='logo-icon' />
            <h1>ScriptumAI</h1>
          </div>
          <p className='mode-selector-subtitle'>
            Choose your preferred interaction mode
          </p>
        </div>

        <div className='mode-options'>
          <button
            onClick={() => setChatMode('voice')}
            className='mode-button voice-mode-button'
          >
            <div className='mode-icon'>
              <Mic />
            </div>
            <div className='mode-content'>
              <h3>Voice Mode</h3>
              <p>Speak naturally and interact with AI through voice</p>
            </div>
          </button>

          <button
            onClick={() => setChatMode('text')}
            className='mode-button text-mode-button'
          >
            <div className='mode-icon'>
              <MessageCircle />
            </div>
            <div className='mode-content'>
              <h3>Text Mode</h3>
              <p>Type your messages and chat with AI through text</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
