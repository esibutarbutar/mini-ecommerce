from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from . import models, schemas
from sqlalchemy.exc import SQLAlchemyError

async def get_products(db: AsyncSession, skip: int = 0, limit: int = 10, filter: str = ""):
    try:
        query = select(models.Product)
        if filter:
            query = query.where(models.Product.name.ilike(f"%{filter}%"))
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        return []  # Atau raise exception sesuai kebutuhan