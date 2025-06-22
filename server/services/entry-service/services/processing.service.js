// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { SummaryPrompt, ContextUpdatePrompt } from '../prompts.js';
// import userContextClient from '../api/userContext.client.js';

// class ProcessingService {
//   constructor() {
//     this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     this.model = this.genAI.getGenerativeModel({
//       model: process.env.GEMINI_API_MODEL,
//     });
//   }

//   /**
//    * Generates a summary in first person of the conversation based on the user's day
//    * @param {string} transcript - Full chat transcript
//    * @returns {Promise<string>} Summary content
//    */
//   async generateSummary(transcript) {
//     const prompt = SummaryPrompt(transcript);
//     const result = await this.model.generateContent(prompt);
//     return result.response.text();
//   }

//   /**
//    * Updates user's context in background
//    * Fire-and-forget
//    * @param {string} userId
//    * @param {string} transcript
//    */
//   async updateContextInBackground(userId, transcript) {
//     try {
//       const currentContextResponse = await userContextClient.get(
//         `/user-context/${userId}`
//       );
//       const existingContextJson = JSON.stringify(
//         currentContextResponse.data.context || {}
//       );

//       const updatePrompt = ContextUpdatePrompt(transcript, existingContextJson);
//       const result = await this.model.generateContent(updatePrompt);
//       const newContextJson = result.response.text();

//       const updatedContext = JSON.parse(newContextJson);
//       await userContextClient.put(`/user-context/${userId}`, {
//         context: updatedContext,
//       });

//       console.log(`User context successfully updated for user ${userId}`);
//     } catch (error) {
//       console.error(
//         `User context update failed for user ${userId}:`,
//         error.message
//       );
//     }
//   }
// }

// export const processingService = new ProcessingService();
