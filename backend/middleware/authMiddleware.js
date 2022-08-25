import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  const JWT_KEY = process.env.JWT_KEY_NAME || 'jwt';
  const token = req.headers.authorization || req.cookies[JWT_KEY];

  if (!token) {
    res.status(401);
    throw new Error('Invalid authorization: token not found');
  }

  if (token.startsWith('Bearer') && token) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (user) {
        req.user = user;
      }

      next();
    } catch (err) {
      console.error('Error', err);
      res.status(401);
      throw new Error('Not authorized: token failed');
    }
  }
});

const socketAuth = async (socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.token;
  if (!token) {
    return next(new Error('Invalid authorization: token not found'));
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (user) {
        socket.user = user;
      }

      next();
    } catch (err) {
      console.error('Error', err);
      return next(new Error('Not authorized: token failed'));
    }
  }
};

export { protect, socketAuth };
