import { GoogleGenerativeAI } from '@google/generative-ai';
import { chatPrompt } from './data/genaiPrompts.js';
import { userContetxt } from './data/genaiFakeContext.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const getGenaiResponse = async (chatTanscript) => {
  const newPrompt = chatPrompt(chatTanscript, JSON.stringify(userContetxt));
  const response = await model.generateContentStream(newPrompt);
  return response.stream;
};
