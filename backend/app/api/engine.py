from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from datetime import datetime
from app.db.database import get_db
from app.api.deps import get_current_user
from app.models.schemas import RecommendationResponse, UserResponse, BatchStatus
from app.engine.rule_engine import generate_recommendation

router = APIRouter()

@router.post("/recommend/{batch_id}", response_model=RecommendationResponse)
async def get_recommendation(batch_id: str, current_user: UserResponse = Depends(get_current_user), db = Depends(get_db)):
    batch = await db["batches"].find_one({"_id": ObjectId(batch_id)})
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
        
    # Generate recommendation
    rec_data = generate_recommendation(batch)
    rec_data["batch_id"] = batch_id
    rec_data["created_at"] = datetime.utcnow()
    
    # Save recommendation
    result = await db["recommendations"].insert_one(rec_data)
    
    # Update batch status and predicted fields
    await db["batches"].update_one(
        {"_id": ObjectId(batch_id)},
        {"$set": {
            "ai_recommendation": rec_data["recommended_action"].value,
            "price_trend_prediction": rec_data["expected_market_direction"].value,
            "status": BatchStatus.AI_RECOMMENDED.value
        }}
    )
    
    saved_rec = await db["recommendations"].find_one({"_id": result.inserted_id})
    return RecommendationResponse(
        id=str(saved_rec["_id"]),
        **{k: v for k, v in saved_rec.items() if k != "_id"}
    )

@router.get("/recommend/{batch_id}", response_model=RecommendationResponse)
async def fetch_recommendation(batch_id: str, current_user: UserResponse = Depends(get_current_user), db = Depends(get_db)):
    rec = await db["recommendations"].find_one({"batch_id": batch_id})
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found for this batch")
        
    return RecommendationResponse(
        id=str(rec["_id"]),
        **{k: v for k, v in rec.items() if k != "_id"}
    )
