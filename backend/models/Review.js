const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_id: { type: String, required: true, unique: true },
  destination: { type: String, required: true },
  rating: { type: Number, required: true },
  review_text: { type: String, required: true },
  sentiment: { type: String } // e.g. Positive, Negative, Neutral
});

module.exports = mongoose.model('Review', reviewSchema);
