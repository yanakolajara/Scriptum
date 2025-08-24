import React, { useEffect, useState } from 'react';
import { useChat } from './hooks/useChat';
import { useVoiceMode } from './hooks/useVoiceMode.js';
import { Message } from './components/Message';
import { Feed } from './components/Feed';
import { TextMode } from './components/TextMode';
import { Composer } from './components/Composer';
import './Chat.scss';

const Chat = () => {
  const {
    sendMessage,
    messages,
    isConnected,
    generateEntry,
    chatMode,
    setChatMode,
    waitingResponse,
  } = useChat();

  useVoiceMode({
    waitingResponse,
    messages,
    sendMessage,
    chatMode,
  });

  if (!chatMode) {
    return (
      <>
        <button onClick={() => setChatMode('voice')}>Voice</button>
        <button onClick={() => setChatMode('text')}>Chat</button>
      </>
    );
  }

  return (
    <>
      {chatMode == 'text' ? (
        <TextMode>
          <div className='chat-header'>
            <h2>ScriptumAI</h2>
          </div>
          <Feed
            messages={messages}
            renderMessage={({ role, text }) => (
              <Message role={role} text={text} />
            )}
          />
          <Composer
            sendMessage={sendMessage}
            isConnected={isConnected}
            waitingResponse={waitingResponse}
            generateEntry={generateEntry}
            hasMessages={!!messages.length}
          />
        </TextMode>
      ) : (
        <div className='voice-interface'>
          <p>Voice mode active. Speak now...</p>
          <Feed
            messages={messages}
            renderMessage={({ role, text }) => (
              <Message role={role} text={text} />
            )}
          />
          <button
            onClick={generateEntry}
            className='generate-button'
            disabled={!messages.length}
          >
            Generate Entry
          </button>
        </div>
      )}
    </>
  );
};

export default Chat;
