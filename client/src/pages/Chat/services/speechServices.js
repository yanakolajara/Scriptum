export const initRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  return recognition;
};

export const loadVoicesAsync = () =>
  new Promise((resolve) => {
    let voices = speechSynthesis.getVoices();
    if (voices.length) return resolve(voices);

    const onVoicesChanged = () => {
      voices = speechSynthesis.getVoices();
      resolve(voices);
      speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
    };

    speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
  });
