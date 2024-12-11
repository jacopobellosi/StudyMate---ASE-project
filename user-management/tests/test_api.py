import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine, SessionLocal, get_db


@pytest.fixture(scope="module")
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session(test_db):
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client(db_session):
    app.dependency_overrides = {}

    def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    return TestClient(app)


def test_create_user(client):
    payload = {
        "username": "test_user",
        "email": "test@example.com",
        "full_name": "Test User",
    }
    response = client.post("/users/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "test_user"
    assert "id" in data


def test_get_user(client):
    response = client.get("/users/1")
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "test_user"
