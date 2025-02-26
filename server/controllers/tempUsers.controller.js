// import jwt from 'jsonwebtoken';
import { sendCodeToEmail } from '../services/email.service.js';
import { comparePassword, createToken } from '../utils/auth.utils.js';
import { DuplicateError, UnauthorizedError } from '../utils/errors.js';
import { logger } from '../utils/logger.utils.js';

export class TempUserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  register = async (req, res, next) => {
    try {
      const data = req.body;
      const userExists = await this.userModel.getByEmail(data.email);
      console.log(
        '🚀 ~ TempUserController ~ register= ~ userExists:',
        userExists
      );
      if (userExists) throw new DuplicateError('Email already exists.');
      const newUser = await this.userModel.register(data);
      res.status(201).json({
        message: 'User registered successfully.',
        id: newUser.id,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const data = req.body;
      const dbData = await this.userModel.getByEmail(email);
      await comparePassword(data.password, dbData.password);
      res.status(200).json({
        message: 'User logged in successfully.',
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
