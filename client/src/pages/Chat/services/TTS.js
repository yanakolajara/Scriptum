/**
 * Speaks the given text using Web Speech API.
 *
 * @param {string} text - The text to be spoken.
 * @param {string} [lang="en-US"] - Language code for speech synthesis.
 * @returns {Promise<void>} Promise that resolves when speaking is finished.
 */
export function speakResponse(text, lang = 'en-US') {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('Speech Synthesis not supported in this browser.'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IE';

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e.error);

    window.speechSynthesis.speak(utterance);
  });
}
