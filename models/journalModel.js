const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  photo: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  status: {
    type: String,
    enum: ['public', 'private', 'draft'],
    default: 'public'
  },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Journal', journalSchema);
