from sqlalchemy.future import select

# ...existing code...

async def get_history_checkouts(db):
    result = await db.execute(select(models.HistoryCheckout))
    return result.scalars().all()
from sqlalchemy import insert
from sqlalchemy.ext.asyncio import AsyncSession
import json
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

async def create_history_checkout(db: AsyncSession, checkout: schemas.HistoryCheckoutCreate, user_id: int):
    try:
        db_obj = models.HistoryCheckout(
            items=json.dumps(checkout.items),
            total=checkout.total,
            user_id=user_id
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        return None

async def get_history_checkouts_by_user(db: AsyncSession, user_id: int):
    try:
        result = await db.execute(select(models.HistoryCheckout).where(models.HistoryCheckout.user_id == user_id).order_by(models.HistoryCheckout.created_at.desc()))
        return result.scalars().all()
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        return []

async def get_user_by_email(db: AsyncSession, email: str):
    try:
        result = await db.execute(select(models.User).where(models.User.email == email))
        return result.scalar_one_or_none()
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        return None

async def create_user(db: AsyncSession, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, full_name=user.full_name)
    db.add(db_user)
    try:
        await db.commit()
        await db.refresh(db_user)
        return db_user
    except IntegrityError as e:
        print(f"IntegrityError saat register user: {e}")
        await db.rollback()
        return None
    except Exception as e:
        print(f"Error lain saat register user: {e}")
        await db.rollback()
        return None

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
        # filter dan store_id bisa diimplementasi sesuai kebutuhan
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        return []