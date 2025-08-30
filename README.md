# mini-ecommerce

Aplikasi mini-ecommerce dengan backend FastAPI (Python) dan frontend React (TypeScript).

---

## Fitur
- Register, login, autentikasi JWT
- List produk, filter, keranjang belanja
- Checkout & histori pesanan per user
- Search produk global
- Optimasi performa (lazy load gambar, memoization, debouncing filter)
- Responsive UI/UX
- Unit test frontend & backend

---

## Struktur Repo
- `mini-ecommerce-backend/` — Backend FastAPI (Python)
- `mini-ecommerce-frontend/` — Frontend React (TypeScript)

---

## Setup & Menjalankan

### 1. Backend (FastAPI)

#### a. Masuk ke folder backend:
```bash
cd mini-ecommerce-backend/app
```

#### b. Buat & aktifkan virtualenv (opsional):
```bash
python -m venv venv
# Windows:
venv\Scripts\activate
```

#### c. Install dependensi:
```bash
pip install -r requirements.txt
```

#### d. Jalankan server:
```bash
uvicorn main:app --reload
```

#### e. Konfigurasi Database:
- Default: MySQL (edit di `database.py` jika perlu)


### 2. Frontend (React)

#### a. Masuk ke folder frontend:
```bash
cd mini-ecommerce-frontend
```

#### b. Install dependensi:
```bash
npm install
```

#### c. Jalankan aplikasi:
```bash
npm start
```

Akses di: [http://localhost:3000](http://localhost:3000)

---

## Dependensi Utama

### Backend:
- fastapi
- uvicorn
- sqlalchemy
- aiomysql
- pydantic
- passlib
- jose

### Frontend:
- react
- react-router-dom
- typescript
- @testing-library/react
- @testing-library/jest-dom
- jest

---

## Testing

### Backend:
```bash
cd mini-ecommerce-backend/app
pytest
```

### Frontend:
```bash
cd mini-ecommerce-frontend
npm test
```

---

## Catatan
- Backend: port 8000, Frontend: port 3000

