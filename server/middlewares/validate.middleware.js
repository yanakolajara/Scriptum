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

/**
 * Validates user data for registration.
 * @param {object} data - The user data to validate.
 * @throws {ValidationError} - If the data is invalid.
 * @returns {object} - The validated user data.
 */
export const registerDataValidation = (data) => {
  try {
    return userSchema.parse(data);
  } catch (e) {
    throw new ValidationError(
      e.issues.map((issue) => issue.message).join(', ')
    );
  }
};

/**
 * Validates user data for login.
 * @param {object} data - The user data to validate.
 * @throws {ValidationError} - If the data is invalid.
 * @returns {object} - The validated user data.
 */
export const loginDataValidation = (data) => {
  try {
    return loginSchema.parse(data);
  } catch (e) {
    throw new ValidationError(
      e.issues.map((issue) => issue.message).join(', ')
    );
  }
};

// Middleware for login data validation (only email and password)
