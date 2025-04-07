import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config.js';
import { modelSettings } from './data/modelSettings.js';
import { formatChat } from '../utils/adapters.utils.js';
import { userContext } from '../genaiFakeContext.js';

export const genaiRequest = async (prompt) => {
  const genai = new GoogleGenerativeAI(config.externalServices.genaiApiKey);
  const model = genai.getGenerativeModel(modelSettings(userContext));
  const res = await model.generateContent(prompt);
  return res;
};

export class GenaiChat {
  constructor(userContext) {
    this.userContext = userContext;
    this.genAI = new GoogleGenerativeAI(config.externalServices.genaiApiKey);
    this.model = this.genAI.getGenerativeModel(modelSettings(userContext));
    this.chat = this.model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });
  }

  async sendMessage(message) {
    const messageId = uuidv4();
    try {
      const res = await this.chat.sendMessage(message);
      return { text: res.response.text(), messageId };
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

  /**
   * Generates an entry in first person based on the chat history
   *
   * @returns
   */
  async generateEntry(chat) {
    try {
      let history = await this.chat.getHistory();
      history = formatChat(history);
      const prompt =
        'Generate an entry in first person based on the chat history. ' +
        'The entry should be a summary of the conversation, ' +
        'including the main topics discussed and any important details. ' +
        'Please make sure to use proper grammar and punctuation. ';
      const res = await this.model.generateContent(`${prompt} \n\n ${history}`);
      return res.response.text();
    } catch (error) {
      console.error('Error in generateEntry:', error.message);
    }
  }
}
