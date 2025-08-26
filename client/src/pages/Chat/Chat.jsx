import React, { useEffect, useState } from 'react';
import { useChat } from './hooks/useChat';
import { useVoiceMode } from './hooks/useVoiceMode.js';
import { Message } from './components/Message';
import { Feed } from './components/Feed';
import { TextMode } from './TextMode';
import { Composer } from './components/Composer';
import { VoiceMode } from './VoiceMode';
import { ModeSelector } from './components/ModeSelector';
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
    return <ModeSelector setChatMode={setChatMode} />;
  }

  return (
    <>
      {chatMode == 'text' ? (
        <TextMode>
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
        <VoiceMode
          messages={messages}
          generateEntry={generateEntry}
          isListening={false} // You'll need to add this state
          isProcessing={waitingResponse}
          isSpeaking={false} // You'll need to add this state
          onStartListening={() => {}} // You'll need to implement this
          onStopListening={() => {}} // You'll need to implement this
        />
      )}
    </>
  );
};

export default Chat;
