import sys
import os

# Add ml-service to path so we can import app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../ml-service')))

try:
    from app.services.models import models_service
    print("✅ Successfully imported TravelDiscoveryModels")
except ImportError as e:
    print(f"❌ Failed to import models: {e}")
    sys.exit(1)

def test_recommendations():
    print("\n--- Testing Recommendations ---")
    interests = ["Nature", "Adventure"]
    results = models_service.get_recommendations(interests)
    if results and len(results) > 0:
        print(f"✅ Received {len(results)} recommendations")
        print(f"   Top match: {results[0]['experience_name']} (Score: {results[0]['match_score']})")
    else:
        print("❌ No recommendations returned")

def test_clustering():
    print("\n--- Testing User Clustering ---")
    interests = ["Culture", "Relaxing"]
    result = models_service.cluster_user(interests)
    if "traveler_category" in result:
        print(f"✅ User clustered as: {result['traveler_category']}")
    else:
        print("❌ Clustering failed")

def test_sentiment():
    print("\n--- Testing Sentiment Analysis ---")
    text = "The trip was amazing and I loved the views!"
    sentiment = models_service.analyze_sentiment(text)
    print(f"✅ Sentiment detected: {sentiment}")

def test_satisfaction():
    print("\n--- Testing Satisfaction Prediction ---")
    score = models_service.predict_satisfaction(overlap=0.8, rating=4.5, age=30)
    print(f"✅ Predicted Satisfaction Score: {score}")

if __name__ == "__main__":
    test_recommendations()
    test_clustering()
    test_sentiment()
    test_satisfaction()
    print("\n✨ ML Logic Verification Complete ✨")
