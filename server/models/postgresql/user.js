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
    const userId = 'DFdsag453grEWDSFGVCc3@!5tRFEd';
    try {
      //TODO: Add uuid to users table
      const user = await db.one(
        'INSERT INTO users (email, password, first_name, middle_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
          // userId,
          email,
          hashedPassword,
          first_name,
          middle_name,
          last_name,
        ]
      );
      console.log('user created:', user);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  // static async get() {
  //   try {
  //   } catch (error) {}
  // }
  static async update({
    id,
    email,
    password,
    first_name,
    middle_name,
    last_name,
  }) {
    try {
      const user = await db.one(
        'UPDATE users SET email = $1, password = $2, first_name = $3, middle_name = $4, last_name = $5 WHERE id = $6 RETURNING *',
        [email, password, first_name, middle_name, last_name, id]
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  }
  static async delete({ id }) {
    try {
      const user = await db.one('DELETE FROM users WHERE id = $1 RETURNING *', [
        id,
      ]);
      return user;
    } catch (error) {}
  }
}
