import Clipping from '../models/clippingModel.js';
import User from '../models/userModel.js';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// @desc  Create a new clipping
// @event clipping:create
// @access Private

const createClipping = async function (clippingToCreate, callback) {
  const socket = this;
  const userId = socket.user._id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User does not exist');
    }

    const savedClipping = await Clipping.create({ ...clippingToCreate, user });

    if (savedClipping) {
      callback({ status: 'successful', data: savedClipping });
      socket.to(user._id.toString()).emit('clipping:created', savedClipping);
    } else {
      throw new Error('Saving clipping to database failed');
    }
  } catch (err) {
    callback({ status: 'clipping:create failed', data: err });
  }
};

// @desc  Create a new image clipping
// @event clipping:create_image
// @access Private

const createImageClipping = async function (
  clippingInfo,
  meta,
  file,
  callback,
) {
  const socket = this;
  const userId = socket.user._id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User does not exist');
    }

    if (!meta) {
      throw new Error('Metadata of image is missing');
    }

    const { originalFilename, format, size } = meta;

    const clippingToCreate = { ...meta, ...clippingInfo };
    const initialClipping = await Clipping.create({
      ...clippingToCreate,
      user,
    });

    // send initialClipping without thumbnail back
    socket.emit('clipping:created', initialClipping);
    socket.to(user._id.toString()).emit('clipping:created', initialClipping);

    const filenameToSave = `${initialClipping._id.toString()}.${
      initialClipping.format
    }`;

    const filePath = path.join(__dirname, `../tmp/download/${filenameToSave}`);
    await writeFile(filePath, file);

    const metadata = await sharp(file).metadata();
    const thumbnailFilePath = path.join(
      __dirname,
      `../tmp/thumbnail/thumbnail_${filenameToSave}`,
    );
    await sharp(file).resize({ width: 200 }).toFile(thumbnailFilePath);

    const clipping = await Clipping.findById(initialClipping._id);
    clipping.thumbnail = `thumbnail/thumbnail_${filenameToSave}`;
    clipping.downloadLink = `download/${filenameToSave}`;
    clipping.resolution = `${metadata.width} X ${metadata.height}`;

    const imageClipping = await clipping.save();

    // when thumbnail is ready, update clients with data
    callback({ status: 'successful', data: imageClipping });
    socket.to(userId.toString()).emit('clipping:updated', imageClipping);
  } catch (err) {
    callback({ status: 'clipping:create_image failed', data: err });
  }
};

// @desc  Create a new file clipping
// @event clipping:create_file
// @access Private

const createFileClipping = async function (clippingInfo, meta, file, callback) {
  const socket = this;
  const userId = socket.user._id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User does not exist');
    }

    if (!meta) {
      throw new Error('Metadata of file is missing');
    }

    const clippingToCreate = { ...meta, ...clippingInfo };
    const initialClipping = await Clipping.create({
      ...clippingToCreate,
      user,
    });

    // send initialClipping without downloadLink back
    socket.emit('clipping:created', initialClipping);
    socket.to(user._id.toString()).emit('clipping:created', initialClipping);

    const filenameToSave = `${initialClipping._id.toString()}.${
      initialClipping.format
    }`;

    const filePath = path.join(__dirname, `../tmp/download/${filenameToSave}`);
    await writeFile(filePath, file);

    const clipping = await Clipping.findById(initialClipping._id);
    clipping.downloadLink = `download/${filenameToSave}`;

    const fileClipping = await clipping.save();

    // when downloadLink is ready, update clients with data
    callback({ status: 'successful', data: fileClipping });
    socket.to(userId.toString()).emit('clipping:updated', fileClipping);
  } catch (err) {
    callback({ status: 'clipping:create_file failed', data: err });
  }
};

// @desc  Read a clipping
// @event clipping:read
// @access Private

const readClipping = async function (clippingId, callback) {
  try {
    const clipping = await Clipping.findById(clippingId);

    if (clipping) {
      callback({ status: 'successful', data: clipping });
    } else {
      throw new Error(`Clipping with id${clippingId} not found`);
    }
  } catch (err) {
    callback({ status: 'clipping:read failed', data: err });
  }
};

// @desc  Update a clipping
// @event clipping:update
// @access Private

const updateClipping = async function (clippingId, update, callback) {
  const socket = this;
  const userId = socket.user._id;
  try {
    const clipping = await Clipping.findById(clippingId);

    if (clipping) {
      clipping.isPinned = update.isPinned;
      const updatedClipping = await clipping.save();

      callback({ status: 'successful', data: updatedClipping });
      socket.to(userId.toString()).emit('clipping:updated', updatedClipping);
    } else {
      throw new Error(`Clipping with id${clippingId} not found`);
    }
  } catch (err) {
    callback({ status: 'clipping:update failed', data: err });
  }
};

// @desc  Delete a clipping
// @event clipping:delete
// @access Private

const deleteClipping = async function (clippingId, callback) {
  const socket = this;
  const userId = socket.user._id;
  try {
    const deletedClipping = await Clipping.findByIdAndDelete(clippingId);

    if (!deletedClipping) {
      throw new Error(`Clipping with id${clippingId} not found`);
    }

    if (deletedClipping.type === 'File') {
      const downloadFilePath = path.join(
        __dirname,
        `../tmp/${deletedClipping.downloadLink}`,
      );
      await unlink(downloadFilePath);
      console.log(`Deleted ${deletedClipping.downloadLink}`);
    }

    if (deletedClipping.type === 'Image') {
      const downloadFilePath = path.join(
        __dirname,
        `../tmp/${deletedClipping.downloadLink}`,
      );
      await unlink(downloadFilePath);
      console.log(`Deleted ${deletedClipping.downloadLink}`);

      const thumbnailFilePath = path.join(
        __dirname,
        `../tmp/${deletedClipping.thumbnail}`,
      );
      await unlink(thumbnailFilePath);
      console.log(`Deleted ${deletedClipping.thumbnail}`);
    }

    callback({ status: 'successful', data: deletedClipping._id });
    socket.to(userId.toString()).emit('clipping:deleted', deletedClipping._id);
  } catch (err) {
    console.error('clipping delete error:', err);
    callback({ status: 'clipping:delete failed', data: err });
  }
};

// @desc  List all clippings
// @event clipping:list
// @access Private

const listClipping = async function (userId, callback) {
  const socket = this;
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User does not exist');
    }
    const allClipping = await Clipping.find({ user });

    if (allClipping) {
      callback({ status: 'successful', data: allClipping });
    } else {
      throw new Error('Saving clipping to database failed');
    }
  } catch (err) {
    callback({ status: 'clipping:list failed', data: err });
  }
};

export {
  createClipping,
  createImageClipping,
  createFileClipping,
  readClipping,
  updateClipping,
  deleteClipping,
  listClipping,
};
