// utils/authUtils.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { logger } from './logger.utils.js';
import { UnauthorizedError } from './errors.js';

export const createToken = (data, type = 'access') => {
  const secret = config.jwt[type];
  const expiresIn = type === 'access' ? '2h' : '7d';
  return jwt.sign(data, secret, { expiresIn });
};

export const verifyToken = (token, type = 'access') => {
  const secret = type === 'access' ? config.jwt.secret : config.jwt.access;
  return jwt.verify(token, secret);
};

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const comparePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  if (!result) throw new UnauthorizedError('Invalid credentials.');
  return result;
};
