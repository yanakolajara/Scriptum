import { useEffect, useCallback, useReducer } from 'react';
import { initialState, speechReducer, ACTIONS } from './speechReducer';
import { initRecognition, loadVoicesAsync } from './speechServices';
import { getPreferredVoice } from './speechUtils';

const useSpeech = () => {
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

  // Synthesis methods
  const speak = useCallback(
    (text, options = {}) => {
      if (!supported.synthesis) return;

      if (isListening) {
        stopListening();
      }

      window.speechSynthesis.cancel();

      if (!text) return;

      const utterance = new SpeechSynthesisUtterance(text);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      utterance.onstart = () =>
        dispatch({ type: ACTIONS.SET_SPEAKING, payload: true });
      utterance.onend = () =>
        dispatch({ type: ACTIONS.SET_SPEAKING, payload: false });
      utterance.onerror = () =>
        dispatch({ type: ACTIONS.SET_SPEAKING, payload: false });

      window.speechSynthesis.speak(utterance);
    },
    [supported.synthesis, selectedVoice, isListening]
  );

  const cancelSpeech = useCallback(() => {
    if (!supported.synthesis) return;

    dispatch({ type: ACTIONS.SET_SPEAKING, payload: false });
    window.speechSynthesis.cancel();
  }, [supported.synthesis]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const recognitionInstance = initRecognition();
      if (recognitionInstance) {
        dispatch({
          type: ACTIONS.SET_RECOGNITION,
          payload: recognitionInstance,
        });
        dispatch({
          type: ACTIONS.SET_SUPPORTED,
          payload: { recognition: true },
        });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      dispatch({ type: ACTIONS.SET_SUPPORTED, payload: { synthesis: true } });

      loadVoicesAsync().then((availableVoices) => {
        dispatch({ type: ACTIONS.SET_VOICES, payload: availableVoices });

        const englishVoice = getPreferredVoice(availableVoices);
        dispatch({ type: ACTIONS.SET_SELECTED_VOICE, payload: englishVoice });
      });

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  // Set up speech recognition event handlers
  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          currentTranscript += event.results[i][0].transcript;
        }
      }
      dispatch({ type: ACTIONS.SET_TRANSCRIPT, payload: currentTranscript });
    };

    const handleEnd = () => {
      dispatch({ type: ACTIONS.SET_LISTENING, payload: false });
    };

    const handleError = (event) => {
      console.error('Speech recognition error', event.error);
      dispatch({ type: ACTIONS.SET_LISTENING, payload: false });
    };

    recognition.addEventListener('result', handleResult);
    recognition.addEventListener('end', handleEnd);
    recognition.addEventListener('error', handleError);

    return () => {
      recognition.removeEventListener('result', handleResult);
      recognition.removeEventListener('end', handleEnd);
      recognition.removeEventListener('error', handleError);
    };
  }, [recognition]);

  useEffect(() => {
    if (speaking && isListening) {
      stopListening();
    }
  }, [speaking]);

  useEffect(() => {
    if (isListening && speaking) {
      cancelSpeech();
    }
  }, [isListening]);

  // Recognition methods
  const startListening = useCallback(() => {
    if (!recognition) return;

    if (speaking) {
      cancelSpeech();
    }

    dispatch({ type: ACTIONS.SET_TRANSCRIPT, payload: '' });
    dispatch({ type: ACTIONS.SET_LISTENING, payload: true });

    try {
      recognition.start();
    } catch (error) {
      console.error('Recognition error:', error);
    }
  }, [recognition, speaking, cancelSpeech]);

  const stopListening = useCallback(() => {
    if (!recognition) return;

    dispatch({ type: ACTIONS.SET_LISTENING, payload: false });

    try {
      recognition.stop();
    } catch (error) {
      console.error('Recognition stop error:', error);
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    dispatch({ type: ACTIONS.SET_TRANSCRIPT, payload: '' });
  }, []);

  const changeVoice = useCallback((voice) => {
    dispatch({ type: ACTIONS.SET_SELECTED_VOICE, payload: voice });
  }, []);

  return {
    // Recognition
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport: supported.recognition,

    // Synthesis
    voices,
    speak,
    cancelSpeech,
    speaking,
    hasSynthesisSupport: supported.synthesis,
    selectedVoice,
    changeVoice,
  };
};

export default useSpeech;
