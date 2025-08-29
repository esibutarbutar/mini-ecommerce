from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from . import models, schemas
from sqlalchemy.exc import SQLAlchemyError
async def get_stores(db: AsyncSession):
    try:
        result = await db.execute(select(models.Store))
        return result.scalars().all()
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        return []

async def get_products(db: AsyncSession, skip: int = 0, limit: int = 10, filter: str = "", store_id: int = None):
    try:
        query = select(models.Product)
        if filter:
            query = query.where(models.Product.name.ilike(f"%{filter}%"))
        if store_id is not None:
            query = query.where(models.Product.store_id == store_id)
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        return []  # Atau raise exception sesuai kebutuhan