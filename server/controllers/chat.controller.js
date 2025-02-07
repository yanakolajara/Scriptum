import db from '../db/dbConfig.js';

export const createConversation = async (userID) => {
  const title = 'New Chat';
  const values = [userID, title];
  const result = await db.one(
    `
    INSERT INTO conversations (user_id, title) 
    VALUES ($1, $2)
    RETURNING *;
`,
    values
  );
  console.log('chat.controller:', result);
  return result;
};

export const createMessage = async (chatID, userInput, role) => {
  const values = [chatID, role, userInput];
  console.log(`chat.controller -> createMessage -> values:`, values);
  const result = await db.one(
    `
    INSERT INTO messages (conversation_id, sender, content)
    VALUES ($1, $2, $3)
    RETURNING *;
`,
    values
  );
  return result;
};
