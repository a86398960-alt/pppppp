import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Admin credentials (in production, store in environment variables)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password: "password"
const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// Hash a password (utility function for creating new admin passwords)
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Verify admin credentials
export async function verifyAdminCredentials(username, password) {
  if (username !== ADMIN_USERNAME) {
    return false;
  }
  
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

// Generate JWT token
export function generateToken(username) {
  return jwt.sign(
    { username, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Middleware to protect admin routes
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
  
  req.user = decoded;
  next();
}