import db from '../../db/dbConfig.js';
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';

export class UserModel {
  static async getAll() {
    const users = await db.any('SELECT * FROM users');
    return users;
  }
  static async getById({ id }) {
    try {
      const user = await db.one('SELECT * FROM users WHERE id = $1', [id]);
      return user;
    } catch (error) {
      console.error(error);
    }
  }
  static async create({ email, password, first_name, middle_name, last_name }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuid();
    try {
      const user = await db.one(
        'INSERT INTO users (id, email, password, first_name, middle_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [userId, email, hashedPassword, first_name, middle_name, last_name]
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  // static async get() {
  //   try {
  //   } catch (error) {}
  // }
  static async update() {
    try {
    } catch (error) {}
  }
  static async delete() {
    try {
    } catch (error) {}
  }
}
