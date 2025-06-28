export const generateContextPrompt = `
  - Generate an entry in first person based on the chat history. 
  - The entry should be a summary of the conversation, including the main topics discussed and any important details. 
  - Please make sure to use proper grammar and punctuation.
`;

export const updateContextPrompt = `
  - Update the user context based on the provided data.
  - Respond only with the updated context as a JSON object, without any additional text.
  - Use the user context structure as a template.
  - Do not delete any past context unless explicitly changed by the user.
  - Do not add, remove, or rename keys.
  - Modify values within the given structure.
  - If no new details exist, return the JSON unchanged.
  - Now, I will first provide you with the user context and then the data that I want to update the context with.
  - Please respond only with the updated context as a JSON object.
  `;
