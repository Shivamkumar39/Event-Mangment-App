const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  img: { 
    type: String, 
    default:"" 
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  video:{
    type: String,
    require: false
  },
  createdAt: {
    type: Date,
    default: Date.now().toLocaleString(),
  }
});

module.exports = mongoose.model('Event', eventSchema);
