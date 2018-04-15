const mongoose = require('mongoose');
const UserSchema = require('../Schema/user');
const User = mongoose.model('User',UserSchema);

//model => 模型

module.exports = User;