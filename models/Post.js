const mongoose = require('mongoose');

const comment = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [comment], // tableau de sous-documents
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', postSchema);
