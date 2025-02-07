import { GoogleGenerativeAI } from '@google/generative-ai';
import { chatPrompt } from './genai-prompts.js';
import { userContetxt } from './temp.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const getGenaiResponse = async (chatTanscript) => {
  const newPrompt = chatPrompt(chatTanscript, JSON.stringify(userContetxt));
  const response = await model.generateContentStream(newPrompt);
  return response.stream;
};
