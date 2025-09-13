/**
 * Starts speech recognition and resolves once the user stops speaking.
 * Uses the Web Speech API (SpeechRecognition / webkitSpeechRecognition).
 *
 * @async
 * @function captureUserSpeech
 * @param {Object} [options]
 * @param {string} [options.language="en-US"] - Language code for speech recognition.
 * @param {number} [options.silenceDuration=2000] - Time (ms) of silence before stopping recognition.
 * @returns {Promise<string>} Promise that resolves with the user's speech transcript.
 *
 * @example
 * const userResponse = await captureUserSpeech({ language: "es-MX" });
 * console.log(userResponse);
 */
export function captureUserSpeech({
  language = 'en-US',
  silenceDuration = 2000,
  maxInitialWait = 10000,
} = {}) {
  return new Promise((resolve, reject) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(
        new Error('Speech Recognition API not supported in this browser.')
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;

    let finalTranscript = '';
    let silenceTimer;
    let initialWaitTimer;
    let hasSpeechStarted = false; // Track if speech has been detected

    const cleanupTimers = () => {
      clearTimeout(silenceTimer);
      clearTimeout(initialWaitTimer);
    };

    const resetSilenceTimer = () => {
      clearTimeout(silenceTimer);
      console.log('here');
      silenceTimer = setTimeout(() => {
        console.log('TIME:', recognition.state);
        recognition.stop();
      }, silenceDuration);
    };

    recognition.onresult = (event) => {
      console.log(event);
      let interimTranscript = '';
      let speechDetected = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          speechDetected = true;
        } else {
          interimTranscript += transcript;
          // Even interim results indicate speech has started
          if (transcript.trim().length > 0) {
            speechDetected = true;
          }
        }
      }

      // Start timer only after speech is first detected
      if (speechDetected && !hasSpeechStarted) {
        hasSpeechStarted = true;
        resetSilenceTimer();
      } else if (hasSpeechStarted) {
        resetSilenceTimer();
      }
    };

    recognition.onstart = () => {
      finalTranscript = ''; // Reset transcript on new start
      hasSpeechStarted = false; // Reset speech detection flag'
      cleanupTimers();

      // Set timer for maximum initial wait time
      initialWaitTimer = setTimeout(() => {
        if (!hasSpeechStarted && recognition.state === 'listening') {
          recognition.stop();
        }
      }, maxInitialWait);
    };

    recognition.onend = () => {
      clearTimeout(silenceTimer);
      resolve(finalTranscript.trim());
    };

    recognition.onerror = (event) => {
      clearTimeout(silenceTimer);
      reject(new Error(`Speech recognition error: ${event.error}`));
    };

    try {
      recognition.start();
    } catch (error) {
      reject(new Error(`Failed to start speech recognition: ${error.message}`));
    }
  });
}
