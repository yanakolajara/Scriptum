import { useState, useEffect, useCallback } from 'react';

const useSpeech = () => {
  // Speech Recognition States
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Speech Synthesis States
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState({
    recognition: false,
    synthesis: false,
  });
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      setRecognition(recognitionInstance);
      setSupported((prev) => ({ ...prev, recognition: true }));
    }
  }, []);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported((prev) => ({ ...prev, synthesis: true }));

      // Function to load voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();

        if (availableVoices.length > 0) {
          setVoices(availableVoices);

          // Set default voice (preferably a female English voice)
          const englishVoice =
            availableVoices.find(
              (voice) =>
                voice.lang.includes('en-') && voice.name.includes('Female')
            ) ||
            availableVoices.find((voice) => voice.lang.includes('en-')) ||
            availableVoices[0];

          setSelectedVoice(englishVoice);
        }
      };

      loadVoices();

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }

      return () => {
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = null;
        }
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  // Set up speech recognition event handlers
  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          currentTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(currentTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    return () => {
      if (recognition) {
        recognition.onresult = null;
        recognition.onend = null;
        recognition.onerror = null;
      }
    };
  }, [recognition]);

  // Key Functionality: When speaking starts, stop listening
  useEffect(() => {
    if (speaking && isListening) {
      stopListening();
    }
  }, [speaking]);

  // Key Functionality: When listening starts, stop speaking
  useEffect(() => {
    if (isListening && speaking) {
      cancelSpeech();
    }
  }, [isListening]);

  // Recognition methods
  const startListening = useCallback(() => {
    if (!recognition) return;

    // If speaking, stop it first
    if (speaking) {
      cancelSpeech();
    }

    setTranscript('');
    setIsListening(true);

    try {
      recognition.start();
    } catch (error) {
      // Handle the case where recognition is already started
      console.error('Recognition error:', error);
    }
  }, [recognition, speaking]);

  const stopListening = useCallback(() => {
    if (!recognition) return;

    setIsListening(false);

    try {
      recognition.stop();
    } catch (error) {
      console.error('Recognition stop error:', error);
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  // Synthesis methods
  const speak = useCallback(
    (text, options = {}) => {
      if (!supported.synthesis) return;

      // If currently listening, stop it first
      if (isListening) {
        stopListening();
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      if (!text) return;

      const utterance = new SpeechSynthesisUtterance(text);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Set default options and override with provided options
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [supported.synthesis, selectedVoice, isListening, stopListening]
  );

  const cancelSpeech = useCallback(() => {
    if (!supported.synthesis) return;

    setSpeaking(false);
    window.speechSynthesis.cancel();
  }, [supported.synthesis]);

  const changeVoice = useCallback((voice) => {
    setSelectedVoice(voice);
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
