
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
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
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  profileImage: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
