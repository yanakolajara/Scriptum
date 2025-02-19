import jwt from 'jsonwebtoken';
import { sendCodeToEmail } from '../services/email.service.js';
import { comparePassword, createToken } from '../utils/auth.utils.js';
import { DuplicateError, UnauthorizedError } from '../utils/errors.js';
import { logger } from '../utils/logger.utils.js';

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  register = async (req, res, next) => {
    try {
      const data = req.body;
      const userExists = await this.userModel.getByEmail(data.email);
      if (userExists) throw new DuplicateError('Email already exists.');
      await this.userModel.register(data);
      const code = await this.userModel.createCode(data.email);
      await sendCodeToEmail(code, data.email);
      res.status(201).json({
        message:
          'User registered successfully. Please check your email for the verification code.',
      });
    } catch (error) {
      next(error);
    }
  };

  verify = async (req, res, next) => {
    try {
      const { email, code } = req.body;
      await this.userModel.verifyCode(email, code);
      await this.userModel.deleteAllCodes(email);
      const user = await this.userModel.getByEmail(email);
      const accessToken = createToken({ id: user.id }, 'access');
      const refreshToken = createToken({ id: user.id }, 'refresh');
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', //! Delete if causes issues
        sameSite: 'Strict', //! Delete if causes issues
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', //! Delete if causes issues
        sameSite: 'Strict', //! Delete if causes issues
      });
      res.status(200).json({
        message: 'Verification successful.',
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const data = req.body;
      const dbData = await this.userModel.getByEmail(data.email);
      if (!dbData)
        throw new UnauthorizedError('Email not connected to an account.');
      await comparePassword(data.password, dbData.password);
      await this.userModel.deleteAllCodes(data.email);
      const code = await this.userModel.createCode(data.email);
      await sendCodeToEmail(code, data.email);
      res.status(200).json({
        message: 'Please check your email for the verification code.',
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const { token } = req.body;
      if (!token)
        return res.status(401).json({ message: 'Refresh token is required.' });
      jwt.verify(token, process.env.REFRESH_SECRET, async (err, userData) => {
        if (err)
          return res.status(403).json({ message: 'Invalid refresh token.' });
        const storedToken = await this.userModel.getRefreshToken({
          id: userData.id,
        });
        if (!storedToken || storedToken !== token) {
          return res
            .status(403)
            .json({ message: 'Refresh token has been revoked.' });
        }
        const newAccessToken = createToken({ type: 'access', id: user.id });
        res.status(200).json({ accessToken: newAccessToken });
      });
    } catch (error) {
      next(error);
    }
  };

  edit = async (req, res, next) => {
    const { id } = req.user.id;
    try {
      await this.userModel.update({
        id,
        ...req.body,
      });
      res.status(200).json({
        message: 'User updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    const { id } = req.user.id;
    try {
      await this.userModel.delete({ id });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
