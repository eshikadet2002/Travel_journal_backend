const { journalModel } = require('../models/journalModel');
const validate = require('../utils/validate'); 
const asyncWrapper = require('../utils/asyncWrapper');

const createJournal = asyncWrapper(async (req, res) => {
  validate (req);
  const { userId, photo, location, experience, status } = req.body;
if (!userId || !photo || !location || !experience) {
    return res.status(400).json({ message: 'All fields are required' });
  }

const newJournal = new journalModel({
  userId:req.user._id,
  photo,
  location,
  experience,
  status
});
await newJournal.save();
  return res.status(201).json({
    status: true,
    message: 'Journal created successfully',
    journal: newJournal
  });
});
  const getJournalsbyUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const journals = await journalModel.find({ userId });
    return res.status(200).json({
      status: true,
      message: 'Journals fetched successfully',
      journals
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error fetching journals',
      error: error.message
    });
  }
};
const updateJournal = async (req, res) => {
  const { journalId } = req.params;
  const { photo, location, experience, status } = req.body;

  try {
    const updatedJournal = await journalModel.findByIdAndUpdate(
      journalId,
      { photo, location, experience, status },
      { new: true }
    );

    if (!updatedJournal) {
      return res.status(404).json({
        status: false,
        message: 'Journal not found'
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Journal updated successfully',
      journal: updatedJournal
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error updating journal',
      error: error.message
    });
  }
};
const deleteJournal = async (req, res) => {
  const { journalId } = req.params;

  try {
    const deletedJournal = await journalModel.findByIdAndDelete(journalId);

    if (!deletedJournal) {
      return res.status(404).json({
        status: false,
        message: 'Journal not found'
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Journal deleted successfully',
      journal: deletedJournal
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error deleting journal',
      error: error.message
    });
  }
};
const getAllJournals = async (req, res) => {
  try {
    const journals = await journalModel.find().populate('userId', 'name email');
    return res.status(200).json({
      status: true,
      message: 'All journals fetched successfully',
      journals
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error fetching journals',
      error: error.message
    });
  }
};
module.exports = {
  createJournal,
  getJournalsbyUser,
  updateJournal,
  deleteJournal,
  getAllJournals
};

