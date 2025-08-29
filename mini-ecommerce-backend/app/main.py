# filepath: e:\mini-ecommerce\mini-ecommerce-backend\app\main.py
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from . import models, schemas, crud
from .database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
origins = [
    "http://localhost:3000",  # Ganti dengan URL frontend Anda
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db():
    async with SessionLocal() as session:
        yield session

@app.get("/api/products", response_model=List[schemas.Product])
async def read_products(page: int = 1, filter: str = "", db: AsyncSession = Depends(get_db)):
    logger.info("Request to /api/products")
    try:
        limit = 10
        skip = (page - 1) * limit
        products = await crud.get_products(db, skip=skip, limit=limit, filter=filter)
        logger.info(f"Returning {len(products)} products")
        return products
    except Exception as e:
        logger.error(f"Error in /api/products: {e}")
        return []