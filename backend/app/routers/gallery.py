from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Gallery, Admin
from app.schemas import GalleryCreate, GalleryOut
from app.auth import get_current_admin

router = APIRouter(prefix="/gallery", tags=["Gallery"])

@router.get("", response_model=List[GalleryOut])
def get_gallery(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Gallery)
    if category and category.lower() != "all":
        query = query.filter(Gallery.category.ilike(category))
    return query.order_by(Gallery.display_order.asc()).all()

@router.post("", response_model=GalleryOut, status_code=status.HTTP_201_CREATED)
def add_gallery_item(
    item_in: GalleryCreate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    item = Gallery(**item_in.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gallery_item(
    id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    item = db.query(Gallery).filter(Gallery.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    db.delete(item)
    db.commit()
    return None
