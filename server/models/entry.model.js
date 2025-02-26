import db from './db/dbConfig.js';
import { config } from '../config/config.js';
import {
  DatabaseError,
  InternalServerError,
  UnauthorizedError,
} from '../utils/errors.js';

export class EntryModel {}

export const entryModel = EntryModel;
