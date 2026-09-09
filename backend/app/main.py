from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, batches, engine

from app.core.config import settings

app = FastAPI(title="KrishiSetu API", version="1.0.0")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(batches.router, prefix="/api/batches", tags=["batches"])
app.include_router(engine.router, prefix="/api/engine", tags=["engine"])

@app.get("/")
def read_root():
    return {"message": "Welcome to KrishiSetu API"}
