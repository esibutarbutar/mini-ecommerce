from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

import os
# Gunakan environment variable DATABASE_URL, fallback ke localhost hanya jika tidak ada
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+aiomysql://root:@localhost:3306/mini_ecommerce")
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()