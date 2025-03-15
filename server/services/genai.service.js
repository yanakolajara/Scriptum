import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config.js';
import { modelSettings } from './data/modelSettings.js';
import { systemInstructions } from './data/systemInstructions.js';

export class GenaiChat {
  constructor(userContext) {
    this.userContext = userContext;
    this.genAI = new GoogleGenerativeAI(config.externalServices.genaiApiKey);
    const model = this.genAI.getGenerativeModel(modelSettings(userContext));
    this.chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });
  }

  async sendMessage(message) {
    const messageId = uuidv4();
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return await response.text();
    } catch (e) {
      console.error('Error in sendMessage:', e.message);
    }
  }

  async sendMessageStream(message) {
    const messageId = uuidv4();
    try {
      const result = await this.chat.sendMessageStream(message);
      return { stream: result.stream, messageId };
    } catch (e) {
      console.error('Error in sendMessageStream:', e.message);
    }
  }

  async generateEntry(chat, userContext, cacheName) {
    try {
      await updateChatCache(chat, userContext, cacheName);
      const summaryPrompt =
        'Please provide a brief first-person summary of the conversation above.';
      const summaryResponse = await chat.sendMessageStream(summaryPrompt);
      let summary = '';
      for await (const chunk of summaryResponse) {
        summary += chunk.text();
      }
      await cacheManager.delete({ cacheName });
      return summary;
    } catch (error) {
      console.error('Error in generateEntry:', error.message);
    }
  }
}
