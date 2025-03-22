
const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const { auth, admin } = require('../middleware/auth');

// Public routes
router.get('/', clubController.getAllClubs);
router.get('/:id', clubController.getClub);

// Admin routes
router.post('/', auth, admin, clubController.createClub);
router.put('/:id', auth, admin, clubController.updateClub);
router.delete('/:id', auth, admin, clubController.deleteClub);

// Member management routes
router.post('/:id/members', auth, admin, clubController.addMember);
router.delete('/:id/members', auth, admin, clubController.removeMember);

module.exports = router;
