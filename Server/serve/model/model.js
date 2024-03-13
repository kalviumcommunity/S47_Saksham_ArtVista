const mongoose = require('mongoose');

const Tempdata = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imglink: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = Tempdata;