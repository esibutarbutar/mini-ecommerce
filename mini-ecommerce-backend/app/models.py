from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from .database import Base

class Store(Base):
    __tablename__ = "stores"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    address = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(String(500))
    price = Column(Float)
    image_url = Column(String(255))
    category = Column(String(100))

    store_id = Column(Integer)

class HistoryCheckout(Base):
    __tablename__ = "historycheckout"
    id = Column(Integer, primary_key=True, index=True)
    items = Column(Text)  # JSON string of items
    total = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())