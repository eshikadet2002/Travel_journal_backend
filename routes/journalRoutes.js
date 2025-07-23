const express = require('express');
const router = express.Router();
const Journal = require('../models/journalModel');

// Middleware to authenticate (mock version, replace with real JWT logic)
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Mock: You can replace this with real JWT decoding logic
  req.user = { id: 'mock-user-id' }; // replace with decoded token value
  next();
};

// Get all journals
router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    res.json(journals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch journals' });
  }
});

// Add new journal
router.post('/', authenticate, async (req, res) => {
  try {
    const { photo, location, experience, status, userId } = req.body;

    if (!photo || !location || !experience || !userId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newJournal = new Journal({
      photo,
      location,
      experience,
      status,
      userId
    });

    const savedJournal = await newJournal.save();
    res.status(201).json(savedJournal);
  } catch (err) {
    console.error('Error saving journal:', err);
    res.status(500).json({ error: 'Failed to save journal' });
  }
});

// Update journal
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updated = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update journal' });
  }
});

// Delete journal
router.delete('/:id', async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete journal' });
  }
});

module.exports = router;
