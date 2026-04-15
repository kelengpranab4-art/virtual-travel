const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  experience_id: { type: String, required: true, unique: true },
  destination: { type: String, required: true },
  experience_name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 },
  best_season: { type: String },
  image_url: { type: String }
});

module.exports = mongoose.model('Experience', experienceSchema);
