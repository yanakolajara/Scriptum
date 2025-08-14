import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/config.js';

export function createAuthRouter(userModel) {
  const router = Router();

  router.get('/check', async (req, res, next) => {
    try {
      const token = req.cookies['access_token'];
      if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
      }
      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await userModel.getByEmail(decoded.email);
      if (!user) throw new Error();
      res
        .status(200)
        .json({ message: 'Authenticated', user: { email: user.email } });
    } catch (error) {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        path: '/',
      });
      res.status(401).json({ message: 'Invalid token. Cookie deleted.' });
      next();
    }
  });

  router.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.getByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      const accessToken = jwt.sign(
        { email: user.email, id: user.id },
        config.jwt.secret,
        { expiresIn: '7d' }
      );
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      });
      res.status(200).json({ message: 'Logged in successfully.' });
    } catch (error) {
      next();
    }
  });

  router.post('/logout', (req, res, next) => {
    try {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        path: '/',
      });
      res.status(200).json({ message: 'Logged out.' });
    } catch (error) {
      next();
    }
  });

  return router;
}
