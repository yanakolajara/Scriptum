import bcrypt from 'bcrypt';

export const hashPassword = (password) => bcrypt.hash(password, 10);
export const comparePasswords = (password, hashed) =>
  bcrypt.compare(password, hashed);
