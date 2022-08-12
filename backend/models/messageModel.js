import mongoose from 'mongoose';

const msgSchema = mongoose.Schema(
  {
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
  { discriminatorKey: 'type', timestamps: true },
);

const textMsgSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'content of text is missing'],
  },
});

const linkMsgSchema = mongoose.Schema({
  url: {
    type: String,
    required: [true, 'url of link is missing'],
  },
  thumbnail: {
    type: String,
    required: false,
  },
});

const fileMsgSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'file is missing'],
  },
  format: {
    type: String,
    enum: ['pdf', 'txt', 'docx', 'doc', '{format} is not supported'],
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const imageMsgSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'image is missing'],
  },
  format: {
    type: String,
    enum: ['png', 'jpg', 'jpeg', 'bmp', 'image {format} is not supported'],
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  resolution: {
    type: String,
    required: false,
  },
});

// const textMessage = new TextMsg({
//   origin: 'desktop',
//   content:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit',
//   isPinned: true,
//   ohter: 'link',
// });

// const fileMessage = new FileMsg({
//   origin: 'desktop',
//   msgType: 'file',
//   content: 'file content',
//   format: 'pdf',
//   size: '1500kb',
//   isPinned: false,
// });
export {
  msgSchema,
  textMsgSchema,
  linkMsgSchema,
  imageMsgSchema,
  fileMsgSchema,
};
