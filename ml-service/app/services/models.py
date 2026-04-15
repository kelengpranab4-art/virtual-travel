import numpy as np
import pandas as pd
import joblib
import os
from sklearn.metrics.pairwise import cosine_similarity

class TravelDiscoveryModels:
    """
    Modular container for machine learning models used in the Travel Discovery platform.
    Loads trained models from the 'models/' directory.
    """
    
    def __init__(self):
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        model_dir = os.path.join(base_dir, 'models')
        
        print(f"📂 Loading models from: {model_dir}")
        
        try:
            # 1. Recommendation Model
            self.tfidf_vec = joblib.load(os.path.join(model_dir, 'tfidf_vectorizer.pkl'))
            self.tfidf_matrix = joblib.load(os.path.join(model_dir, 'tfidf_matrix.pkl'))
            self.df_exp = joblib.load(os.path.join(model_dir, 'experiences_df.pkl'))
            
            # 2. User Clustering
            self.kmeans = joblib.load(os.path.join(model_dir, 'kmeans_model.pkl'))
            self.cluster_tags = ["Nature", "Adventure", "Culture", "Relaxing", "Wildlife"]
            self.cluster_labels_map = {0: "Nature Explorer", 1: "Adventure Traveler", 2: "Cultural Traveler"}

            # 3. Sentiment Analysis
            self.nb_vec = joblib.load(os.path.join(model_dir, 'sentiment_vectorizer.pkl'))
            self.nb_model = joblib.load(os.path.join(model_dir, 'sentiment_model.pkl'))

            # 4. Satisfaction Prediction
            self.rf_model = joblib.load(os.path.join(model_dir, 'satisfaction_model.pkl'))
            
            print("✅ All models loaded successfully.")
        except Exception as e:
            print(f"⚠️ Warning: Could not load models, falling back to basic initialization. Error: {e}")
            # Fallback logic could go here if needed

    def get_recommendations(self, interests: list):
        """Calculates Cosine Similarity between user interests and experience tags."""
        if not interests or not hasattr(self, 'tfidf_vec'): return []
        query = " ".join(interests)
        query_vec = self.tfidf_vec.transform([query])
        sim = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        
        top_idx = np.argsort(sim)[::-1]
        results = []
        for idx in top_idx:
            if sim[idx] > 0:
                row = self.df_exp.iloc[idx]
                results.append({
                    "id": str(idx + 1),
                    "destination": str(row['destination']),
                    "experience_name": str(row.get('experience', row.get('experience_name', 'Unknown'))),
                    "match_score": round(float(sim[idx]), 3)
                })
        return results

    def cluster_user(self, interests: list):
        """Maps a user to a cluster label based on their interest profile."""
        if not hasattr(self, 'kmeans'): return {"error": "Model not loaded"}
        user_vec = [1 if tag in interests else 0 for tag in self.cluster_tags]
        prediction = self.kmeans.predict([user_vec])[0]
        category = self.cluster_labels_map.get(prediction, "Adventure Traveler")
        return {"cluster_id": int(prediction), "traveler_category": category}

    def analyze_sentiment(self, text: str):
        """Predicts 'Positive' or 'Negative' sentiment for a given review text."""
        if not hasattr(self, 'nb_model'): return "Unknown"
        text_vec = self.nb_vec.transform([text])
        pred = self.nb_model.predict(text_vec)
        return str(pred[0])

    def predict_satisfaction(self, overlap: float, rating: float, age: int):
        """Predicts a satisfaction score (regression) for a specific user-experience match."""
        if not hasattr(self, 'rf_model'): return 0.0
        input_data = np.array([[overlap, rating, age]])
        score = self.rf_model.predict(input_data)[0]
        return round(float(score), 1)

# Singleton instance
models_service = TravelDiscoveryModels()
