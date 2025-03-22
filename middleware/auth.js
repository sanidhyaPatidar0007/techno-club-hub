
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
exports.auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Find user by id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // Add user to request
    req.user = { id: user._id, isAdmin: user.isAdmin };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin middleware
exports.admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied, admin privileges required' });
  }
  next();
};
