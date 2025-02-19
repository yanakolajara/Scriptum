// server/middlewares/validate.middleware.js
import { z } from 'zod';
import { ValidationError } from '../utils/errors.js';
import { logger } from '../utils/logger.utils.js';

const userSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z
    .string({ message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(20, { message: 'Password must not exceed 20 characters' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((password) => /[0-9]/.test(password), {
      message: 'Password must contain at least one number',
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Password must contain at least one special character',
    }),
  first_name: z.string({ message: 'First name is required' }),
  middle_name: z.string().optional(),
  last_name: z.string({ message: 'Last name is required' }),
});

const loginSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string({ message: 'Password is required' }),
});

// Middleware for full user data validation (for registration)
export const validateUserData = (req, res, next) => {
  try {
    req.body = userSchema.parse(req.body);
    next();
  } catch (e) {
    next(
      new ValidationError(e.issues.map((issue) => issue.message).join(', '))
    );
  }
};

// Middleware for partial user data validation (for updates)
export const validatePartialUserData = (req, res, next) => {
  try {
    req.body = userSchema.partial().parse(req.body);
    next();
  } catch (e) {
    next(
      new ValidationError(e.issues.map((issue) => issue.message).join(', '))
    );
  }
};

// Middleware for login data validation (only email and password)
export const validateLoginData = (req, res, next) => {
  try {
    logger.info(req.body);
    req.body = loginSchema.parse(req.body);
    logger.info('data validated');
    // req.body = userSchema.pick({ email: true, password: true }).parse(req.body);
    next();
  } catch (e) {
    logger.error(e);
    next(
      new ValidationError(e.issues.map((issue) => issue.message).join(', '))
    );
  }
};
