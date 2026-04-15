from fastapi import APIRouter, HTTPException
from ..schemas.requests import RecommendRequest, ClusterRequest, AnalyzeReviewRequest, SatisfactionRequest
from ..services.models import models_service

router = APIRouter()

@router.post("/recommend")
def recommend_experiences(req: RecommendRequest):
    return models_service.get_recommendations(req.interests)

@router.post("/cluster-user")
def cluster_user(req: ClusterRequest):
    return models_service.cluster_user(req.interests)

@router.post("/analyze-review")
def analyze_review(req: AnalyzeReviewRequest):
    sentiment = models_service.analyze_sentiment(req.review_text)
    return {"review_text": req.review_text, "sentiment": sentiment}

@router.post("/predict-satisfaction")
def predict_satisfaction(req: SatisfactionRequest):
    score = models_service.predict_satisfaction(
        req.match_overlap, 
        req.experience_rating, 
        req.user_age
    )
    return {"predicted_satisfaction_score": score}
