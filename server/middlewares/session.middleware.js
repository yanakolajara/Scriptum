import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const sessionMiddleware = (req, res, next) => {
  const token =
    req.cookies.access_token ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    req.session = { user: null };
    return next();
  }

  try {
    const data = jwt.verify(token, config.jwt.secret);
    req.session = { user: data };
  } catch (error) {
    req.session = { user: null };
  }
  next();
};
