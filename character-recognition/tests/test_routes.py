from app import create_app


def test_config():
    assert not create_app().testing
    assert create_app({"TESTING": True}).testing


def test_extract_text(client):
    with open("tests/data/eng_image.jpg", "rb") as image:
        data = {"file": (image, "eng_image.jpg")}
        response = client.post(
            "/extract-text", content_type="multipart/form-data", data=data
        )

    assert response.status_code == 200
    assert "extracted_text" in response.get_json()
