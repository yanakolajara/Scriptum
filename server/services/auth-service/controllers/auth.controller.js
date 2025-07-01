import { getUserByEmail } from '../services/userLookup.service.js';
import { comparePasswords } from '../utils/hash.utils.js';
import { generateToken } from '../services/jwt.service.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Email not verified' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

export const logout = async (req, res) => {
  // In a stateless JWT system, logout happens on the client (just delete the token).
  res
    .clearCookie('access_token', {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      // path: '/',
    })
    .status(200)
    .json({ message: 'Logged out' });
};

export const verifyEmail = async (req, res, next) => {
  const { token } = req.params;
  try {
    // Decode verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify if verification token is valid and not expirted
    //todo[code 498 for expired token]

    // Update user verification status to true
    //todo

    // await this.userModel.verifyEmail(user.email);
    // res.status(200).json({
    //   message: 'User verified successfully.',
    // });
  } catch (error) {
    next(error);
  }
};
