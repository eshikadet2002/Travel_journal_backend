const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');

// Get user profile
router.get('/:userId', profileController.getProfile);

// Update user profile
router.put('/:userId', profileController.updateProfile);

module.exports = router;