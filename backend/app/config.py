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

    # CORS: Allowed origins (comma-separated list, e.g. "https://my-site.vercel.app,http://localhost:3000" or "*")
    ALLOWED_ORIGINS: str = os.getenv("ALLOWED_ORIGINS", "*")

    @property
    def cors_origins(self) -> list[str]:
        raw = self.ALLOWED_ORIGINS.strip()
        if not raw or raw == "*":
            return ["*"]
        return [origin.strip().rstrip("/") for origin in raw.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
