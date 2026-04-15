const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';

const mlService = {
  getRecommendations: async (interests) => {
    const response = await axios.post(`${ML_SERVICE_URL}/recommend`, { interests });
    return response.data;
  },
  
  clusterUser: async (interests) => {
    const response = await axios.post(`${ML_SERVICE_URL}/cluster-user`, { interests });
    return response.data;
  },
  
  predictSatisfaction: async (data) => {
    const response = await axios.post(`${ML_SERVICE_URL}/predict-satisfaction`, data);
    return response.data;
  },

  analyzeReview: async (reviewText) => {
    const response = await axios.post(`${ML_SERVICE_URL}/analyze-review`, { review_text: reviewText });
    return response.data;
  }
};

module.exports = mlService;
