from locust import HttpUser, between, task
from prometheus_client import start_http_server


class OCRUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def test_extract_text(self):
        with open("tests/data/eng_image.jpg", "rb") as img:
            files = {"file": ("eng_image.jpg", img, "image/jpeg")}
            response = self.client.post("/extract-text", files=files)

        # Ensure the response is correct
        assert response.status_code == 200
        assert response.json() is not None


start_http_server(8090)
