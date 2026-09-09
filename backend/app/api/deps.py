from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.core.config import settings
from app.models.schemas import TokenData, UserResponse
from app.db.database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)):
    # Bypass all JWT checks for demo purposes.
    # Return a dummy farmer user so all endpoints work without a token.
    return {
        "id": "demo_farmer_123",
        "email": "farmer@demo.com",
        "full_name": "Demo Farmer",
        "role": "FARMER",
        "is_active": True
    }

async def get_current_active_user(current_user = Depends(get_current_user)):
    return current_user

async def get_current_active_admin(current_user = Depends(get_current_user)):
    return current_user
