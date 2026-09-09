from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime
from bson import ObjectId
from app.db.database import get_db
from app.api.deps import get_current_user
from app.models.schemas import BatchCreate, BatchResponse, UserResponse, BatchStatus, ActionType

router = APIRouter()

@router.post("/", response_model=BatchResponse)
async def create_batch(batch: BatchCreate, current_user: UserResponse = Depends(get_current_user), db = Depends(get_db)):
    if current_user.role != "FARMER":
        raise HTTPException(status_code=403, detail="Only farmers can create batches")
        
    batch_dict = batch.model_dump()
    batch_dict["farmer_id"] = current_user.id
    batch_dict["status"] = BatchStatus.PENDING.value
    batch_dict["created_at"] = datetime.utcnow()
    
    result = await db["batches"].insert_one(batch_dict)
    created_batch = await db["batches"].find_one({"_id": result.inserted_id})
    
    return BatchResponse(
        id=str(created_batch["_id"]),
        **{k: v for k, v in created_batch.items() if k != "_id"}
    )

@router.get("/my", response_model=List[BatchResponse])
async def get_my_batches(current_user: UserResponse = Depends(get_current_user), db = Depends(get_db)):
    if current_user.role != "FARMER":
        raise HTTPException(status_code=403, detail="Only farmers have a personal batch list")
        
    cursor = db["batches"].find({"farmer_id": current_user.id}).sort("created_at", -1)
    batches = await cursor.to_list(length=100)
    
    return [
        BatchResponse(
            id=str(batch["_id"]),
            **{k: v for k, v in batch.items() if k != "_id"}
        ) for batch in batches
    ]

@router.get("/{batch_id}", response_model=BatchResponse)
async def get_batch(batch_id: str, current_user: UserResponse = Depends(get_current_user), db = Depends(get_db)):
    batch = await db["batches"].find_one({"_id": ObjectId(batch_id)})
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
        
    return BatchResponse(
        id=str(batch["_id"]),
        **{k: v for k, v in batch.items() if k != "_id"}
    )

@router.put("/{batch_id}/decision", response_model=BatchResponse)
async def submit_farmer_decision(batch_id: str, decision: ActionType, current_user: UserResponse = Depends(get_current_user), db = Depends(get_db)):
    batch = await db["batches"].find_one({"_id": ObjectId(batch_id)})
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
        
    if batch["farmer_id"] != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    updated_batch = await db["batches"].find_one_and_update(
        {"_id": ObjectId(batch_id)},
        {"$set": {
            "farmer_final_decision": decision.value,
            "status": BatchStatus.FARMER_DECIDED.value
        }},
        return_document=True
    )
    
    return BatchResponse(
        id=str(updated_batch["_id"]),
        **{k: v for k, v in updated_batch.items() if k != "_id"}
    )
