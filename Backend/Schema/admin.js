// models/SecondAdmin.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecondAdminSchema = new Schema({
  
  username: {
    type: String,
    required: true,
    unique: true
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
  image:{
    type: String,
  }
});

const SecondAdmin = mongoose.model('SecondAdmin', SecondAdminSchema);

module.exports = SecondAdmin