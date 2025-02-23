import db from './db/dbConfig.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { generateCode } from '../../utils/auth.utils.js';
import { config } from '../../config/config.js';
import { logger } from '../../utils/logger.utils.js';
import { DatabaseError, UnauthorizedError } from '../../utils/errors.js';

export class UserModel {
  static async getByEmail(email) {
    console.log('🚀 ~ UserModel ~ getByEmail ~ email:', email);
    try {
      const user = await db.one('SELECT * FROM users WHERE email = $1', [
        email,
      ]);
      console.log('🚀 ~ UserModel ~ getByEmail ~ user:', user);

      return user;
    } catch (error) {
      console.log('🚀 ~ UserModel ~ getByEmail ~ error:', error.stack);
      throw error;
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
  static async register({
    email,
    password,
    first_name,
    middle_name,
    last_name,
  }) {
    try {
      const id = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.one(
        'INSERT INTO users (id, email, password, first_name, middle_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id, email, hashedPassword, first_name, middle_name, last_name]
      );
      return user;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  static async createCode(email) {
    try {
      const code = generateCode();
      const expiresAt = new Date(
        Date.now() + config.security.rateLimitWindowMs
      );
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
        throw new UnauthorizedError('Invalid or expired verification code.');
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

  static async update(id, userData) {
    const {
      email = null,
      password = null,
      first_name = null,
      middle_name = null,
      last_name = null,
    } = userData;
    try {
      await db.one(
        'UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password), first_name = COALESCE($3, first_name), middle_name = COALESCE($4, middle_name), last_name = COALESCE($5, last_name) WHERE id = $6 RETURNING *',
        [email, password, first_name, middle_name, last_name, id]
      );
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await db.one('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    } catch (error) {
      throw error;
    }
  }
}

export const userModel = UserModel;
