const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mobile:{
    type: Number,
    require: true
  },
  image:{
    type: String,
  },
  // role: {
  //   type: String,
  //   enum: ['admin', 'student'],
  //   default: 'student'
  // },
  createdAt: {
    type: String,
    default: Date.now().toLocaleString(),
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User


