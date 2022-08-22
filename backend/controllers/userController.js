import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc  Auth user and obtain token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { isMobile, isTablet, isDesktop, isChrome, platform, os, browser } =
    req.useragent;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      grantPermissions: user.grantPermissions,
      token: generateToken(user._id),
      useragent: {
        isMobile,
        isTablet,
        isDesktop,
        isChrome,
        platform,
        os,
        browser,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc  Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'Sign-up is successful',
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      grantPermissions: user.grantPermissions,
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

// @desc  Update user profile
// @route PATCH /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, password, grantPermissions } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.grantPermissions =
      grantPermissions === undefined ? user.grantPermissions : grantPermissions;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      grantPermissions: updatedUser.grantPermissions,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
