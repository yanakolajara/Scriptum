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
}

export const entryModel = EntryModel;
