import {
  loginDataValidation,
  registerDataValidation,
} from '../middlewares/validate.middleware.js';
import {
  sendCodeToEmail,
  sendEmailVerification,
} from '../email-service/email.service.js';
import { comparePassword, createToken } from '../utils/auth.utils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersController {
  constructor({ UserModel }) {
    this.userModel = UserModel;
  }

  getByEmail = async (req, res, next) => {
    const email = req.params.email;
    try {
      const user = await this.userModel.getByEmail({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  get = async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await this.userModel.get({ id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    const body = req.body;
    try {
      // Verify if user exists in database
      const userExists = await this.userModel.getByEmail({
        email: body.email,
      });
      if (userExists) {
        res.status(409).json({
          message: 'User already exists with this email.',
        });
        return;
      }
      //Hash password
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const data = await this.userModel.create({
        ...body,
        password: hashedPassword,
      });

      // Create email verification token
      const verificationToken = jwt.sign(
        { email: data.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Send email verification token
      await sendEmailVerification(data.email, verificationToken);

      res.status(201).json({
        message:
          'User registered successfully, verify email to activate account.',
        user: {
          ...data,
          password: undefined,
          is_verified: undefined,
          mfa: undefined,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      res
        .clearCookie('access_token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
          path: '/',
        })
        .status(200)
        .json({ message: 'Logged out' });
      // res.status(200).json({ message: 'User logged out successfully.' });
    } catch (error) {
      next(error);
    }
  };

  edit = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
      const user = await this.userModel.get({ id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const data = await this.userModel.update({
        id,
        user: {
          email: body.email || user.email,
          password: body.password || user.password,
          first_name: body.first_name || user.first_name,
          middle_name: body.middle_name || user.middle_name,
          last_name: body.last_name || user.last_name,
        },
      });
      res.status(200).json({
        message: 'User updated successfully',
        user: {
          ...data,
          password: undefined,
          is_verified: undefined,
          mfa: undefined,
          id: undefined,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await this.userModel.get({ id });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      await this.userModel.delete({ id });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  // checkAuth = async (req, res, next) => {
  //   try {
  //     const token = req.cookies.access_token;
  //     if (!token) throw new Error('No token provided.');
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     const user = await this.userModel.getByEmail(decoded.email);
  //     if (!user) throw new Error('User not found.');
  //     res.status(200).json({
  //       message: 'User authenticated successfully.',
  //       user: {
  //         ...user,
  //         id: undefined,
  //         password: undefined,
  //         is_verified: undefined,
  //         mfa: undefined,
  //       },
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
