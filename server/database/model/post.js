const mongoose = require('mongoose');
const PostSchema = require('../Schema/post');
const Post = mongoose.model('Post',PostSchema);

//model => 模型

module.exports = Post;