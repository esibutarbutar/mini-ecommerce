from typing import List, Any
from pydantic import BaseModel

class HistoryCheckoutBase(BaseModel):
    items: Any  # list of items (basket)
    total: float

class HistoryCheckoutCreate(HistoryCheckoutBase):
    pass


from datetime import datetime

class HistoryCheckout(HistoryCheckoutBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True



class StoreBase(BaseModel):
    name: str
    address: str | None = None
    image_url: str | None = None
    rating: float | None = None

class StoreCreate(StoreBase):
    pass


class Store(StoreBase):
    id: int

    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: str
    category: str

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True