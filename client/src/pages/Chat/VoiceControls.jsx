import React from 'react';
import './VoiceControls.scss';

// Voice animation component that can be used in the chat input area
export const VoiceAnimation = ({ isListening, speaking }) => {
  return (
    <div className="voice-animation-container">
      {isListening && (
        <div className="listening-indicator">
          <div className="listening-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="status-text">Listening...</span>
        </div>
      )}

      {speaking && (
        <div className="speaking-indicator">
          <div className="speaking-wave">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="status-text">Speaking...</span>
        </div>
      )}
    </div>
  );
};

const VoiceControls = ({
  voiceMode,
  toggleVoiceMode,
  isListening,
  speaking,
  hasRecognitionSupport,
}) => {
  // If speech recognition is not supported, show a message
  if (!hasRecognitionSupport) {
    return (
      <div className='voice-controls voice-controls--unsupported'>
        <p className='voice-controls__message'>
          Voice chat is not supported in this browser.
        </p>
      </div>
    );
  }

  return (
    <div className='voice-controls'>
      <button
        className={`voice-toggle ${voiceMode ? 'voice-toggle--active' : ''}`}
        onClick={toggleVoiceMode}
        aria-label={voiceMode ? 'Switch to text mode' : 'Switch to voice mode'}
        title={voiceMode ? 'Switch to text mode' : 'Switch to voice mode'}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='voice-icon'
        >
          <path d='M12 15c1.93 0 3.5-1.57 3.5-3.5V5.5C15.5 3.57 13.93 2 12 2S8.5 3.57 8.5 5.5v6c0 1.93 1.57 3.5 3.5 3.5z' />
          <path d='M12 16.5c-2.76 0-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.59c3.39-.49 6-3.39 6-6.91h-2c0 2.76-2.24 5-5 5z' />
        </svg>
      </button>

      {/* Removed status indicators from header */}
    </div>
  );
};

export default VoiceControls;
