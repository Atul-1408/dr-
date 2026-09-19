from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, date
from app.database import get_db
from app.models import Appointment, AppointmentStatus, Service, Admin
from app.schemas import AppointmentCreate, AppointmentOut, AppointmentStatusUpdate
from app.auth import get_current_admin

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.post("", response_model=AppointmentOut, status_code=status.HTTP_201_CREATED)
def create_appointment(appointment_in: AppointmentCreate, db: Session = Depends(get_db)):
    # Anti-spam Honeypot Check
    if appointment_in.website_url:
        # Silently reject or simulate success for spam bots
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Submission rejected as automated spam"
        )
    
    # Resolve service name if service_id is provided
    service_name = appointment_in.service_name
    if appointment_in.service_id and not service_name:
        svc = db.query(Service).filter(Service.id == appointment_in.service_id).first()
        if svc:
            service_name = svc.title

    appointment = Appointment(
        patient_name=appointment_in.patient_name.strip(),
        phone=appointment_in.phone.strip(),
        email=appointment_in.email.strip() if appointment_in.email else None,
        service_id=appointment_in.service_id,
        service_name=service_name,
        preferred_date=appointment_in.preferred_date,
        preferred_time=appointment_in.preferred_time,
        message=appointment_in.message.strip() if appointment_in.message else None,
        status=AppointmentStatus.PENDING.value,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment

@router.get("", response_model=List[AppointmentOut])
def get_appointments(
    status_filter: Optional[str] = Query(None, alias="status"),
    search: Optional[str] = None,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    query = db.query(Appointment)
    if status_filter:
        query = query.filter(Appointment.status == status_filter.upper())
    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            (Appointment.patient_name.ilike(search_fmt)) |
            (Appointment.phone.ilike(search_fmt)) |
            (Appointment.service_name.ilike(search_fmt))
        )
    return query.order_by(Appointment.created_at.desc()).all()

@router.get("/stats")
def get_appointment_stats(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    today_str = date.today().isoformat()
    total = db.query(Appointment).count()
    pending = db.query(Appointment).filter(Appointment.status == AppointmentStatus.PENDING.value).count()
    confirmed = db.query(Appointment).filter(Appointment.status == AppointmentStatus.CONFIRMED.value).count()
    completed = db.query(Appointment).filter(Appointment.status == AppointmentStatus.COMPLETED.value).count()
    cancelled = db.query(Appointment).filter(Appointment.status == AppointmentStatus.CANCELLED.value).count()
    today_count = db.query(Appointment).filter(Appointment.preferred_date.ilike(f"%{today_str}%")).count()

    return {
        "total": total,
        "pending": pending,
        "confirmed": confirmed,
        "completed": completed,
        "cancelled": cancelled,
        "today": today_count
    }

@router.get("/{id}", response_model=AppointmentOut)
def get_appointment(
    id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(Appointment.id == id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@router.put("/{id}/status", response_model=AppointmentOut)
def update_appointment_status(
    id: int,
    status_update: AppointmentStatusUpdate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(Appointment.id == id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    appointment.status = status_update.status
    appointment.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(appointment)
    return appointment

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(
    id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(Appointment.id == id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(appointment)
    db.commit()
    return None
