import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEntry } from '@/api/entries.js';
import { socket } from '../services/socket.js';
import { useSocket } from '../services/useSocket.js';
import useSpeech from './useSpeech.js';

export const useChat = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const navigate = useNavigate();

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport,

    speak,
    cancelSpeech,
    speaking,
    hasSynthesisSupport,
  } = useSpeech();

  // Handle transcript changes in voice mode
  useEffect(() => {
    if (transcript && voiceMode) {
      // When transcript is available and not empty, send it as a message
      if (transcript.trim().length > 0) {
        sendMessage(transcript);
        resetTranscript();
      }
    }
  }, [transcript, voiceMode]);

  // Speak AI responses in voice mode
  useEffect(() => {
    if (voiceMode && chat.length > 0) {
      const lastMessage = chat[chat.length - 1];
      if (lastMessage.role === 'ai' && lastMessage.fulfilled) {
        speak(lastMessage.text);
      }
    }
  }, [voiceMode, chat, speak]);

  // Socket setup for chat
  useSocket({
    onResponse: ({ response }) => {
      addAiMessage(response.text, true);
      setLoading(false);
    },
    onStreamStart: ({ messageId }) => {
      addAiMessage('', false, messageId);
    },
    onStream: ({ messageId, chunk }) => {
      updateMessageContent(messageId, chunk);
    },
    onStreamFulfilled: ({ messageId }) => {
      markMessageAsFulfilled(messageId);
      setLoading(false);
    },
    onError: (e) => {
      console.error('Error:', e);
      setLoading(false);
    },
  });

  // Helper methods for chat management
  const addUserMessage = useCallback((text) => {
    const messageId = Math.floor(Math.random() * (10000000000 - 1 + 1)) + 1;
    setChat((prevChat) => [
      ...prevChat,
      {
        id: messageId,
        role: 'user',
        text,
        fulfilled: null,
      },
    ]);
    return messageId;
  }, []);

  const addAiMessage = useCallback((text, fulfilled = false, id = null) => {
    const messageId =
      id || Math.floor(Math.random() * (10000000000 - 1 + 1)) + 1;
    setChat((prev) => [
      ...prev,
      { role: 'ai', text, fulfilled, id: messageId },
    ]);
    return messageId;
  }, []);

  const updateMessageContent = useCallback((messageId, newContent) => {
    setChat((prevChat) =>
      prevChat.map((message) =>
        message.id === messageId
          ? { ...message, text: message.text + newContent }
          : message
      )
    );
  }, []);

  const markMessageAsFulfilled = useCallback((messageId) => {
    setChat((prevChat) =>
      prevChat.map((message) =>
        message.id === messageId ? { ...message, fulfilled: true } : message
      )
    );
  }, []);

  // Chat action methods
  const generateEntry = async () => {
    try {
      socket.disconnect();
      const res = await createEntry(chat);
      navigate(`/edit-entry?id=${res.data.id}`);
    } catch (error) {
      console.error('Error in entry:', error.message);
    }
  };

  const sendMessage = (messageText) => {
    if (!messageText?.trim()) return;
    setLoading(true);
    addUserMessage(messageText);
    setMessage('');
    socket.emit('message', { message: messageText });
  };

  const endChat = () => {
    setLoading(true);
    socket.emit('end-chat');
  };

  const toggleVoiceMode = () => {
    const newMode = !voiceMode;
    setVoiceMode(newMode);
    if (newMode) {
      startListening();
    } else {
      stopListening();
      cancelSpeech();
    }
  };

  return {
    loading,
    chat,
    message,
    setMessage,
    sendMessage,
    generateEntry,
    endChat,
    voiceMode,
    toggleVoiceMode,
    isListening,
    speaking,
    hasRecognitionSupport,
    hasSynthesisSupport,
  };
};

export default useChat;
