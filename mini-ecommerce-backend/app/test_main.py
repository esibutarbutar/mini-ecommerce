import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_and_login():
    # Register
    r = client.post('/api/register', json={
        'email': 'testuser@gmail.com',
        'password': 'testpass123',
        'full_name': 'Test User'
    })
    assert r.status_code in (200, 400)  # 400 if already registered
    # Login
    r = client.post('/api/login', data={
        'username': 'testuser@gmail.com',
        'password': 'testpass123'
    })
    assert r.status_code == 200
    data = r.json()
    assert 'access_token' in data

def test_get_stores():
    r = client.get('/api/stores')
    assert r.status_code == 200
    assert isinstance(r.json(), list)
