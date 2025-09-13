import React, { useEffect, useState } from 'react';
import { useChat } from '../hooks/useChat';
import { useVoiceMode } from '../hooks/useVoiceMode.js';
import ChatModeSelector from './ChatModeSelector';
import TextMode from './Text';
import VoiceMode from './Voice';
import Message from '../components/Message';
import Feed from '../components/Feed';
import Composer from '../components/Composer';

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
    return <ChatModeSelector setChatMode={setChatMode} />;
  }

  return (
    <>
      {chatMode == 'text' ? (
        <TextMode>
          <Feed
            messages={messages}
            renderMessage={(msg) => <Message msg={msg} />}
          />
          <Composer
            sendMessage={sendMessage}
            isConnected={isConnected}
            waitingResponse={waitingResponse}
            generateEntry={generateEntry}
            messages={messages}
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
