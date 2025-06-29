import db from '../db/dbConfig.js';
import { v4 as uuidv4 } from 'uuid';
import { generateCode } from '../utils/auth.utils.js';

export class UserModel {
  static async getByEmail({ email }) {
    try {
      const data = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [
        email,
      ]);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async get({ id }) {
    try {
      const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [
        id,
      ]);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getRefreshToken(id) {
    try {
      const token = await db.oneOrNone(
        'SELECT * FROM refresh_tokens WHERE user_id = $1',
        [id]
      );
      return token;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAllUsers() {
    try {
      await db.none('DELETE FROM users');
    } catch (error) {
      throw error;
    }
  }
  static async create({ email, password, first_name, middle_name, last_name }) {
    try {
      const id = uuidv4();

      const user = await db.one(
        'INSERT INTO users (id, email, password, first_name, middle_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id, email, password, first_name, middle_name, last_name]
      );
      console.log(user);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async verifyEmail(email) {
    try {
      await db.none('UPDATE users SET is_verified = true WHERE email = $1', [
        email,
      ]);
    } catch (error) {
      throw error;
    }
  }

  static async createCode(email) {
    try {
      const code = generateCode();
      const rateLimitMax = 15 * 60 * 1000;
      const expiresAt = new Date(Date.now() + rateLimitMax);
      await db.one(
        'INSERT INTO mfa_codes (email, code, expires_at) VALUES ($1, $2, $3) RETURNING *',
        [email, code, expiresAt]
      );
      return code;
    } catch (error) {
      throw error;
    }
  }

  static async verifyCode(email, code) {
    try {
      const record = await db.oneOrNone(
        'SELECT * FROM mfa_codes WHERE email = $1 AND code = $2',
        [email, code]
      );
      if (!record || new Date(record.expires_at) < new Date()) {
        throw new Error('Invalid or expired verification code.');
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAllCodes(email) {
    try {
      await db.none('DELETE FROM mfa_codes WHERE email = $1', [email]);
    } catch (error) {
      throw error;
    }
  }

  static async update({ id, user }) {
    const { email, password, first_name, middle_name, last_name } = user;
    try {
      const data = await db.one(
        'UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password), first_name = COALESCE($3, first_name), middle_name = COALESCE($4, middle_name), last_name = COALESCE($5, last_name) WHERE id = $6 RETURNING *',
        [email, password, first_name, middle_name, last_name, id]
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async delete({ id }) {
    try {
      await db.one('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    } catch (error) {
      throw error;
    }
  }
}

export const userModel = UserModel;
