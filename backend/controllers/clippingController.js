import Clipping from '../models/clippingModel.js';
import User from '../models/userModel.js';

// @desc  Create new clipping
// @event clipping:create
// @access Private

const createClipping = async function (userId, clippingToCreate, callback) {
  const socket = this;
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User does not exist');
    }

    const savedClipping = await Clipping.create({ ...clippingToCreate, user });

    if (savedClipping) {
      callback({ status: 'successful', data: savedClipping });
      socket.broadcast.emit('clipping:created', savedClipping);
    } else {
      throw new Error('Saving clipping to database failed');
    }
  } catch (err) {
    callback({ status: 'clipping:create failed', data: err });
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
  try {
    const clipping = await Clipping.findById(clippingId);

    if (clipping) {
      clipping.isPinned = update.isPinned;
      const updatedClipping = await clipping.save();

      callback({ status: 'successful', data: updatedClipping });
      socket.broadcast.emit('clipping:updated', updatedClipping);
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
  try {
    const deletedClipping = await Clipping.findByIdAndDelete(clippingId).select(
      '_id',
    );

    if (deletedClipping) {
      callback({ status: 'successful', data: deletedClipping._id });
      socket.broadcast.emit('clipping:deleted', deletedClipping._id);
    } else {
      throw new Error(`Clipping with id${clippingId} not found`);
    }
  } catch (err) {
    callback({ status: 'clipping:delete failed', data: err });
  }
};

// @desc  List all clippings
// @event clipping:list
// @access Private

const listClipping = async function (userId, callback) {
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
  readClipping,
  updateClipping,
  deleteClipping,
  listClipping,
};
