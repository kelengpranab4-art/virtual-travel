import pandas as pd
import numpy as np
import joblib
import os
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestRegressor

def train_and_save_models():
    # Paths
    base_dir = os.path.dirname(__file__)
    data_dir = os.path.join(base_dir, '../datasets')
    model_dir = os.path.join(base_dir, 'models')
    
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)

    print("🚀 Starting Model Training Pipeline...")

    # 1. Recommendation Model (TF-IDF)
    print("📦 Loading tourism experiences...")
    try:
        df_exp = pd.read_csv(os.path.join(data_dir, 'tourism_experiences.csv'))
        # Create a 'features' column for TF-IDF
        df_exp['features'] = df_exp['category'] + " " + df_exp['description']
        
        tfidf_vec = TfidfVectorizer()
        tfidf_matrix = tfidf_vec.fit_transform(df_exp['features'])
        
        joblib.dump(tfidf_vec, os.path.join(model_dir, 'tfidf_vectorizer.pkl'))
        joblib.dump(tfidf_matrix, os.path.join(model_dir, 'tfidf_matrix.pkl'))
        joblib.dump(df_exp, os.path.join(model_dir, 'experiences_df.pkl'))
        print("✅ Recommendation model trained and saved.")
    except Exception as e:
        print(f"❌ Error training recommendation model: {e}")

    # 2. User Clustering (K-Means)
    print("👥 Training User Clustering...")
    cluster_tags = ["Nature", "Adventure", "Culture", "Relaxing", "Wildlife"]
    dummy_users = np.array([
        [1, 0, 0, 1, 1], # Nature Explorer
        [0, 1, 0, 0, 1], # Adventure Traveler
        [0, 0, 1, 1, 0], # Cultural Traveler
    ])
    kmeans = KMeans(n_clusters=3, random_state=42, n_init='auto')
    kmeans.fit(dummy_users)
    joblib.dump(kmeans, os.path.join(model_dir, 'kmeans_model.pkl'))
    print("✅ Clustering model saved.")

    # 3. Sentiment Analysis (Naive Bayes)
    print("🎭 Training Sentiment Analysis...")
    try:
        df_reviews = pd.read_csv(os.path.join(data_dir, 'reviews.csv'))
        nb_vec = CountVectorizer()
        X_nb = nb_vec.fit_transform(df_reviews['review_text'])
        nb_model = MultinomialNB()
        nb_model.fit(X_nb, df_reviews['sentiment'])
        
        joblib.dump(nb_vec, os.path.join(model_dir, 'sentiment_vectorizer.pkl'))
        joblib.dump(nb_model, os.path.join(model_dir, 'sentiment_model.pkl'))
        print("✅ Sentiment model saved.")
    except Exception as e:
        print(f"❌ Error training sentiment model: {e}")

    # 4. Satisfaction Prediction (Random Forest)
    print("📊 Training Satisfaction Predictor...")
    X_rf = np.array([
        [0.9, 4.8, 25],
        [0.1, 2.1, 45],
        [0.5, 4.0, 30],
        [0.8, 4.5, 40],
        [0.2, 3.0, 22]
    ])
    y_rf = np.array([95, 30, 65, 85, 40])
    rf_model = RandomForestRegressor(n_estimators=10, random_state=42)
    rf_model.fit(X_rf, y_rf)
    joblib.dump(rf_model, os.path.join(model_dir, 'satisfaction_model.pkl'))
    print("✅ Satisfaction predictor saved.")

    print("\n✨ All models trained and saved to ml-service/models/")

if __name__ == "__main__":
    train_and_save_models()
