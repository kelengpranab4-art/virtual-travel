from pydantic import BaseModel
from typing import List, Optional

class RecommendRequest(BaseModel):
    interests: List[str]

class ClusterRequest(BaseModel):
    interests: List[str]

class AnalyzeReviewRequest(BaseModel):
    review_text: str

class SatisfactionRequest(BaseModel):
    match_overlap: float   # 0.0 to 1.0 representing interest overlap
    experience_rating: float # 0.0 to 5.0
    user_age: int
