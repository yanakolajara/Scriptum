import z from 'zod';
import { ValidationError } from '../utils/errors.js';

// const passwordSchema = z
//   .string()
//   .min(8)
//   .max(20)
//   .refine((password) => /[A-Z]/.test(password))
//   .refine((password) => /[a-z]/.test(password))
//   .refine((password) => /[0-9]/.test(password))
//   .refine((password) => /[!@#$%^&*]/.test(password));

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

export const validateUserData = (obj) => {
  try {
    return userSchema.parse(obj);
  } catch (e) {
    throw new ValidationError(e.issues.map((issue) => issue.message));
  }
};

export const validatePartialUserData = (obj) => {
  return userSchema.partial().safeParse(obj);
};
