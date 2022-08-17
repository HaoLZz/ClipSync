import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import clippings from './data/clippings.js';
import User from './models/userModel.js';
import Clipping from './models/clippingModel.js';
import connectDB from './config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await User.deleteMany();
    await Clipping.deleteMany();

    const createdUsers = await User.insertMany(users);
    const testUser = createdUsers[0]._id;
    // Link sampleClippings to a testUser
    const sampleClippings = clippings.map((clipping) => {
      return { ...clipping, user: testUser };
    });
    await Clipping.create(sampleClippings);

    console.log('Data Imported!'.green.inverse);
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Clipping.deleteMany();

    console.log('Data Erased!'.red.inverse);
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

connectDB().then(() => {
  if (process.argv[2] === '-d') {
    destroyData().then(() => {
      process.exit(1);
    });
  } else {
    importData().then(() => {
      process.exit(1);
    });
  }
});
