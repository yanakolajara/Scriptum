import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config.js';
import { modelSettings } from './data/modelSettings.js';
import { formatChat } from '../utils/adapters.utils.js';

export const genaiRequest = async (prompt, userContext = {}) => {
  const genai = new GoogleGenerativeAI(config.externalServices.genaiApiKey);
  const model = genai.getGenerativeModel(modelSettings(userContext));
  const res = await model.generateContent(prompt);
  return res;
};

// todo: Modify tone of response (be less structured and more natural)
// todo: Add user context to prompt
// todo: Add function that finalizes the conversation and creates an entry once user confirms
// todo: Respond as json to fulfill specific areas of focus of the conversation
export class GenaiChat {
  constructor(userContext = {}) {
    this.userContext = userContext || {};
    this.genAI = new GoogleGenerativeAI(config.externalServices.genaiApiKey);
    this.model = this.genAI.getGenerativeModel(
      modelSettings(userContext || {})
    );
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
      const summaryPrompt = `
Based on our conversation so far, generate a coherent and well-written summary in a single paragraph.
Write it in the first person, as if I were writing it myself for my diary.
This summary should capture the key events and feelings I have shared.
Start the summary with a phrase like 'Today was a day when...' or similar.
Do not include any introduction or comments of your own, only the text of the summary.
            `;
      const prompt = `${summaryPrompt} \n\n ${history}`;
      const res = await this.model.generateContent(prompt);
      return res.response.text();
    } catch (error) {
      console.error('Error in generateEntry:', error.message);
    }
  }
}
