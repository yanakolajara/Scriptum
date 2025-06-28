import { GoogleGenAI } from '@google/genai';
import { generateContextPrompt, updateContextPrompt } from './prompts.js';

const model = process.env.GEMINI_API_MODEL;

export class GeminiService {
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  generateContext = async ({ chatHistory }) => {
    try {
      return 'hi';
      const context = await this.ai.models.generateContent({
        model,
        config: {
          systemInstruction: generateContextPrompt,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
        contents: chatHistory,
      });
      console.log(`context: ${context.text}`);
      return context.content;
    } catch (error) {
      console.log(error);
    }
  };

  updateContext = async ({ chat, currentContext }) => {
    return await this.ai.models.generateContent({
      model,
      config: {
        systemInstruction: updateContextPrompt,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
      contents: `
      current context: ${currentContext}
      
      chat history: ${chat}
      `,
    });
  };
}
