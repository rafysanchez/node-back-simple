const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '24h' });
};

module.exports = { authMiddleware, generateToken, SECRET };
