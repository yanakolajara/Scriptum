import db from '../db/dbConfig.js';

export const createConversation = async (
  userId,
  title = 'New Conversation'
) => {
  try {
    const query = `
        INSERT INTO conversations (user_id, title) 
        VALUES ($1, $2)
        RETURNING *;
      `;
    const values = [userId, title];

    const result = await db.query(query, values);
    return result.rows[0]; // Devuelve la conversación creada
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

export const createMessage = async (conversationId, message, role) => {
  try {
    const query = `
          INSERT INTO messages (conversation_id, sender, content)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
    const values = [conversationId, role, message];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};
