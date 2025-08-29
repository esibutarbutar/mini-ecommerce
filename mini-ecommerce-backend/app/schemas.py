from pydantic import BaseModel



class StoreBase(BaseModel):
    name: str
    address: str | None = None
    image_url: str | None = None

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