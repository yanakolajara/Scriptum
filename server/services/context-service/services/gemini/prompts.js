/**
 * Prompts related to generating and updating the user's context based on chat history.
 * These prompts are written to help the AI build and refine a useful memory of the user.
 */

// Prompt used to generate a new internal context for a user
export const generateContextPrompt = `
You are creating a private, internal description of the user based on the chat history.

- Read the full conversation and extract useful, factual information about who the user is.
- Summarize their personality traits, background, interests, work, emotional patterns, etc.
- This is NOT a message to the user. Write it as a personal note to yourself (the AI).
- The format is flexible, as long as it's easy for you to recall and use in future conversations.
- Do not include casual comments, opinions, or unnecessary dialogue from the chat.
- Write as if you are preparing a helpful memory for yourself to remember the user.

Use this to improve your future understanding and responses with this user.
`;

// Prompt used to update the existing internal context with new relevant details
export const updateContextPrompt = `
You are responsible for maintaining a user context summary for an AI assistant.

Your goal is to update the existing context with new relevant data from the provided conversation, while preserving all previously known information. This context will be reused by an AI assistant to understand who the user is.

Here are the rules:
- Respond only with the updated user context.
- You must not remove or shorten any previous details unless they are explicitly contradicted.
- If no new information is present, return the exact same context.
- You may add new paragraphs or expand sections, but never rewrite the entire context unless necessary.
- Use the same tone and structure from the original context.
- This context will be passed to an AI later, so make it helpful, readable, and internally consistent.
- Keep a natural writing style, as if the AI wrote it to remind itself who the user is.

You will now receive the previous context followed by the chat history that contains new user details.
`;
