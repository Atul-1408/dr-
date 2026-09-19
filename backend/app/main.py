from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.seed import seed_database
from app.routers import auth, appointments, services, gallery, testimonials, contact

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure tables are created and seed data is populated
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield
    # Shutdown logic if needed

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Production API for Happy Smiles Dental Clinic (Dr. Aaisha Ojha, BDS)",
    lifespan=lifespan
)

# Configure CORS from environment variable ALLOWED_ORIGINS
# Allows user to set ALLOWED_ORIGINS="https://my-site.vercel.app,http://localhost:3000" or leave as "*"
origins = settings.cors_origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https:\/\/.*\.vercel\.app$" if "*" not in origins else None,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(appointments.router, prefix=settings.API_V1_STR)
app.include_router(services.router, prefix=settings.API_V1_STR)
app.include_router(gallery.router, prefix=settings.API_V1_STR)
app.include_router(testimonials.router, prefix=settings.API_V1_STR)
app.include_router(contact.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "clinic": settings.CLINIC_NAME,
        "doctor": "Dr. Aaisha Ojha, BDS (Dental Surgeon)",
        "phone": settings.CLINIC_PHONE,
        "status": "online",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
