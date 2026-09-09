from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "KrishiSetu API"
    MONGODB_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "krishisetu"
    SECRET_KEY: str = "your-super-secret-key-for-jwt-demo-only-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:5174,http://localhost:5175"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"

settings = Settings()
