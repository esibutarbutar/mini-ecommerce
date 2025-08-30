# mini-ecommerce

A simple mini-ecommerce app with FastAPI backend and React frontend.

## Fitur
- Register, login, dan autentikasi JWT
- List produk, filter, dan keranjang belanja
- Checkout dan riwayat pesanan per user
- Optimasi performa (lazy load gambar, memoization, debouncing filter)

## Struktur Repo
- `mini-ecommerce-backend/` — Backend FastAPI (Python)
- `mini-ecommerce-frontend/` — Frontend React (TypeScript)

## Setup Backend (FastAPI)
1. Masuk ke folder backend:
	```
	cd mini-ecommerce-backend/app
	```
2. Buat virtualenv (opsional):
	```
	python -m venv .venv
	```
3. Aktifkan virtualenv (Windows):
	```
	.venv\Scripts\activate
	```
4. Install dependencies:
	```
	pip install -r requirements.txt
	```
5. Jalankan server:
	```
	uvicorn main:app --reload
	```

## Setup Frontend (React)
1. Masuk ke folder frontend:
	```
	cd mini-ecommerce-frontend
	```
2. Install dependencies:
	```
	npm install
	```
3. Jalankan aplikasi:
	```
	npm start
	```
4. Buka di browser: [http://localhost:3000](http://localhost:3000)

## Konfigurasi Database
- Pastikan MySQL sudah berjalan dan sudah dibuat database sesuai setting di backend.
- Edit koneksi di `mini-ecommerce-backend/app/database.py` jika perlu.

## Catatan
- Untuk development, backend berjalan di port 8000 dan frontend di 3000.
- Cek file README di masing-masing folder untuk info lebih detail.

---

**By: esibutarbutar**