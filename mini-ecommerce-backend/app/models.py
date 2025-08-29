# filepath: e:\mini-ecommerce\mini-ecommerce-backend\app\models.py
from sqlalchemy import Column, Integer, String, Float
from .database import Base
class Store(Base):
    __tablename__ = "stores"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    address = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)
    address = Column(String(255), nullable=True)
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(String(500))
    price = Column(Float)
    image_url = Column(String(255))
    category = Column(String(100))
    store_id = Column(Integer)
    category = Column(String(100))