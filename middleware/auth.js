import jwt from 'jsonwebtoken';
const SECRET_KEY = 'arcane_secret_key';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token.' });
  }
}

export function authorizeAdminOrOwner(getOwnerId) {
  return async (req, res, next) => {
    if (req.user.role === 'admin') return next();
    const ownerId = await getOwnerId(req);
    if (String(req.user.id) === String(ownerId)) return next();
    return res.status(403).json({ message: 'Forbidden' });
  };
}
