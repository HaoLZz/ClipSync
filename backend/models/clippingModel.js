import mongoose from 'mongoose';
import clippings from '../data/clippings.js';
import {
  msgSchema,
  textMsgSchema,
  linkMsgSchema,
  imageMsgSchema,
  fileMsgSchema,
} from './messageModel.js';

export const clippingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'user id is missing'],
      ref: 'User',
    },
    messages: [msgSchema],
  },
  { timestamps: true },
);

const msgArray = clippingSchema.path('messages');

const TextMsg = msgArray.discriminator('Text', textMsgSchema);
const LinkMsg = msgArray.discriminator('Link', linkMsgSchema);
const FileMsg = msgArray.discriminator('File', fileMsgSchema);
const ImageMsg = msgArray.discriminator('Image', imageMsgSchema);

const Clipping = mongoose.model('Clipping', clippingSchema);

export default Clipping;
