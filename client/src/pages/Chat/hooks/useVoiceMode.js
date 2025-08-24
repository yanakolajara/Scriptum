import { useEffect, useRef } from 'react';
import { captureUserSpeech } from '../services/ASR';
import { speakResponse } from '../services/TTS';

/**
 * Custom hook for handling voice mode chat flow.
 *
 * @param {Object} params
 * @param {boolean} params.waitingResponse - Indicates whether the app is waiting for AI response.
 * @param {Array} params.messages - Chat history containing all messages.
 * @param {Function} params.sendMessage - Function to send user's message to AI.
 * @param {string} params.chatMode - Current chat mode ('voice' or 'text').
 */
export const useVoiceMode = ({
  waitingResponse,
  messages,
  sendMessage,
  chatMode,
}) => {
  const isRunningRef = useRef(false); // Prevent multiple overlapping loops

  /**
   * Main cycle: listens to user, sends message, and waits for AI response.
   */
  const processUserSpeech = async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    let userMessage = '';
    while (!userMessage.trim()) {
      userMessage = await captureUserSpeech();
    }

    sendMessage(userMessage);
    isRunningRef.current = false;
  };

  /**
   * On first render: start listening immediately.
   */
  useEffect(() => {
    if (!waitingResponse && messages.length === 0 && chatMode == 'voice') {
      processUserSpeech();
    }
  }, [chatMode]);

  /**
   * On response received: speak last AI response and start next listening cycle.
   */
  useEffect(() => {
    if (waitingResponse) return;
    if (messages.length === 0) return;
    if (chatMode != 'voice') return;

    const speakAndListen = async () => {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role == 'ai') {
        await speakResponse(lastMessage.text);
        processUserSpeech();
      }
    };

    speakAndListen();
  }, [waitingResponse, messages]);
};
