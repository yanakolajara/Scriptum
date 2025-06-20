import db from './db/dbConfig.js';
import { config } from '../config/config.js';
import {
  DatabaseError,
  InternalServerError,
  UnauthorizedError,
} from '../utils/errors.js';

export class EntryModel {
  static async getAllEntries(id) {
    try {
      const entries = await db.any('SELECT * FROM entries WHERE user_id = $1', [
        id,
      ]);
      return entries;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async getEntry(id) {
    try {
      const entry = await db.oneOrNone('SELECT * FROM entries WHERE id = $1', [
        id,
      ]);
      return entry;
    } catch (error) {
      throw new InternalServerError(error.message);
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
      throw new InternalServerError(error.message);
    }
  }

  static async updateEntry(id, data) {
    try {
      const updatedEntry = await db.one(
        'UPDATE entries SET content = $1, title = $2, starred = $3 WHERE id = $4 RETURNING *',
        [data.content, data.title, data.starred, id]
      );
      return updatedEntry;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async deleteEntry(id) {
    try {
      await db.one('DELETE FROM entries WHERE id = $1 RETURNING *', [id]);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}

export const entryModel = EntryModel;
