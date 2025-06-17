import React from 'react';
import VoiceControls from './VoiceControls';
import useChat from './hooks/useChat';
import ChatInput from './components/ChatMessage';
import MessageList from './components/MessageList';
import './Chat.scss';

const Chat = () => {
  const {
    loading,
    chat,
    message,
    setMessage,
    sendMessage,
    generateEntry,
    voiceMode,
    toggleVoiceMode,
    isListening,
    speaking,
    hasRecognitionSupport,
  } = useChat();

  return (
    <div className='chat-interface'>
      <div className='chat-header'>
        <h2>ScriptumAI</h2>
        <VoiceControls
          voiceMode={voiceMode}
          toggleVoiceMode={toggleVoiceMode}
          hasRecognitionSupport={hasRecognitionSupport}
        />
      </div>

      <MessageList messages={chat} loading={loading} />

      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        voiceMode={voiceMode}
        generateEntry={generateEntry}
        loading={loading}
        hasMessages={chat.length > 0}
        isListening={isListening}
        speaking={speaking}
      />
    </div>
  );
};

export default Chat;
