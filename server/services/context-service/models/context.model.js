import db from '../db/dbConfig.js';

export class ContextModel {
  static async getContext({ userId }) {
    try {
      const data = await db.oneOrNone(
        'SELECT * FROM contexts WHERE user_id = $1',
        [userId]
      );
      return data;
    } catch (error) {
      throw new Error(`Error fetching context: ${error.message}`);
    }
  }

  static async createContext({ userId, context }) {
    try {
      const data = await db.one(
        'INSERT INTO contexts (user_id, context) VALUES ($1, $2) RETURNING *',
        [userId, context]
      );
      return data;
    } catch (error) {
      throw new Error(`Error creating context: ${error.message}`);
    }
  }

  static async updateContext({ userId, context }) {
    try {
      const data = await db.one(
        'UPDATE contexts SET context = $1 WHERE user_id = $2 RETURNING *',
        [context, userId]
      );
      return data;
    } catch (error) {
      throw new Error(`Error updating context: ${error.message}`);
    }
  }

  static async deleteContext({ userId }) {
    try {
      const data = await db.oneOrNone(
        'DELETE FROM contexts WHERE user_id = $1 RETURNING *',
        [userId]
      );
      return data;
    } catch (error) {
      throw new Error(`Error deleting context: ${error.message}`);
    }
  }
}
