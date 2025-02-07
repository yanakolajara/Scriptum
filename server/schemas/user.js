import z from 'zod';

const userSchema = z.object({});

export const validateUser = (obj) => {
  return userSchema.safeParse(obj);
};

export const validatePartialUser = (obj) => {
  return userSchema.partial().safeParse(obj);
};
