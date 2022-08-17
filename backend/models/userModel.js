import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name cannot be empty'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    grantPermissions: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password);
};

userSchema.pre('save', async function (next) {
  // Skip rehashing password if it is not modified
  if (!this.isModified('password')) {
    next();
  }
  if (!this.password) {
    throw new Error('Password is missing');
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
