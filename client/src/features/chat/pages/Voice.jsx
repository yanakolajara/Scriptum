import React from 'react';
import { Mic, MicOff, Volume2, Loader2, Sparkles } from 'lucide-react';
import { useVoiceMode } from '../hooks/useVoiceMode';
import Feed from '../components/Feed';
import Message from '../components/Message';
import '../styles/Voice.scss';

export default function VoiceMode({
  messages,
  generateEntry,
  isListening,
  isProcessing,
  isSpeaking,
  onStartListening,
  onStopListening,
}) {
  const getStatusText = () => {
    if (isListening) return 'Listening...';
    if (isProcessing) return 'Processing your request...';
    if (isSpeaking) return 'AI is speaking...';
    return 'Tap to speak';
  };

  const getStatusIcon = () => {
    if (isListening) return <Mic className='status-icon listening' />;
    if (isProcessing) return <Loader2 className='status-icon processing' />;
    if (isSpeaking) return <Volume2 className='status-icon speaking' />;
    return <MicOff className='status-icon idle' />;
  };

  return (
    <div className='voice-interface'>
      <div className='voice-header'>
        <div className='voice-branding'>
          <Sparkles className='voice-logo' />
          <h2>ScriptumAI Voice</h2>
        </div>
        <div className='voice-status'>
          <span className='status-text'>{getStatusText()}</span>
        </div>
      </div>

      <div className='voice-main'>
        <div className='voice-visualizer'>
          <div
            className={`voice-circle ${isListening ? 'listening' : ''} ${
              isProcessing ? 'processing' : ''
            } ${isSpeaking ? 'speaking' : ''}`}
          >
            <div className='voice-circle-inner'>{getStatusIcon()}</div>
            {isListening && (
              <div className='sound-waves'>
                <div className='wave wave-1'></div>
                <div className='wave wave-2'></div>
                <div className='wave wave-3'></div>
              </div>
            )}
          </div>
        </div>

        <div className='voice-controls'>
          <button
            className={`voice-button ${isListening ? 'listening' : ''}`}
            // onClick={isListening ? onStopListening : onStartListening}
            disabled={isProcessing || isSpeaking}
          >
            {isListening ? (
              <>
                <MicOff />
                Stop Listening
              </>
            ) : (
              <>
                <Mic />
                Start Speaking
              </>
            )}
          </button>

          <button
            onClick={generateEntry}
            className='generate-entry-button'
            disabled={!messages.length || isProcessing}
          >
            <Sparkles />
            Generate Entry
          </button>
        </div>
      </div>

      <div className='voice-conversation'>
        <Feed
          messages={messages}
          renderMessage={(msg) => <Message msg={msg} />}
        />
      </div>
    </div>
  );
}
