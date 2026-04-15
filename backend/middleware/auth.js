const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_vitravel';
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
