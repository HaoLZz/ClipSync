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
    required: false,
  },
});

const fileSchema = mongoose.Schema({
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

const imageSchema = mongoose.Schema({
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

export { textSchema, linkSchema, imageSchema, fileSchema };
