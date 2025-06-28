import db from '../db/dbConfig.js';

export class ContextModel {
  static async getContextById({ id }) {
    try {
      const entry = await db.oneOrNone('SELECT * FROM contexts WHERE id = $1', [
        id,
      ]);
      return entry;
    } catch (error) {
      throw new Error(`Error fetching context: ${error.message}`);
    }
  }

  static async getContextByUserId({ userId }) {
    console.log('🚀 ~ ContextModel ~ getContextByUserId ~ userId:', userId);
    try {
      const entry = await db.oneOrNone(
        'SELECT * FROM contexts WHERE user_id = $1',
        [userId]
      );
      return entry;
    } catch (error) {
      throw new Error(`Error fetching context: ${error.message}`);
    }
  }

  static async createContext({ userId, context }) {
    try {
      const newEntry = await db.one(
        'INSERT INTO contexts (user_id, context) VALUES ($1, $2) RETURNING *',
        [userId, context]
      );
      return newEntry;
    } catch (error) {
      throw new Error(`Error creating context: ${error.message}`);
    }
  }

  static async updateContext({ userId, data }) {
    try {
      const updatedEntry = await db.one(
        'UPDATE contexts SET context = $1 WHERE user_id = $2 RETURNING *',
        [data, userId]
      );
      return updatedEntry;
    } catch (error) {
      throw new Error(`Error updating context: ${error.message}`);
    }
  }

  static async deleteContext(id) {
    try {
      await db.none('DELETE FROM contexts WHERE user_id = $1', [id]);
    } catch (error) {
      throw new Error(`Error deleting context: ${error.message}`);
    }
  }
}
