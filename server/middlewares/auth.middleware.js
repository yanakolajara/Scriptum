import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = userData;
    next();
  });
};

// function authMiddleware(req, res, next) {
//   const token = req.cookies['auth_token'];
//   if (!token) return res.status(401).send('Not authenticated');

//   try {
//     const decoded = jwt.verify(token, 'SECRET_KEY');
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).send('Token invalid or expired');
//   }
// }
