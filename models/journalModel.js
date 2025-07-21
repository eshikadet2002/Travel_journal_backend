const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    photo: {
      type: String,
      trim: true,
      required: [true, 'Photo URL is required']
    },
    location: {
      type: String,
      trim: true,
      required: [true, 'Location is required'],
      maxlength: [100, 'Location must be at most 100 characters']
    },
    experience: {
      type: String,
      trim: true,
      required: [true, 'Experience is required'],
      maxlength: [1000, 'Experience must be at most 1000 characters']
    },
    status: {
      type: String,
      enum: ['public', 'private', 'draft'],
      default: 'public'
    }
  },
  { timestamps: true }
);

const journalModel = mongoose.model('journals', JournalSchema);

module.exports = {
  journalModel,
};
