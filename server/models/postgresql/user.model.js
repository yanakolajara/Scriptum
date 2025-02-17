import db from './db/dbConfig.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export class UserModel {
  static async register(userData) {
    try {
      const existingUser = await db.oneOrNone(
        'SELECT * FROM users WHERE email = $1',
        [userData.email]
      );
      if (existingUser) {
        throw new Error('Email already exists.');
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const id = uuidv4();
      const user = await db.one(
        'INSERT INTO users (email, password, first_name, middle_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
          // id,
          userData.email,
          hashedPassword,
          userData.first_name,
          userData.middle_name,
          userData.last_name,
        ]
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async generateMfaCode(email) {
    try {
      const code = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      await db.one(
        'INSERT INTO mfa_codes (email, code, expires_at) VALUES ($1, $2, $3) RETURNING *',
        [email, code, expiresAt]
      );
      console.log(code);
      return code;
    } catch (error) {
      throw error;
    }
  }

  static async verifyCode({ email, code }) {
    try {
      const record = await db.oneOrNone(
        'SELECT * FROM mfa_codes WHERE email = $1 AND code = $2',
        [email, code]
      );
      if (!record) return false;
      if (new Date(record.expires_at) < new Date()) return false;
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async markUserAsVerified(email) {
    try {
      const user = await db.one(
        'UPDATE users SET is_verified = true WHERE email = $1 RETURNING *',
        [email]
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getByEmail(email) {
    try {
      const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [
        email,
      ]);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async update({ id, ...userData }) {
    try {
      const user = await db.one(
        'UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password), first_name = COALESCE($3, first_name), middle_name = COALESCE($4, middle_name), last_name = COALESCE($5, last_name) WHERE id = $6 RETURNING *',
        [
          userData.email,
          userData.password,
          userData.first_name,
          userData.middle_name,
          userData.last_name,
          id,
        ]
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const user = await db.one('DELETE FROM users WHERE id = $1 RETURNING *', [
        id,
      ]);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export const userModel = UserModel;
