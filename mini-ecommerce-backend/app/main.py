from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from . import models, schemas, crud
from .database import SessionLocal, engine, Base

app = FastAPI()

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db():
    async with SessionLocal() as session:
        yield session

@app.get("/api/products", response_model=List[schemas.Product])
async def read_products(page: int = 1, filter: str = "", db: AsyncSession = Depends(get_db)):
    limit = 10
    skip = (page - 1) * limit
    products = await crud.get_products(db, skip=skip, limit=limit, filter=filter)
    return products