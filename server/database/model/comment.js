const mongoose = require('mongoose');
const CommentSchema = require('../Schema/comment');
const Comment = mongoose.model('Comment',CommentSchema);

//model => 模型

module.exports = Comment;