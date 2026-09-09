from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class Role(str, Enum):
    FARMER = "FARMER"
    ADMIN = "ADMIN"
    BUYER = "BUYER"

class BatchStatus(str, Enum):
    PENDING = "PENDING"
    AI_RECOMMENDED = "AI_RECOMMENDED"
    FARMER_DECIDED = "FARMER_DECIDED"
    COMPLETED = "COMPLETED"

class ActionType(str, Enum):
    SELL = "SELL"
    STORE = "STORE"
    PROCESS = "PROCESS"
    RESCUE = "RESCUE"

class MarketDirection(str, Enum):
    UP = "UP"
    DOWN = "DOWN"
    STABLE = "STABLE"

# Users
class UserBase(BaseModel):
    email: EmailStr
    role: Role
    name: str
    phone: str
    location: Optional[str] = None
    language: str = "en"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str

# Batches
class BatchBase(BaseModel):
    crop_type: str
    variety: Optional[str] = None
    quantity_kg: float
    harvest_date: str # ISO format string or date
    location: str
    quality_grade: str # A/B/C/D
    images: Optional[List[str]] = []
    shelf_life_days: int
    storage_condition_temp: Optional[float] = None
    storage_condition_humidity: Optional[float] = None
    storage_cost: float = 0.0
    spoilage_risk_score: float = 0.0
    current_market_price: float = 0.0
    demand_level: str = "MEDIUM" # LOW/MEDIUM/HIGH

class BatchCreate(BatchBase):
    pass

class BatchResponse(BatchBase):
    id: str
    farmer_id: str
    price_trend_prediction: Optional[str] = None
    processing_suitability: Optional[float] = None
    status: BatchStatus = BatchStatus.PENDING
    ai_recommendation: Optional[ActionType] = None
    farmer_final_decision: Optional[ActionType] = None
    created_at: datetime

# Recommendation Explainability
class RecommendationResponse(BaseModel):
    id: str
    batch_id: str
    recommended_action: ActionType
    confidence_score: float
    positive_factors: List[str]
    risk_factors: List[str]
    expected_market_direction: MarketDirection
    shelf_life_info: str
    why_alternatives_lower: str
    suggested_next_step: str
    created_at: datetime

# Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
