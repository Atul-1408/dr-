from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.database import get_db
from app.models import ContactMessage, Admin
from app.schemas import ContactCreate, ContactOut
from app.auth import get_current_admin

router = APIRouter(prefix="/contact", tags=["Contact Messages"])

@router.post("", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
def submit_contact_message(contact_in: ContactCreate, db: Session = Depends(get_db)):
    if contact_in.website_url:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Submission rejected as automated spam"
        )
    
    msg = ContactMessage(
        name=contact_in.name.strip(),
        email=contact_in.email.strip() if contact_in.email else None,
        phone=contact_in.phone.strip(),
        message=contact_in.message.strip(),
        created_at=datetime.utcnow()
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

@router.get("", response_model=List[ContactOut])
def get_contact_messages(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()

@router.put("/{id}/read", response_model=ContactOut)
def mark_message_read(
    id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    msg = db.query(ContactMessage).filter(ContactMessage.id == id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = True
    db.commit()
    db.refresh(msg)
    return msg
