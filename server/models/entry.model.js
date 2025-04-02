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
  static async createEntry(entry) {
    try {
      const { user_id, content, title, starred } = entry;
      const newEntry = await db.one(
        'INSERT INTO entries (user_id, content, title, starred) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, content, title, starred]
      );
      return newEntry;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}

export const entryModel = EntryModel;
