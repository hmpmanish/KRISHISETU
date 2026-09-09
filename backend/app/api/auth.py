from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.db.database import get_db
from app.core import security
from app.core.config import settings
from app.models.schemas import UserCreate, UserResponse, Token
from bson import ObjectId

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db = Depends(get_db)):
    existing_user = await db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    hashed_password = security.get_password_hash(user.password)
    user_dict = user.model_dump()
    del user_dict["password"]
    user_dict["password_hash"] = hashed_password
    
    result = await db["users"].insert_one(user_dict)
    
    # Fetch created user
    created_user = await db["users"].find_one({"_id": result.inserted_id})
    return UserResponse(
        id=str(created_user["_id"]),
        **{k: v for k, v in created_user.items() if k != "_id"}
    )

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(get_db)):
    user = await db["users"].find_one({"email": form_data.username})
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    if not security.verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user["email"], "role": user["role"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
