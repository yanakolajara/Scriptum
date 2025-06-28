import { GoogleGenAI } from '@google/genai';
import { generateContextPrompt, updateContextPrompt } from './prompts.js';
import { generateContextContent, updateContextContent } from './contents.js';

const model = process.env.GEMINI_API_MODEL;

export class GeminiService {
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  generateContext = async ({ chat }) => {
    console.log(chat);

    try {
      const context = await this.ai.models.generateContent({
        model,
        config: {
          systemInstruction: generateContextPrompt,
          // thinkingConfig: {
          //   thinkingBudget: 0,
          // },
        },
        contents: generateContextContent({ chat }),
      });
      console.log(`context: ${context.text}`);
      return context.text;
    } catch (error) {
      console.log(error);
    }
  };

  updateContext = async ({ chat, currentContext }) => {
    const updatedContext = await this.ai.models.generateContent({
      model,
      config: {
        systemInstruction: updateContextPrompt,
        // thinkingConfig: {
        //   thinkingBudget: 0,
        // },
      },
      contents: updateContextContent({ chat, currentContext }),
    });
    return updatedContext.text;
  };
}
