
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true
  }
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Workshop', 'Meeting', 'Seminar', 'Other']
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  attendees: {
    type: Number,
    default: 0
  },
  maxAttendees: {
    type: Number
  },
  imageUrl: {
    type: String
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  tickets: [ticketSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);
