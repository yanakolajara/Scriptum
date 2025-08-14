import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies['access_token'];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.session = { user: userData };
    next();
  } catch (err) {
    res.clearCookie('jwt');

    return res.status(401).json({
      error:
        err.name === 'TokenExpiredError'
          ? 'Session expired'
          : 'Invalid authentication',
    });
  }
};
