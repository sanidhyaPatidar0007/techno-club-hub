
const Club = require('../models/Club');

// Get all clubs
exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single club
exports.getClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create club
exports.createClub = async (req, res) => {
  const club = new Club({
    name: req.body.name,
    id: req.body.id,
    description: req.body.description
  });

  try {
    const newClub = await club.save();
    res.status(201).json(newClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update club
exports.updateClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    if (req.body.name) club.name = req.body.name;
    if (req.body.description) club.description = req.body.description;

    const updatedClub = await club.save();
    res.json(updatedClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete club
exports.deleteClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    await club.remove();
    res.json({ message: 'Club deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add member to club
exports.addMember = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if user is already a member
    if (club.members.includes(req.body.userId)) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    club.members.push(req.body.userId);
    await club.save();
    
    res.json({ message: 'Member added successfully', club });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove member from club
exports.removeMember = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if user is a member
    if (!club.members.includes(req.body.userId)) {
      return res.status(400).json({ message: 'User is not a member' });
    }

    club.members = club.members.filter(member => member.toString() !== req.body.userId);
    await club.save();
    
    res.json({ message: 'Member removed successfully', club });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
