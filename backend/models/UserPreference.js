const mongoose = require('mongoose');

const userPreferenceSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  interests: { type: [String], default: [] },
  travel_personality: { type: String }
});

module.exports = mongoose.model('UserPreference', userPreferenceSchema);
