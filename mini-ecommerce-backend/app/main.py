from fastapi import FastAPI, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from . import models, schemas, crud
from .database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
origins = ["*"]
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

@app.get("/api/stores", response_model=List[schemas.Store])
async def read_stores(db: AsyncSession = Depends(get_db)):
    logger.info("Request to /api/stores")
    try:
        stores = await crud.get_stores(db)
        logger.info(f"Returning {len(stores)} stores")
        return stores
    except Exception as e:
        logger.error(f"Error in /api/stores: {e}")
        return []

@app.get("/api/products", response_model=List[schemas.Product])
async def read_products(page: int = 1, filter: str = "", store_id: int = None, db: AsyncSession = Depends(get_db)):
    logger.info(f"Request to /api/products for store_id={store_id}")
    try:
        limit = 10
        skip = (page - 1) * limit
        products = await crud.get_products(db, skip=skip, limit=limit, filter=filter, store_id=store_id)
        logger.info(f"Returning {len(products)} products")
        return products
    except Exception as e:
        logger.error(f"Error in /api/products: {e}")
        return []