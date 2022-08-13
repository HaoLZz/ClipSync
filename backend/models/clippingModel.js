import mongoose from 'mongoose';
import {
  textSchema,
  linkSchema,
  imageSchema,
  fileSchema,
} from './typeSchema.js';

export const clippingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'user id is missing'],
      ref: 'User',
    },
    origin: {
      type: String,
      required: [true, 'origin is missing'],
    },
    isPinned: {
      type: Boolean,
      default: false,
      required: [true, 'isPinned is missing'],
    },
  },
  { timestamps: true, discriminatorKey: 'type' },
);

const Text = clippingSchema.discriminator('Text', textSchema);
const Link = clippingSchema.discriminator('Link', linkSchema);
const File = clippingSchema.discriminator('File', fileSchema);
const Image = clippingSchema.discriminator('Image', imageSchema);

const Clipping = mongoose.model('Clipping', clippingSchema);

export default Clipping;
