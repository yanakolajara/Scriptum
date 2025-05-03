import db from './db/dbConfig.js';
import { config } from '../config/config.js';
import {
  DatabaseError,
  InternalServerError,
  UnauthorizedError,
} from '../utils/errors.js';

export class UserContextModel {
  // static async getEntry(id) {
  //   try {
  //     const entry = await db.oneOrNone('SELECT * FROM entries WHERE id = $1', [
  //       id,
  //     ]);
  //     return entry;
  //   } catch (error) {
  //     throw new InternalServerError(error.message);
  //   }
  // }
}

export const userContextModel = UserContextModel;
