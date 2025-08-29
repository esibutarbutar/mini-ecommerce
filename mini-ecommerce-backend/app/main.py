


from fastapi import FastAPI, Depends, Body, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from . import models, schemas, crud
from .database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import logging
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta

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

async def get_db():
    async with SessionLocal() as session:
        yield session

SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def create_access_token(data: dict, expires_delta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    print("[DEBUG] JWT token diterima:", token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            print("[DEBUG] JWT tidak ada sub")
            raise credentials_exception
    except JWTError as e:
        print(f"[DEBUG] JWTError: {e}")
        raise credentials_exception
    user = await crud.get_user_by_email(db, payload.get("email"))
    if user is None:
        print("[DEBUG] User tidak ditemukan dari email di JWT")
        raise credentials_exception
    return user

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Endpoint login user (JWT)
@app.post("/api/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await crud.get_user_by_email(db, form_data.username)
    if not user or not crud.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Email atau password salah")
    access_token = create_access_token(data={"sub": str(user.id), "email": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint register user
@app.post("/api/register", response_model=schemas.User)
async def register(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = await crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email sudah terdaftar")
    new_user = await crud.create_user(db, user)
    if not new_user:
        raise HTTPException(status_code=400, detail="Registrasi gagal")
    return new_user

# Endpoint get stores
@app.get("/api/stores", response_model=List[schemas.Store])
async def read_stores(db: AsyncSession = Depends(get_db)):
    logger.info("Request to /api/stores")
    stores = await crud.get_stores(db)
    logger.info(f"Returning {len(stores)} stores")
    return stores

# Endpoint create history checkout
@app.post("/api/historycheckout", response_model=schemas.HistoryCheckout)
async def create_history_checkout(
    checkout: schemas.HistoryCheckoutCreate = Body(...),
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    obj = await crud.create_history_checkout(db, checkout, user_id=current_user.id)
    if obj:
        obj.items = json.loads(obj.items)
        return obj
    return JSONResponse(status_code=400, content={"message": "Failed to save checkout"})

# Endpoint get history checkout
@app.get("/api/historycheckout", response_model=List[schemas.HistoryCheckout])
async def get_history_checkout(db: AsyncSession = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    objs = await crud.get_history_checkouts_by_user(db, user_id=current_user.id)
    for obj in objs:
        obj.items = json.loads(obj.items)
    return objs

# Endpoint get products
@app.get("/api/products", response_model=List[schemas.Product])
async def read_products(page: int = 1, filter: str = "", store_id: int = None, db: AsyncSession = Depends(get_db)):
    logger.info(f"Request to /api/products for store_id={store_id}")
    limit = 10
    skip = (page - 1) * limit
    products = await crud.get_products(db, skip=skip, limit=limit, filter=filter, store_id=store_id)
    logger.info(f"Returning {len(products)} products")
    return products
