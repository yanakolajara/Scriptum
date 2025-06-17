import { useEffect, useReducer, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEntry, editEntry } from '@/api/entries.js';
import { socket } from '../services/socket.js';
import { useSocket } from '../services/useSocket.js';
import { initialState, speechReducer, ACTIONS } from './speechReducer.js';
import {
  initRecognition,
  loadVoicesAsync,
} from '../services/speechServices.js';
import { getPreferredVoice } from '../utils/speechUtils.js';
import { updateUserContext } from '@/api/userContext.js';
import toast from 'react-hot-toast';

export const useChat = () => {
  const [state, dispatch] = useReducer(speechReducer, initialState);
  const {
    transcript,
    isListening,
    recognition,
    voices,
    selectedVoice,
    speaking,
    supported,
  } = state;

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const navigate = useNavigate();
  const speak = useCallback(
    (text) => {
      if (!supported.synthesis || !text) return;
      if (speaking) {
        cancelSpeech();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.onstart = () =>
        dispatch({ type: ACTIONS.SET_SPEAKING, payload: true });
      utterance.onend = () =>
        dispatch({ type: ACTIONS.SET_SPEAKING, payload: false });
      utterance.onerror = () =>
        dispatch({ type: ACTIONS.SET_SPEAKING, payload: false });
      window.speechSynthesis.speak(utterance);
    },
    [selectedVoice, speaking, supported.synthesis]
  );

  const cancelSpeech = useCallback(() => {
    if (supported.synthesis) {
      window.speechSynthesis.cancel();
      dispatch({ type: ACTIONS.SET_SPEAKING, payload: false });
    }
  }, [supported.synthesis]);
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
  useEffect(() => {
    const recognitionInstance = initRecognition();
    if (recognitionInstance) {
      dispatch({ type: ACTIONS.SET_RECOGNITION, payload: recognitionInstance });
      dispatch({
        type: ACTIONS.SET_SUPPORTED,
        payload: { recognition: true, synthesis: 'speechSynthesis' in window },
      });

      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        dispatch({
          type: ACTIONS.SET_TRANSCRIPT,
          payload: finalTranscript || interimTranscript,
        });
      };

      recognitionInstance.onend = () => {
        dispatch({ type: ACTIONS.SET_LISTENING, payload: false });
      };

      recognitionInstance.onerror = () => {
        dispatch({ type: ACTIONS.SET_LISTENING, payload: false });
      };
    } else {
      dispatch({
        type: ACTIONS.SET_SUPPORTED,
        payload: { recognition: false, synthesis: 'speechSynthesis' in window },
      });
    }

    loadVoicesAsync().then((loadedVoices) => {
      dispatch({ type: ACTIONS.SET_VOICES, payload: loadedVoices });
      const preferred = getPreferredVoice(loadedVoices);
      dispatch({ type: ACTIONS.SET_SELECTED_VOICE, payload: preferred });
    });

    return () => {
      if (recognitionInstance) {
        recognitionInstance.onresult = null;
        recognitionInstance.onend = null;
        recognitionInstance.onerror = null;
        recognitionInstance.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);
  useEffect(() => {
    if (transcript && voiceMode) {
      if (transcript.trim().length > 0) {
        sendMessage(transcript);
        dispatch({ type: ACTIONS.SET_TRANSCRIPT, payload: '' });
      }
    }
  }, [transcript, voiceMode]);
  useEffect(() => {
    if (voiceMode && chat.length > 0 && supported.synthesis) {
      const lastMessage = chat[chat.length - 1];
      if (lastMessage.role === 'ai' && lastMessage.fulfilled) {
        speak(lastMessage.text);
      }
    }
  }, [voiceMode, chat, speak, supported.synthesis]);
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
  const generateEntry = () => {
    createEntry(chat)
      .then((res) => {
        updateUserContext(res.data);
        navigate(`/edit-entry?id=${res.data.id}`);
      })
      .catch((e) => toast.error(message))
      .finally(() => socket.disconnect());
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
      if (recognition && !isListening) {
        recognition.start();
        dispatch({ type: ACTIONS.SET_LISTENING, payload: true });
      }
    } else {
      if (recognition && isListening) {
        recognition.stop();
        dispatch({ type: ACTIONS.SET_LISTENING, payload: false });
      }
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
    hasRecognitionSupport: supported.recognition,
    hasSynthesisSupport: supported.synthesis,
  };
};

export default useChat;
