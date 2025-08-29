# filepath: e:\mini-ecommerce\mini-ecommerce-backend\app\models.py
from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(String(500))
    price = Column(Float)
    image_url = Column(String(255))
    category = Column(String(100))