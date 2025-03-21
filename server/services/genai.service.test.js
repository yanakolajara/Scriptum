// import { request } from 'supertest';
// import {
//   createGenerativeModel,
//   createCacheManager,
//   startGenaiChat,
//   createModel,
//   getGenaiResponse,
//   updateChatCache,
// } from './genai.service';
// import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
// import { GoogleAICacheManager } from '@google/generative-ai/server';
// import { systemInstructions } from './data/systemInstructions';

// let userContext = { name: 'John Doe' };

// describe('Instance creation', () => {
//   it('should create a model instance', () => {
//     const model = createModel();
//     expect(model).toBeInstanceOf(GoogleGenerativeAI);
//   });

//   it('should create a cache manager instance', () => {
//     const cacheManagerInstance = createCacheManager();
//     expect(cacheManagerInstance).toBeInstanceOf(GoogleAICacheManager);
//   });
// });

// let genAI;
// let model;
// let chat;
// let cacheManager;
// let cache;

// beforeEach(() => {
//   try {
//     genAI = createModel();
//     cacheManager = createCacheManager();
//     model = genAI.getGenerativeModel({
//       model: 'gemini-1.5-flash-002',
//       systemInstruction: systemInstructions(userContext),
//     });
//     chat = model.star2tChat();
//     cache = cacheManager.create({
//       model: 'gemini-1.5-flash-002',
//     });
//   } catch (error) {
//     console.error('Error in beforeEach:', error.message);
//   }
// });

// describe('getGenaiResponse', () => {
//   it('should get a response from the model', async () => {
//     const response = await getGenaiResponse(chat, 'Hello');
//     expect(response).toBeDefined();
//   });
//   it('should return a stream', async () => {
//     const response = await getGenaiResponse(chat, 'Hello');
//     expect(response).toHaveProperty('stream');
//   });
//   it('should return a response', async () => {
//     const response = await getGenaiResponse(chat, 'Hello');
//     expect(response).toHaveProperty('response');
//   });
// });

// describe('updateChatCache', () => {
//   it('should return the contents of the cache', async () => {
//     await updateChatCache(chat, userContext, cache);
//     const cacheContents = await cache.getContents();
//     expect(cacheContents).toBeDefined();
//   });
//   it('should update the chat cache', async () => {
//     const response = await getGenaiResponse(chat, 'Hello');
//     expect(response).toHaveProperty('response');
//   });
// });
