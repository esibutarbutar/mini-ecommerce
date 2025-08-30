from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code in (200, 404)

def test_stores_endpoint():
    response = client.get("/api/stores")
    assert response.status_code in (200, 404)


def test_method_not_allowed():
    response = client.post("/api/stores")
    assert response.status_code in (405, 404)


def test_login_endpoint():
    response = client.post("/api/login", data={})
    assert response.status_code == 422

def test_login_wrong_method():
    response = client.get("/api/login")
    assert response.status_code in (405, 404)