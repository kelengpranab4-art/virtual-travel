const User = require('../models/User');
const mlService = require('../services/mlService');

exports.updatePreferences = async (req, res) => {
  try {
    const { interests } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.preferences = interests;
    await user.save();
    res.json({ message: 'Preferences saved', preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const { interests } = req.body;
    const recommendations = await mlService.getRecommendations(interests);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

exports.getExperiences = async (req, res) => {
  try {
    const experiences = await mlService.getExperiences();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

exports.getExperienceDetails = async (req, res) => {
  try {
    const details = await mlService.getExperienceDetails(req.params.id);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experience details' });
  }
};

exports.predictSatisfaction = async (req, res) => {
  try {
    const prediction = await mlService.predictSatisfaction(req.body);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Satisfaction prediction failed' });
  }
};
