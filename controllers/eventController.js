
const Event = require('../models/Event');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('club', 'name');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get upcoming events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: { $gte: new Date() }
    }).populate('club', 'name').sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get past events
exports.getPastEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: { $lt: new Date() }
    }).populate('club', 'name').sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single event
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('club', 'name');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create event
exports.createEvent = async (req, res) => {
  const event = new Event({
    title: req.body.title,
    type: req.body.type,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    description: req.body.description,
    attendees: 0,
    maxAttendees: req.body.maxAttendees,
    imageUrl: req.body.imageUrl,
    club: req.body.club,
    tickets: req.body.tickets || []
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    Object.keys(req.body).forEach(key => {
      event[key] = req.body[key];
    });

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.remove();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register for event
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.attendees >= event.maxAttendees) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.attendees += 1;
    await event.save();
    
    res.json({ message: 'Registration successful', event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
