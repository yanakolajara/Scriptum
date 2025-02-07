import db from '../db/dbConfig.js';
import bcrypt from 'bcrypt';

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
    try {
      const user = await db.one(
        'INSERT INTO users (email, password, first_name, middle_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [email, hashedPassword, first_name, middle_name, last_name]
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  static async verify() {
    try {
    } catch (error) {}
  }
  static async login() {
    try {
    } catch (error) {}
  }
  static async update() {
    try {
    } catch (error) {}
  }
  static async delete() {
    try {
    } catch (error) {}
  }
}
