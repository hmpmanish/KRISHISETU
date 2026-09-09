import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from datetime import datetime, timedelta
import sys
import os

# Add parent directory to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.core.config import settings

MONGODB_URI = settings.MONGODB_URI
DATABASE_NAME = settings.DATABASE_NAME

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
client = AsyncIOMotorClient(MONGODB_URI)
db = client[DATABASE_NAME]

async def seed_data():
    print("Clearing existing data...")
    await db["users"].delete_many({})
    await db["batches"].delete_many({})
    await db["recommendations"].delete_many({})
    
    print("Inserting mock users...")
    users = [
        {
            "email": "farmer@demo.com",
            "password_hash": pwd_context.hash("password"),
            "role": "FARMER",
            "name": "Ramesh Kumar",
            "phone": "+919876543210",
            "location": "Maharashtra",
            "language": "en"
        },
        {
            "email": "processor@demo.com",
            "password_hash": pwd_context.hash("password"),
            "role": "BUYER",
            "name": "AgriFoods Inc.",
            "phone": "+919876543211",
            "location": "Maharashtra",
            "language": "en"
        },
        {
            "email": "admin@demo.com",
            "password_hash": pwd_context.hash("password"),
            "role": "ADMIN",
            "name": "KrishiSetu Admin",
            "phone": "+910000000000",
            "location": "Delhi",
            "language": "en"
        }
    ]
    user_results = await db["users"].insert_many(users)
    farmer_id = str(user_results.inserted_ids[0])
    
    print("Inserting mock batches...")
    now = datetime.utcnow()
    batches = [
        # Strong SELL Case
        {
            "farmer_id": farmer_id,
            "crop_type": "Wheat",
            "quantity_kg": 2000,
            "harvest_date": (now - timedelta(days=2)).isoformat(),
            "location": "Pune",
            "quality_grade": "A",
            "shelf_life_days": 180,
            "storage_cost": 5.0,
            "spoilage_risk_score": 0.1,
            "current_market_price": 25.5,
            "demand_level": "HIGH",
            "status": "PENDING",
            "created_at": now
        },
        # STORE Case
        {
            "farmer_id": farmer_id,
            "crop_type": "Potato",
            "quantity_kg": 5000,
            "harvest_date": (now - timedelta(days=5)).isoformat(),
            "location": "Nashik",
            "quality_grade": "B",
            "shelf_life_days": 90,
            "storage_cost": 2.0,
            "spoilage_risk_score": 0.2,
            "current_market_price": 12.0,
            "demand_level": "MEDIUM",
            "status": "PENDING",
            "created_at": now
        },
        # PROCESS Case
        {
            "farmer_id": farmer_id,
            "crop_type": "Tomato",
            "quantity_kg": 1500,
            "harvest_date": (now - timedelta(days=1)).isoformat(),
            "location": "Satara",
            "quality_grade": "B",
            "shelf_life_days": 7,
            "storage_cost": 8.0,
            "spoilage_risk_score": 0.5,
            "current_market_price": 10.0,
            "demand_level": "LOW",
            "processing_suitability": 0.9,
            "status": "PENDING",
            "created_at": now
        },
        # RESCUE Case
        {
            "farmer_id": farmer_id,
            "crop_type": "Onion",
            "quantity_kg": 800,
            "harvest_date": (now - timedelta(days=15)).isoformat(),
            "location": "Ahmednagar",
            "quality_grade": "D",
            "shelf_life_days": 2,
            "storage_cost": 4.0,
            "spoilage_risk_score": 0.9,
            "current_market_price": 15.0,
            "demand_level": "LOW",
            "status": "PENDING",
            "created_at": now
        }
    ]
    await db["batches"].insert_many(batches)
    print("Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())
