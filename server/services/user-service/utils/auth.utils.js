import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createToken = (data, type = 'access') => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = type === 'access' ? '2h' : '7d';
  return jwt.sign(data, secret, { expiresIn });
};

export const verifyToken = (token, type = 'access') => {
  const secret =
    type === 'access' ? process.env.JWT_SECRET : process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const comparePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  if (!result) throw new Error('Invalid password');
  return result;
};
