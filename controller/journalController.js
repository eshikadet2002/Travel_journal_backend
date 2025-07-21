const { journalModel } = require('../models/journalModel');

// Get all entries
exports.getEntries = async (req, res) => {
  try {
    const entries = await journalModel.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Delete an entry by ID
exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await journalModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json({ message: "Entry deleted", id });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Update an entry by ID
exports.updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEntry = await journalModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};