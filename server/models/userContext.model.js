import db from './db/dbConfig.js';
import { config } from '../config/config.js';
import {
  DatabaseError,
  InternalServerError,
  UnauthorizedError,
} from '../utils/errors.js';

export class UserContextModel {
  static async getUserContext(id) {
    try {
      const entry = await db.oneOrNone(
        'SELECT * FROM user_contexts WHERE user_id = $1',
        [id]
      );
      return entry;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async updateUserContext(id, data) {
    try {
      const updatedEntry = await db.one(
        'UPDATE user_contexts SET context = $1 WHERE user_id = $2 RETURNING *',
        [data, id]
      );
      return updatedEntry;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}

export const userContextModel = UserContextModel;
