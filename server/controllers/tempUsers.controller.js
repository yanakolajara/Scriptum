// import jwt from 'jsonwebtoken';
import e from 'express';
import { registerDataValidation } from '../middlewares/validate.middleware.js';
import { sendCodeToEmail } from '../services/email.service.js';
import { comparePassword, createToken } from '../utils/auth.utils.js';
import { DuplicateError, UnauthorizedError } from '../utils/errors.js';
import { logger } from '../utils/logger.utils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export class TempUserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  register = async (req, res, next) => {
    try {
      // Validate data
      const data = registerDataValidation(req.body);
      // Verify if user exists in database
      const userExists = await this.userModel.getByEmail(data.email);
      if (userExists) throw new DuplicateError('Email already exists.');
      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userModel.register({
        ...data,
        password: hashedPassword,
      });
      // Create email verification token
      const verificationToken = jwt.sign(
        { email: newUser.email },
        config.jwt.secret,
        { expiresIn: '1d' }
      );

      // Send email verification token
      await sendEmailVerification(newUser.email, verificationToken);

      res.status(201).json({
        message:
          'User registered successfully, verify email to activate account.',
      });
    } catch (error) {
      next(error);
    }
  };

  verifyEmail = async (req, res, next) => {
    // try {
    //   const { email, code } = req.body;
    //   await this.userModel.verifyCode(email);
    //   const user = await this.userModel.getByEmail(email);
    //   if (!user) throw new UnauthorizedError('User not found.');
    //   createToken(
    //     {
    //       id: user.id,
    //       email: user.email,
    //       first_name: user.first_name,
    //       middle_name: user.middle_name,
    //       last_name: user.last_name,
    //     },
    //     'access'
    //   );
    //   createToken({ id: user.id }, 'refresh');
    //   res.status(200).json({
    //     message: 'User verified successfully.',
    //   });
    // } catch (error) {
    //   next(error);
    // }
  };

  login = async (req, res, next) => {
    try {
      // Extract data from body
      const data = req.body;
      // Validate data
      //TODO: Validate data
      // Verify if user exists in database
      const dbData = await this.userModel.getByEmail(email);
      // Throw error if no user was found with the provided email or password
      if (!dbData) throw new UnauthorizedError('Invalid credentials.');
      const match = await comparePassword(data.password, dbData.password);
      if (match) {
        createToken(
          {
            id: dbData.id,
            email: dbData.email,
            first_name: dbData.first_name,
            middle_name: dbData.middle_name,
            last_name: dbData.last_name,
          },
          'access'
        );
        createToken({ id: dbData.id }, 'refresh');
        res.status(200).json({
          message: 'User logged in successfully.',
        });
      } else {
        throw new UnauthorizedError('Invalid credentials.');
      }
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      res.clearCookie('session_id');
      res.clearCookie('auth_token');
      res.send('Logged out');
      // res.status(200).json({ message: 'User logged out successfully.' });
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
