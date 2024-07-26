// models/SecondAdmin.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecondAdminSchema = new Schema({
  
  username: {
    type: String,
    required: true,
    unique: true
  },
  organizername:{
    type: String
  },
  email:{
    type: String,
    require: true,
    unique: true
  },
  AdminCode: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''  // Default empty string
  },
  linkedIn: {
    type: String,
    default: ''  // Default empty string
  },
  website: {
    type: String,
    default: ''  // Default empty string
  },
  github: {
    type: String,
    default: ''  // Default empty string
  },
  instagram: {
    type: String,
    default: ''  // Default empty string
  }
});

const SecondAdmin = mongoose.model('SecondAdmin', SecondAdminSchema);

module.exports = SecondAdmin