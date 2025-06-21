import db from '../db/dbConfig.js';

export class EntryModel {
  static async getAllEntriesFromUser({ userId }) {
    try {
      const entries = await db.any('SELECT * FROM entries WHERE user_id = $1', [
        userId,
      ]);
      return entries;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getEntry({ userId }) {
    try {
      const entry = await db.oneOrNone('SELECT * FROM entries WHERE id = $1', [
        userId,
      ]);
      return entry;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async createEntry({ user_id, content, title, starred }) {
    try {
      const newEntry = await db.one(
        'INSERT INTO entries (user_id, content, title, starred) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, content, title || 'New Entry', starred || false]
      );
      return newEntry;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateEntry({ entryId, content, title, starred }) {
    try {
      const updatedEntry = await db.one(
        'UPDATE entries SET content = $1, title = $2, starred = $3 WHERE id = $4 RETURNING *',
        [content, title, starred, entryId]
      );
      return updatedEntry;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteEntry({ entryId }) {
    try {
      const entry = await db.one(
        'DELETE FROM entries WHERE id = $1 RETURNING *',
        [entryId]
      );
      return entry;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const entryModel = EntryModel;
