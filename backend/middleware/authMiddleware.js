import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401);
    throw new Error('Invalid authorization: token not found');
  }

  if (token.startsWith('Bearer') && token) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      console.error('Error', err);
      res.status(401);
      throw new Error('Not authorized: token failed');
    }
  }
});

export { protect };
