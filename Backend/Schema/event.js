const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  image: { 
    type: String, 
    default: "" 
  },
  eventname: {
    type: String,
    required: true,
    trim: true,
  },
  postDate: {
    type: String,
    required: true
  },
  lastDate: {
    type: String,
    required: true
  },
  Eventdate: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  organizername:{
    type: String
  },
  category: {
    type: String,
    required: true,
    //trim: true,
   // enum: ['college events', 'company events', 'government/city events'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: false,
    default: 0,
  },
  capacity: {
    type: Number,
    required: true,
    default: 0,
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming',
  },
  orgnizerId: {
    type: Schema.Types.ObjectId,
    ref:"SecondAdmin"
  }
});

module.exports = mongoose.model('Event', eventSchema);
