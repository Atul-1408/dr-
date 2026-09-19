from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List
from datetime import datetime
import re

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: Optional[str] = None

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminOut(BaseModel):
    id: int
    username: str
    full_name: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Service Schemas
class ServiceBase(BaseModel):
    title: str
    slug: str
    short_description: str
    full_description: Optional[str] = None
    icon: Optional[str] = "Sparkles"
    is_active: bool = True
    display_order: int = 0

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    icon: Optional[str] = None
    is_active: Optional[bool] = None
    display_order: Optional[int] = None

class ServiceOut(ServiceBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Appointment Schemas
class AppointmentCreate(BaseModel):
    patient_name: str = Field(..., min_length=2, max_length=150)
    phone: str = Field(..., min_length=8, max_length=20)
    email: Optional[EmailStr] = None
    service_id: Optional[int] = None
    service_name: Optional[str] = None
    preferred_date: str = Field(..., min_length=4, max_length=50)
    preferred_time: str = Field(..., min_length=2, max_length=50)
    message: Optional[str] = Field(None, max_length=1000)
    # Anti-spam honeypot field (should be empty from real human users)
    website_url: Optional[str] = Field(None)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-\(\)\+]", "", v)
        if len(cleaned) < 8 or not cleaned.isdigit():
            raise ValueError("Please provide a valid contact phone number")
        return v.strip()

class AppointmentStatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        valid = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]
        if v.upper() not in valid:
            raise ValueError(f"Status must be one of: {', '.join(valid)}")
        return v.upper()

class AppointmentOut(BaseModel):
    id: int
    patient_name: str
    phone: str
    email: Optional[str] = None
    service_id: Optional[int] = None
    service_name: Optional[str] = None
    preferred_date: str
    preferred_time: str
    message: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime
    service: Optional[ServiceOut] = None

    class Config:
        from_attributes = True

# Gallery Schemas
class GalleryBase(BaseModel):
    title: str
    category: str
    image_url: str
    alt_text: str
    display_order: int = 0

class GalleryCreate(GalleryBase):
    pass

class GalleryOut(GalleryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Testimonial Schemas
class TestimonialBase(BaseModel):
    patient_name: str
    area: str
    rating: int = Field(5, ge=1, le=5)
    review: str
    is_verified: bool = True
    display_order: int = 0

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    patient_name: Optional[str] = None
    area: Optional[str] = None
    rating: Optional[int] = None
    review: Optional[str] = None
    is_verified: Optional[bool] = None
    display_order: Optional[int] = None

class TestimonialOut(TestimonialBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Contact Schemas
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    email: Optional[EmailStr] = None
    phone: str = Field(..., min_length=8, max_length=20)
    message: str = Field(..., min_length=5, max_length=2000)
    website_url: Optional[str] = None  # Honeypot

class ContactOut(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    phone: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
