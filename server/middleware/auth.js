import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Admin from '../models/Admin.js';

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No token provided. Please log in.'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = verifyToken(token);
    
    // Find user based on role
    let user;
    if (decoded.role === 'student') {
      user = await User.findById(decoded.userId);
    } else if (decoded.role === 'company') {
      user = await Company.findById(decoded.userId);
    } else if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.userId);
    }
    
    if (!user) {
      return res.status(401).json({
        error: 'User not found. Please log in again.'
      });
    }
    
    // Attach user and role to request
    req.user = user;
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token. Please log in again.'
    });
  }
};

/**
 * Authorization middleware - Check if user has required role
 * @param {Array} allowedRoles - Array of allowed roles
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({
        error: 'Not authenticated'
      });
    }
    
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        error: 'Access denied. Insufficient permissions.'
      });
    }
    
    next();
  };
};

/**
 * Check if company is approved
 */
export const checkCompanyApproval = (req, res, next) => {
  if (req.userRole === 'company' && req.user.status !== 'Approved') {
    return res.status(403).json({
      error: 'Your company account is pending approval. Please wait for admin approval.'
    });
  }
  
  next();
};

