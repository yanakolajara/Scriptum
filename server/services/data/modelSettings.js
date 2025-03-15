import { systemInstructions } from './systemInstructions.js';

export const modelSettings = (userContext) => {
  return {
    model: 'gemini-1.5-flash-002',
    systemInstruction: systemInstructions(userContext),
    // generationConfig: {
    //   // candidateCount,
    //   // stopSequences,
    //   // maxOutputTokens,
    //   // temperature,
    //   // topP,
    //   // topK,
    // },
  };
};
