const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const authMiddleware = require('../middleware/auth');

router.post('/preferences', authMiddleware, apiController.updatePreferences);
router.post('/recommendations', apiController.getRecommendations);
router.get('/experiences', apiController.getExperiences);
router.get('/experiences/:id', apiController.getExperienceDetails);
router.post('/predict-satisfaction', apiController.predictSatisfaction);

module.exports = router;
