import { GoogleGenAI } from '@google/genai';
import { SystemInstructionPrompt } from '../prompts/SystemInstruction.js';

export const initializeGenaiChat = ({ userContext }) => {
  const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const geminiChat = gemini.chats.create({
    model: process.env.GEMINI_API_MODEL || 'gemini-2.5-flash',
    systemInstruction: SystemInstructionPrompt({ userContext }),
  });
  return geminiChat;
};
