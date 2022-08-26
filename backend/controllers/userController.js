import { copyFile, readFile } from 'fs/promises';
import asyncHandler from 'express-async-handler';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/userModel.js';
import Clipping from '../models/clippingModel.js';
import generateToken from '../utils/generateToken.js';
import sampleClippings from '../data/sampleClippings.js';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// @desc  Auth user and obtain token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { isMobile, isTablet, isDesktop, isChrome, platform, os, browser } =
    req.useragent;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const JWT_KEY = process.env.JWT_KEY_NAME || 'jwt';
    // cookie expires after 5 hours
    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 5);

    res.cookie(JWT_KEY, `Bearer ${token}`, {
      secure: true,
      httpOnly: true,
      expires: expDate,
      sameSite: 'none',
    });

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      grantPermissions: user.grantPermissions,
      token: token,
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

// @desc  User logout
// @route GET /api/users/logout
// @access Public

const logoutUser = asyncHandler(async (req, res) => {
  const JWT_KEY = process.env.JWT_KEY_NAME || 'jwt';
  res.clearCookie(JWT_KEY);
  res.send('Log out successful');
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
    const clippingsToCreate = sampleClippings.map((clipping) => {
      return { ...clipping, user: user._id };
    });

    const newUserClippings = await Clipping.insertMany(clippingsToCreate);

    if (!newUserClippings) {
      res.status(500);
      throw new Error('User sample clippings initialization failed');
    }

    const sampleImageClipping = await Clipping.create({
      origin: 'desktop',
      type: 'Image',
      isPinned: false,
      originalFilename: 'Sample_Image.jpg',
      format: 'jpg',
      size: '38.0 kB',
      user: user._id,
    });

    const filePath = path.join(__dirname, '../data/Sample_Image.jpg');
    const filenameToSave = `${sampleImageClipping._id.toString()}.${
      sampleImageClipping.format
    }`;

    console.log(filePath, '\n', filenameToSave);
    const fileDownloadPath = path.join(
      __dirname,
      `../tmp/download/${filenameToSave}`,
    );
    await copyFile(filePath, fileDownloadPath);

    const imageFile = await readFile(filePath);
    const metadata = await sharp(imageFile).metadata();
    const thumbnailFilePath = path.join(
      __dirname,
      `../tmp/thumbnail/thumbnail_${filenameToSave}`,
    );
    await sharp(imageFile).resize({ width: 200 }).toFile(thumbnailFilePath);

    sampleImageClipping.thumbnail = `thumbnail/thumbnail_${filenameToSave}`;
    sampleImageClipping.downloadLink = `download/${filenameToSave}`;
    sampleImageClipping.resolution = `${metadata.width} X ${metadata.height}`;

    await sampleImageClipping.save();

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

export {
  authUser,
  logoutUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
};
