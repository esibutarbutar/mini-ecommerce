
from fastapi import FastAPI, Depends, Body
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from . import models, schemas, crud
from .database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
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

# Endpoint untuk get list toko
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

# Endpoint untuk create history checkout
@app.post("/api/historycheckout", response_model=schemas.HistoryCheckout)
async def create_history_checkout(
    checkout: schemas.HistoryCheckoutCreate = Body(...),
    db: AsyncSession = Depends(get_db)
):
    obj = await crud.create_history_checkout(db, checkout)
    if obj:
        obj.items = json.loads(obj.items)
        return obj
    return JSONResponse(status_code=400, content={"message": "Failed to save checkout"})

# Endpoint untuk get history checkout
@app.get("/api/historycheckout", response_model=List[schemas.HistoryCheckout])
async def get_history_checkout(db: AsyncSession = Depends(get_db)):
    objs = await crud.get_history_checkouts(db)
    for obj in objs:
        obj.items = json.loads(obj.items)
    return objs

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
