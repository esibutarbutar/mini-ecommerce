

# mini-ecommerce

## Demo Online
- **Frontend:** [https://mini-ecommerce-topaz.vercel.app/](https://mini-ecommerce-topaz.vercel.app/)
- **Backend API:** [https://mini-ecommerce-production-5d93.up.railway.app](https://mini-ecommerce-production-5d93.up.railway.app)

Aplikasi mini-ecommerce dengan backend FastAPI (Python) dan frontend React (TypeScript).

---

## Fitur
- Register, login, autentikasi JWT
- List produk, filter, keranjang belanja
- Checkout & histori pesanan per user
- Search produk global
- Responsive UI/UX
- Unit test frontend & backend

---

## Struktur Repo
- `mini-ecommerce-backend/` — Backend FastAPI (Python)
- `mini-ecommerce-frontend/` — Frontend React (TypeScript)

---

## Setup & Menjalankan

### Backend (FastAPI)
1. Masuk ke folder backend:
	```bash
	cd mini-ecommerce-backend/app
	```
2. (Opsional) Buat & aktifkan virtualenv:
	```bash
	python -m venv venv
	# Windows:
	venv\Scripts\activate
	```
3. Install dependensi:
	```bash
	pip install -r requirements.txt
	```
4. Jalankan server:
	```bash
	uvicorn main:app --reload
	```
5. Konfigurasi Database:
	- Default: MySQL (edit di `database.py` jika perlu)

### Frontend (React)
1. Masuk ke folder frontend:
	```bash
	cd mini-ecommerce-frontend
	```
2. Install dependensi:
	```bash
	npm install
	```
3. Jalankan aplikasi:
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

