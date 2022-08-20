import mongoose from 'mongoose';

const textSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'content of text is missing'],
  },
});

const linkSchema = mongoose.Schema({
  url: {
    type: String,
    required: [true, 'url of link is missing'],
  },
  thumbnail: {
    type: String,
    required: [true, 'thumbnail link is missing'],
  },
});

const fileSchema = mongoose.Schema({
  originalFilename: {
    type: String,
    required: [true, 'original filename is missing'],
  },
  downloadLink: {
    type: String,
    default: '',
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
  thumbnail: {
    type: String,
    required: false,
    default: '',
  },
});

const imageSchema = mongoose.Schema({
  originalFilename: {
    type: String,
    required: [true, 'original filename is missing'],
  },
  downloadLink: {
    type: String,
    default: '',
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
    default: '',
  },
  resolution: {
    type: String,
    required: false,
    default: '',
  },
});

export { textSchema, linkSchema, imageSchema, fileSchema };
