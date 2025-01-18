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
    # Path to the file you want to upload
    file_path = "./test_tracks/test.wav"

    # Open the file in binary mode
    with open(file_path, "rb") as file:
        # Use the `files` parameter to attach the file
        files = {"file": file}
        response = requests.post(f"{BASE_URL}/transcribe", files=files)

    responsejson = response.json()

    # Assertions
    assert response.status_code == 200
    assert responsejson["status"] == "success"
    assert "text" in responsejson

def test_invalid_endpoint():
    response = requests.get(f"{BASE_URL}/nonexistent")
    assert response.status_code == 404

test_post_endpoint()