import {
  validateUserData,
  validatePartialUserData,
} from '../schemas/user.schema.js';
import { sendEmail } from '../services/nodemailer.js';
import jwt from 'jsonwebtoken';

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  register = async (req, res, next) => {
    try {
      const userData = validateUserData(req.body);
      const user = await this.userModel.register(userData);
      //TODO: Delete all codes before creating a new one
      const mfaCode = await this.userModel.generateMfaCode(user.email);
      const emailSent = await sendEmail({
        to: user.email,
        subject: 'Verify your account',
        html: `<p>Your verification code is: <strong>${mfaCode}</strong></p>`,
      });
      console.log('emailSent:', emailSent);
      res.status(201).json({
        message:
          'User registered successfully. Please check your email for the verification code.',
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  verify = async (req, res, next) => {
    try {
      const { email, code } = req.body;
      const verified = await this.userModel.verifyCode({ email, code });
      if (!verified) {
        return res
          .status(400)
          .json({ message: 'Invalid or expired verification code.' });
      }
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {});
      res.status(200).json({ token, message: 'Verification successful.' });
      //TODO: Delete all codes from email after verification
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userModel.getByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }
      const isMatch = await this.userModel.comparePassword(
        password,
        user.password
      );
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
      if (!user.is_verified) {
        return res
          .status(400)
          .json({ message: 'User not verified. Please check your email.' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  edit = async (req, res, next) => {
    try {
      const userData = validatePartialUserData(req.body);
      const updatedUser = await this.userModel.update({
        id: req.params.id,
        ...userData,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deletedUser = await this.userModel.delete(req.params.id);
      res.status(200).json(deletedUser);
    } catch (error) {
      next(error);
    }
  };
}
