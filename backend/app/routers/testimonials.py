from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Testimonial, Admin
from app.schemas import TestimonialCreate, TestimonialUpdate, TestimonialOut
from app.auth import get_current_admin

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

@router.get("", response_model=List[TestimonialOut])
def get_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).filter(Testimonial.is_verified == True).order_by(Testimonial.display_order.asc()).all()

@router.get("/all", response_model=List[TestimonialOut])
def get_all_testimonials_admin(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    return db.query(Testimonial).order_by(Testimonial.display_order.asc()).all()

@router.post("", response_model=TestimonialOut, status_code=status.HTTP_201_CREATED)
def create_testimonial(
    testimonial_in: TestimonialCreate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    testimonial = Testimonial(**testimonial_in.model_dump())
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial

@router.put("/{id}", response_model=TestimonialOut)
def update_testimonial(
    id: int,
    testimonial_in: TestimonialUpdate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    testimonial = db.query(Testimonial).filter(Testimonial.id == id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    update_data = testimonial_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(testimonial, field, value)
    
    db.commit()
    db.refresh(testimonial)
    return testimonial

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(
    id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    testimonial = db.query(Testimonial).filter(Testimonial.id == id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(testimonial)
    db.commit()
    return None
