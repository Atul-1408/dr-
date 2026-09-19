import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Happy Smiles Dental Clinic API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database: Supports Postgres via DATABASE_URL, with SQLite fallback
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./happy_smiles.db")
    
    # JWT Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "happy_smiles_super_secure_clinic_jwt_secret_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Initial Admin Credentials
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "HappySmiles@2026")

    # Clinic Contact & Info
    CLINIC_PHONE: str = "9029131396"
    CLINIC_EMAIL: str = "info@happysmilesdental.in"
    CLINIC_NAME: str = "Happy Smiles Dental Clinic"

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
