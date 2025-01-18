# tests are intended to be run when server is running on port 8000
# either by running the uvicorn server locally or by running the docker container
# BUT NOT when running the bigger docker-compose setup


import requests

BASE_URL = "http://127.0.0.1:8000"  # Replace with your server's base URL

def test_get_root():
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200
    assert response.json() == "Transcriptify running..."

def test_post_endpoint():
    payload = {"name": "Test Item"}
    response = requests.post(f"{BASE_URL}/items", json=payload)
    assert response.status_code == 201
    response_data = response.json()
    assert response_data["name"] == "Test Item"
    assert "id" in response_data  # Assuming the response contains an ID

def test_invalid_endpoint():
    response = requests.get(f"{BASE_URL}/nonexistent")
    assert response.status_code == 404

test_invalid_endpoint()